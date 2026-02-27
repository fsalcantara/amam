"use client";

import { useState } from 'react';
import { Modal } from '@/components/molecules/Modal/Modal';
import { NutritionalTable } from '@/components/molecules/NutritionalTable/NutritionalTable';
import styles from './NutritionalInfo.module.css';

interface NutritionalInfoProps {
  summary?: {
    calories: string;
    servingSize: string;
  };
}

export const NutritionalInfo = ({ 
  summary = { calories: "126", servingSize: "50g (2 fatias)" } 
}: NutritionalInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.summary}>
          <div>
            <h3 className={styles.title}>Informação Nutricional</h3>
            <div className={styles.details}>
                {/* Simplified summary - could be props based */}
                <div className={styles.detailItem}>
                    <span className={styles.label}>Porção</span>
                    <span className={styles.value}>{summary.servingSize}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Calorias</span>
                    <span className={styles.value}>{summary.calories} kcal</span>
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
        <NutritionalTable />
      </Modal>
    </>
  );
};
