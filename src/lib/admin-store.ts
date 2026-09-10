import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { AdminUser } from '@/types/admin';
import {
  getSuperadminCredentials,
  hashPassword,
  verifyPassword,
} from '@/lib/admin-auth';
import { supabase } from '@/config/supabase';

const DATA_DIR = path.join(process.cwd(), 'data');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readAdminsFile(): Promise<AdminUser[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(ADMINS_FILE, 'utf8');
    return JSON.parse(raw) as AdminUser[];
  } catch {
    return [];
  }
}

async function writeAdminsFile(admins: AdminUser[]) {
  await ensureDataDir();
  await fs.writeFile(ADMINS_FILE, JSON.stringify(admins, null, 2), 'utf8');
}

export async function ensureSuperadmin(): Promise<void> {
  const { username, password } = getSuperadminCredentials();
  const passwordHash = hashPassword(password);
  const now = new Date().toISOString();

  // 1. Try Supabase
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (!error && !data) {
      await supabase.from('admins').insert([
        {
          username,
          password_hash: passwordHash,
          role: 'superadmin',
          created_at: now,
        },
      ]);
    }
  } catch {
    // Fallback to local
  }

  // 2. Ensure in local file
  const admins = await readAdminsFile();
  if (admins.length === 0 || !admins.some((a) => a.username === username)) {
    const superadmin: AdminUser = {
      username,
      passwordHash,
      role: 'superadmin',
      createdAt: now,
    };
    await writeAdminsFile([superadmin, ...admins.filter((a) => a.username !== username)]);
  }
}

export async function listAdmins(): Promise<Omit<AdminUser, 'passwordHash'>[]> {
  await ensureSuperadmin();

  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('id, username, role, created_at')
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        username: row.username,
        role: row.role as 'superadmin' | 'admin',
        createdAt: row.created_at,
      }));
    }
  } catch {
    // Fallback to local
  }

  const admins = await readAdminsFile();
  return admins.map(({ passwordHash: _, ...admin }) => admin);
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  await ensureSuperadmin();

  // Try Supabase
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (!error && data) {
      if (verifyPassword(password, data.password_hash)) {
        return {
          username: data.username,
          role: data.role as 'superadmin' | 'admin',
          createdAt: data.created_at,
        };
      }
      return null;
    }
  } catch {
    // Fallback to local
  }

  const admins = await readAdminsFile();
  const admin = admins.find((a) => a.username === username);
  if (!admin || !verifyPassword(password, admin.passwordHash)) return null;
  const { passwordHash: _, ...safe } = admin;
  return safe;
}

export async function addAdmin(
  username: string,
  password: string,
  role: 'admin' = 'admin'
): Promise<{ success: boolean; error?: string }> {
  await ensureSuperadmin();
  const passwordHash = hashPassword(password);
  const now = new Date().toISOString();

  // 1. Try Supabase
  try {
    const { error } = await supabase.from('admins').insert([
      {
        username,
        password_hash: passwordHash,
        role,
        created_at: now,
      },
    ]);

    if (error) {
      console.warn('Supabase admin insert error:', error.message);
    }
  } catch (err: any) {
    console.warn('Supabase admin insert exception:', err?.message);
  }

  // 2. Sync local
  const admins = await readAdminsFile();
  if (admins.some((a) => a.username === username)) {
    return { success: false, error: 'Admin username already exists' };
  }

  admins.push({
    username,
    passwordHash,
    role,
    createdAt: now,
  });

  await writeAdminsFile(admins);
  return { success: true };
}

export async function removeAdmin(
  username: string
): Promise<{ success: boolean; error?: string }> {
  await ensureSuperadmin();

  // 1. Check if trying to delete superadmin credentials
  const superCreds = getSuperadminCredentials();
  if (username === superCreds.username) {
    return { success: false, error: 'Cannot remove the superadmin account' };
  }

  // 2. Try Supabase
  try {
    const { error } = await supabase.from('admins').delete().eq('username', username);
    if (error) {
      console.warn('Supabase admin delete error:', error.message);
    }
  } catch (err: any) {
    console.warn('Supabase admin delete exception:', err?.message);
  }

  // 3. Sync local
  const admins = await readAdminsFile();
  const target = admins.find((a) => a.username === username);

  if (!target) {
    return { success: false, error: 'Admin not found' };
  }

  if (target.role === 'superadmin') {
    return { success: false, error: 'Cannot remove the superadmin account' };
  }

  const remaining = admins.filter((a) => a.username !== username);
  await writeAdminsFile(remaining);
  return { success: true };
}
