import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const row = await db.get('SELECT * FROM jobs WHERE id = ?', [id]);
    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({
      ...row,
      isActive: Boolean(row.is_active),
      requirements: row.requirements ? JSON.parse(row.requirements) : [],
      benefits: row.benefits ? JSON.parse(row.benefits) : [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    await db.run(`
      UPDATE jobs SET
        title = ?, area = ?, location = ?, type = ?,
        description = ?, requirements = ?, benefits = ?, is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      data.title, data.area, data.location, data.type,
      data.description, JSON.stringify(data.requirements || []), JSON.stringify(data.benefits || []),
      data.isActive ? 1 : 0, id
    ]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.run('DELETE FROM jobs WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
