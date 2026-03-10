"use client";

import { useState } from 'react';
import { Modal } from '@/components/molecules/Modal/Modal';
import { NutritionalTable } from '@/components/molecules/NutritionalTable/NutritionalTable';
import styles from './NutritionalInfo.module.css';

import { Product } from '@/features/products/types/product';

interface NutritionalInfoProps {
  product: Product;
}

export const NutritionalInfo = ({ product }: NutritionalInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product || !product.nutritionalInfo) return null;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.summary}>
          <div>
            <h3 className={styles.title}>Informação Nutricional</h3>
            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Porção</span>
                    <span className={styles.value}>{product.nutritionalInfo.servingSize}g</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Calorias</span>
                    <span className={styles.value}>
                      {product.nutritionalInfo.nutrients.valor_energetico_kcal.perServing} kcal
                    </span>
                </div>
            </div>
          </div>
          
          <button 
            className={styles.button}
            onClick={() => setIsModalOpen(true)}
          >
            Ver tabela completa
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NutritionalTable product={product} />
      </Modal>
    </>
  );
};
