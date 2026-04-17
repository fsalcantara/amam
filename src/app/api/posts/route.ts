import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

function rowToPost(row: any) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    type: row.type,
    excerpt: row.excerpt,
    content: row.content,
    date: row.date,
    author: row.author,
    isFeatured: Boolean(row.is_featured),
    coverImage: row.cover_image,
    gallery: row.gallery ? JSON.parse(row.gallery) : [],
    videoUrl: row.video_url,
    eventDate: row.event_date,
    location: row.location,
    status: row.status,
    targetAudience: row.target_audience,
    format: row.format,
    hours: row.hours,
    ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
    preparationSteps: row.preparation_steps ? JSON.parse(row.preparation_steps) : [],
    createdAt: row.created_at,
  };
}

export async function GET() {
  try {
    const rows = await db.all('SELECT * FROM posts ORDER BY created_at DESC');
    return NextResponse.json(rows.map(rowToPost));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    const id = Math.random().toString(36).substr(2, 9);
    const slug = d.slug || d.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    await db.run(
      `INSERT INTO posts (id, title, slug, type, excerpt, content, date, author, is_featured,
        cover_image, gallery, video_url, event_date, location, status,
        target_audience, format, hours, ingredients, preparation_steps)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id, d.title, slug, d.type || 'blog', d.excerpt || null, d.content || null,
        d.date || new Date().toISOString().split('T')[0], d.author || null,
        d.isFeatured ? 1 : 0, d.coverImage || null,
        d.gallery ? JSON.stringify(d.gallery) : null,
        d.videoUrl || null, d.eventDate || null, d.location || null, d.status || null,
        d.targetAudience || null, d.format || null, d.hours || null,
        d.ingredients ? JSON.stringify(d.ingredients) : null,
        d.preparationSteps ? JSON.stringify(d.preparationSteps) : null,
      ]
    );

    const row = await db.get('SELECT * FROM posts WHERE id = ?', [id]);
    return NextResponse.json(rowToPost(row), { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
