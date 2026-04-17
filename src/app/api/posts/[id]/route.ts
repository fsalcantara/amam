import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const d = await req.json();
    await db.run(
      `UPDATE posts SET
        title = COALESCE(?, title), slug = COALESCE(?, slug), type = COALESCE(?, type),
        excerpt = COALESCE(?, excerpt), content = COALESCE(?, content),
        date = COALESCE(?, date), author = COALESCE(?, author),
        is_featured = COALESCE(?, is_featured), cover_image = COALESCE(?, cover_image),
        gallery = COALESCE(?, gallery), video_url = COALESCE(?, video_url),
        event_date = COALESCE(?, event_date), location = COALESCE(?, location),
        status = COALESCE(?, status), target_audience = COALESCE(?, target_audience),
        format = COALESCE(?, format), hours = COALESCE(?, hours),
        ingredients = COALESCE(?, ingredients), preparation_steps = COALESCE(?, preparation_steps)
       WHERE id = ?`,
      [
        d.title ?? null, d.slug ?? null, d.type ?? null,
        d.excerpt ?? null, d.content ?? null,
        d.date ?? null, d.author ?? null,
        d.isFeatured !== undefined ? (d.isFeatured ? 1 : 0) : null,
        d.coverImage ?? null,
        d.gallery !== undefined ? JSON.stringify(d.gallery) : null,
        d.videoUrl ?? null, d.eventDate ?? null, d.location ?? null,
        d.status ?? null, d.targetAudience ?? null,
        d.format ?? null, d.hours ?? null,
        d.ingredients !== undefined ? JSON.stringify(d.ingredients) : null,
        d.preparationSteps !== undefined ? JSON.stringify(d.preparationSteps) : null,
        params.id,
      ]
    );
    const row = await db.get('SELECT * FROM posts WHERE id = ?', [params.id]);
    if (!row) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    return NextResponse.json(row);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.run('DELETE FROM posts WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
