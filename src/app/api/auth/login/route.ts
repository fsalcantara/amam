import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (!user) {
      return NextResponse.json({ error: 'Usuário ou senha inválidos' }, { status: 401 });
    }

    if (!user.is_active) {
      return NextResponse.json({ error: 'Usuário inativo' }, { status: 403 });
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      isActive: Boolean(user.is_active),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
