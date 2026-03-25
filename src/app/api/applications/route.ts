import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = await db.all('SELECT * FROM applications ORDER BY created_at DESC');
    const applications = rows.map(row => ({
      ...row,
      jobId: row.job_id,
      answers: row.answers ? JSON.parse(row.answers) : [],
      proctoring: row.proctoring ? JSON.parse(row.proctoring) : null,
      aiAnalysis: row.ai_analysis ? JSON.parse(row.ai_analysis) : null,
      createdAt: row.created_at,
    }));
    return NextResponse.json(applications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = Math.random().toString(36).substr(2, 9);
    
    await db.run(`
      INSERT INTO applications (
        id, job_id, name, cpf, email, phone, linkedin, cv_url, answers, proctoring, ai_analysis
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id, 
      data.jobId, 
      data.name, 
      data.cpf, 
      data.email, 
      data.phone, 
      data.linkedin, 
      data.cvUrl || null, 
      JSON.stringify(data.answers || []), 
      JSON.stringify(data.proctoring || null), 
      JSON.stringify(data.aiAnalysis || null)
    ]);

    return NextResponse.json({ id, ...data, createdAt: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
