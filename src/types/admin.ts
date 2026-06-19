export type AdminRole = 'superadmin' | 'admin';

export interface AdminUser {
  username: string;
  passwordHash: string;
  role: AdminRole;
  createdAt: string;
}

export interface AdminSession {
  username: string;
  role: AdminRole;
  exp: number;
}
