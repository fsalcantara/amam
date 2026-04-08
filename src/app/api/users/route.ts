import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const users = await db.all(
      'SELECT id, username, name, role, is_active FROM users ORDER BY created_at ASC'
    );
    return NextResponse.json(users.map(u => ({ ...u, isActive: Boolean(u.is_active) })));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
