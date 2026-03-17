import { Container } from '@/components/atoms/Container/Container';
import { Button } from '@/components/atoms/Button/Button';
import { productService } from '@/features/products/services/productService';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { NutritionalInfo } from '@/components/organisms/NutritionalInfo/NutritionalInfo';

interface ProductDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: ProductDetailProps
) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Produto não encontrado',
    };
  }

  return {
    title: `${product.name} | Amam Alimentos`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const resolvedParams = await params;
  const product = await productService.getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.breadcrumbs}>
          <a href="/produtos">Produtos</a>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.imageContainer}>
            <img 
              src={product.image} 
              alt={product.name} 
              className={styles.productImage} 
            />
          </div>

          <div className={styles.content}>
            <span className={styles.categoryBadge}>{product.category}</span>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.descriptionText}>{product.description}</p>
            
            {product.highlights && (
              <div className={styles.highlights}>
                {product.highlights.split(' - ').map((item, index) => (
                  <span key={index} className={styles.highlightItem}>
                    {item}
                  </span>
                ))}
              </div>
            )}

            <NutritionalInfo product={product} />

            <div className={styles.actions}>
              <Button href="/contato" as="a" variant="primary">
                Tenho Interesse
              </Button>
              <Button href="/produtos" as="a" variant="outline">
                Voltar para Lista
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
