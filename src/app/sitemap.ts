import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/features/products/data/mock-data';
import db from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.amamalimentos.com.br';

  const productUrls = PRODUCTS.map((product) => ({
    url: `${baseUrl}/produtos/${product.slug}`,
    lastModified: new Date(),
  }));

  const rows = await db.all('SELECT slug, date FROM posts ORDER BY created_at DESC');
  const postUrls = rows.map((post: any) => ({
    url: `${baseUrl}/acontecendo-na-amam/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/acontecendo-na-amam`,
      lastModified: new Date(),
    },
    ...productUrls,
    ...postUrls,
  ];
}
