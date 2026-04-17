export const dynamic = 'force-dynamic';

import db from '@/lib/db';
import { Post } from '@/features/content-hub/types/post';
import { ContentHubClient } from './ContentHubClient';

function rowToPost(row: any): Post {
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

export default async function ContentHubPage() {
  const rows = await db.all('SELECT * FROM posts ORDER BY created_at DESC');
  const posts = rows.map(rowToPost);
  return <ContentHubClient posts={posts} />;
}
