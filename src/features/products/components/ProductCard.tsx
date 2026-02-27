import Link from 'next/link';
import { Button } from '@/components/atoms/Button/Button';
import { Product } from '../types/product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/produtos/${product.slug}`} className={styles.imageContainer}>
        {/* Placeholder for now */}
        <div className={styles.placeholder}>
          {product.name}
        </div>
      </Link>
      
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>
          <Link href={`/produtos/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={styles.description}>{product.description}</p>
        
        <Button href={`/produtos/${product.slug}`} as="a" variant="outline" style={{ width: '100%' }}>
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};
