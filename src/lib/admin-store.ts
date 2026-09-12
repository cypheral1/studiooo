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
  const { username, password } = getSuperadminCredentials();

  // If superadmin not in list, make sure it is updated or present
  const superIndex = admins.findIndex((a) => a.role === 'superadmin');
  const now = new Date().toISOString();

  if (superIndex === -1) {
    admins.unshift({
      username,
      passwordHash: hashPassword(password),
      role: 'superadmin',
      createdAt: now,
    });
    await writeAdminsFile(admins);
  } else {
    // Ensure username is updated to clean format
    if (admins[superIndex].username !== username) {
      admins[superIndex].username = username;
      admins[superIndex].passwordHash = hashPassword(password);
      await writeAdminsFile(admins);
    }
  }
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
  if (!username || !password) return null;

  await ensureSuperadmin();
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  const superCreds = getSuperadminCredentials();
  const isSuperUserMatch =
    cleanUser === superCreds.username.toLowerCase() ||
    cleanUser === 'admin' ||
    cleanUser === 'superadmin' ||
    cleanUser === 'trueoriginalshopadmin' ||
    cleanUser === 'trueorginalshopadmin' ||
    cleanUser === 'trueoriginal';

  // Direct superadmin match
  if (isSuperUserMatch && cleanPass === superCreds.password) {
    return {
      username: superCreds.username,
      role: 'superadmin',
      createdAt: new Date().toISOString(),
    };
  }

  const admins = await readAdminsFile();

  // Check matching admin in file
  for (const a of admins) {
    const aUser = a.username.trim().toLowerCase();
    const isTarget =
      aUser === cleanUser ||
      (a.role === 'superadmin' && isSuperUserMatch);

    if (isTarget) {
      if (verifyPassword(cleanPass, a.passwordHash) || (a.role === 'superadmin' && cleanPass === superCreds.password)) {
        const { passwordHash: _, ...safe } = a;
        return safe;
      }
    }
  }

  return null;
}

export async function addAdmin(
  username: string,
  password: string,
  role: 'admin' = 'admin'
): Promise<{ success: boolean; error?: string }> {
  await ensureSuperadmin();
  const admins = await readAdminsFile();
  const cleanUser = username.trim();

  if (admins.some((a) => a.username.toLowerCase() === cleanUser.toLowerCase())) {
    return { success: false, error: 'Admin username already exists' };
  }

  admins.push({
    username: cleanUser,
    passwordHash: hashPassword(password.trim()),
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
  const target = admins.find((a) => a.username.toLowerCase() === username.trim().toLowerCase());

  if (!target) {
    return { success: false, error: 'Admin not found' };
  }

  if (target.role === 'superadmin') {
    return { success: false, error: 'Cannot remove the superadmin account' };
  }

  const remaining = admins.filter((a) => a.username.toLowerCase() !== username.trim().toLowerCase());
  await writeAdminsFile(remaining);
  return { success: true };
}
