import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { addAdmin, listAdmins, removeAdmin } from '@/lib/admin-store';

export async function GET() {
  const session = await getAdminSession();
  if (!session || session.role !== 'superadmin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  const admins = await listAdmins();
  return NextResponse.json({ success: true, admins });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== 'superadmin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json(
      { success: false, error: 'Username and password are required' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { success: false, error: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  const result = await addAdmin(username, password);
  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  const admins = await listAdmins();
  return NextResponse.json({ success: true, admins }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== 'superadmin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  const { username } = await req.json();
  if (!username) {
    return NextResponse.json(
      { success: false, error: 'Username is required' },
      { status: 400 }
    );
  }

  const result = await removeAdmin(username);
  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  const admins = await listAdmins();
  return NextResponse.json({ success: true, admins });
}
