import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = await db.all('SELECT * FROM jobs ORDER BY created_at DESC');
    const jobs = rows.map(row => ({
      ...row,
      isActive: Boolean(row.is_active),
      requirements: row.requirements ? JSON.parse(row.requirements) : [],
      benefits: row.benefits ? JSON.parse(row.benefits) : [],
      // Se houver screeningQuestions, elas podem estar no app ou em outra tabela, 
      // mas para simplificar vamos assumir que não estão no db por enquanto ou são fixas no mock.
      // Se o usuário pedir para migrar as perguntas de triagem, faremos depois.
    }));
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = Math.random().toString(36).substr(2, 9);
    
    await db.run(`
      INSERT INTO jobs (id, title, area, location, type, description, requirements, benefits, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      data.title,
      data.area || 'admin',
      data.location || '',
      data.type || 'CLT',
      data.description || '',
      JSON.stringify(data.requirements || []), 
      JSON.stringify(data.benefits || []), 
      data.isActive ? 1 : 0
    ]);

    return NextResponse.json({ id, ...data, createdAt: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
