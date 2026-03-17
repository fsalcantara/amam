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
      {/* VISÃO MOBILE: Card Resumido + Botão para Modal */}
      <div className={`${styles.container} ${styles.mobileOnly}`}>
        <div className={styles.inner}>
          <h3 className={styles.title}>Informação Nutricional</h3>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Porção</span>
              <span className={styles.value}>{product.nutritionalInfo.servingSize}g</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Calorias</span>
              <span className={styles.value}>
                {product.nutritionalInfo.nutrients.valor_energetico_kcal.perServing}
              </span>
            </div>
          </div>
        </div>
        
        <button 
          className={styles.footer}
          onClick={() => setIsModalOpen(true)}
        >
          <span>Ver tabela completa</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NutritionalTable product={product} />
      </Modal>

      {/* VISÃO DESKTOP: Tabela Técnica Direta */}
      <div className={`${styles.desktopOnly} ${styles.desktopTableContainer}`}>
        <NutritionalTable product={product} />
      </div>
    </>
  );
};
