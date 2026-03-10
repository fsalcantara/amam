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
        <div className={styles.imageCircle}></div>
        <img 
          src={product.image} 
          alt={product.name} 
          className={styles.image}
        />
      </Link>
      
      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title}>
          <Link href={`/produtos/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.footer}>
          <Button 
            href={`/produtos/${product.slug}`} 
            as="a" 
            variant="outline" 
            className={styles.button}
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};
