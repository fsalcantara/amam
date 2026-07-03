import { Hero } from "@/components/organisms/Hero/Hero";
import { ProductsPreview } from "@/components/organisms/ProductsPreview/ProductsPreview";
import { InstitutionalTeaser } from "@/components/organisms/InstitutionalTeaser/InstitutionalTeaser";
import { WhatsHappeningPreview } from "@/components/organisms/WhatsHappeningPreview/WhatsHappeningPreview";
import { SectionDivider } from "@/components/atoms/SectionDivider/SectionDivider";
import db from "@/lib/db";
import { Post } from "@/features/content-hub/types/post";

export const dynamic = 'force-dynamic';

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
    recipeNote: row.recipe_note,
    createdAt: row.created_at,
  };
}

export default async function Home() {
  const rows = await db.all('SELECT * FROM posts WHERE is_featured = 1 ORDER BY created_at DESC LIMIT 3');
  const featuredPosts = rows.map(rowToPost);

  return (
    <>
      <Hero
        headline="Chegou a fatia que faltava"
        subheadline="Descubra a excelência dos produtos Amam Alimentos. Tradição que alimenta famílias com confiança."
        ctaText="Conheça Nossos Produtos"
        ctaLink="/produtos"
      />

      {/* Hero (dark) → Products (white) — no wave needed, hero has its own bottom edge */}

      <ProductsPreview />

      <SectionDivider variant="white-to-red" />

      <InstitutionalTeaser />

      <WhatsHappeningPreview posts={featuredPosts} />
    </>
  );
}
