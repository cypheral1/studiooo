import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { AdminUser } from '@/types/admin';
import {
  getSuperadminCredentials,
  hashPassword,
  verifyPassword,
} from '@/lib/admin-auth';

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
  const admins = await readAdminsFile();
  if (admins.length > 0) return;

  const { username, password } = getSuperadminCredentials();
  const superadmin: AdminUser = {
    username,
    passwordHash: hashPassword(password),
    role: 'superadmin',
    createdAt: new Date().toISOString(),
  };
  await writeAdminsFile([superadmin]);
}

export async function listAdmins(): Promise<Omit<AdminUser, 'passwordHash'>[]> {
  await ensureSuperadmin();
  const admins = await readAdminsFile();
  return admins.map(({ passwordHash: _, ...admin }) => admin);
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<Omit<AdminUser, 'passwordHash'> | null> {
  await ensureSuperadmin();
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
  const admins = await readAdminsFile();

  if (admins.some((a) => a.username === username)) {
    return { success: false, error: 'Admin username already exists' };
  }

  admins.push({
    username,
    passwordHash: hashPassword(password),
    role,
    createdAt: new Date().toISOString(),
  });

  await writeAdminsFile(admins);
  return { success: true };
}

export async function removeAdmin(
  username: string
): Promise<{ success: boolean; error?: string }> {
  await ensureSuperadmin();
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
