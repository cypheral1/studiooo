import { NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/admin-store';
import { createSessionToken, sessionCookieOptions } from '@/lib/admin-auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const admin = await authenticateAdmin(username, password);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = createSessionToken(admin.username, admin.role);
    const response = NextResponse.json({
      success: true,
      admin: { username: admin.username, role: admin.role },
    });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
