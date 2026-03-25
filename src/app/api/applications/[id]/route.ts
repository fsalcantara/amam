import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    
    // We update mostly AI Analysis or status
    if (data.aiAnalysis) {
      await db.run('UPDATE applications SET ai_analysis = ? WHERE id = ?', [JSON.stringify(data.aiAnalysis), params.id]);
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.run('DELETE FROM applications WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
