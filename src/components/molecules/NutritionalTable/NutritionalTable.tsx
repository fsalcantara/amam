"use client";

import { useEffect, useRef } from 'react';
import styles from './NutritionalTable.module.css';
import { Product } from '@/features/products/types/product';
import gsap from 'gsap';

interface NutritionalTableProps {
  product?: Product;
}

export const NutritionalTable = ({ product }: NutritionalTableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [product]);

  if (!product || !product.nutritionalInfo) {
    return <div className={styles.noData}>Informação nutricional não disponível.</div>;
  }

  const { servingSize, servingsPerPack, nutrients } = product.nutritionalInfo;

  const tableRows = [
    { label: 'Valor energético (kcal)', key: 'valor_energetico_kcal', indent: false },
    { label: 'Carboidratos totais (g)', key: 'carboidratos_g', indent: false },
    { label: 'Açúcares totais (g)', key: 'acucares_totais_g', indent: true },
    { label: 'Açúcares adicionados (g)', key: 'acucares_adicionados_g', indent: true },
    { label: 'Proteínas (g)', key: 'proteinas_g', indent: false },
    { label: 'Gorduras totais (g)', key: 'gorduras_totais_g', indent: false },
    { label: 'Gorduras saturadas (g)', key: 'gorduras_saturadas_g', indent: true },
    { label: 'Gorduras trans (g)', key: 'gorduras_trans_g', indent: true },
    { label: 'Gorduras monoinsaturadas (g)', key: 'gorduras_monoinsaturadas_g', indent: true },
    { label: 'Gorduras poli-insaturadas (g)', key: 'gorduras_poliinsaturadas_g', indent: true },
    { label: 'Colesterol (mg)', key: 'colesterol_mg', indent: true },
    { label: 'Fibras alimentares (g)', key: 'fibras_g', indent: false },
    { label: 'Sódio (mg)', key: 'sodio_mg', indent: false },
  ];

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.productInfo}>
        {product.ingredients && (
          <div className={styles.infoSection}>
            <strong>INGREDIENTES:</strong> {product.ingredients.toUpperCase()}
          </div>
        )}

        <div className={styles.warnings}>
          {product.allergens && (
            <div className={styles.warningItem}>
              <strong>ALÉRGICOS: {product.allergens.toUpperCase()}</strong>
            </div>
          )}
          
          {product.mayContain && (
            <div className={styles.warningItem}>
              <strong>PODE CONTER {product.mayContain.toUpperCase()}</strong>
            </div>
          )}

          <div className={styles.glutenCapsule}>
            <strong>{product.containsGluten ? 'CONTÉM GLÚTEN.' : 'NÃO CONTÉM GLÚTEN.'}</strong>
          </div>
        </div>
      </div>

      <div className={styles.labelFrame}>
        <header className={styles.header}>
          <h2 className={styles.title}>INFORMAÇÃO NUTRICIONAL</h2>
          <div className={styles.servingInfo}>
            <p>Porção: {servingSize}g (2 fatias)</p>
            <p>Porções por embalagem: cerca de {servingsPerPack}</p>
          </div>
        </header>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.colNutrient}>Nutrientes</th>
                <th className={styles.colValue}>100 g</th>
                <th className={styles.colValue}>{servingSize} g</th>
                <th className={styles.colVD}>%VD*</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => {
                const data = nutrients[row.key as keyof typeof nutrients];
                if (!data) return null;

                return (
                  <tr key={row.key} className={row.indent ? styles.indentedRow : styles.mainRow}>
                    <td className={styles.nutrientName}>
                      {row.label}
                    </td>
                    <td className={styles.val}>{data.per100g}</td>
                    <td className={styles.val}>{data.perServing}</td>
                    <td className={styles.vdVal}>
                      {isNaN(Number(data.vd)) ? data.vd : `${data.vd}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <footer className={styles.footer}>
          <p>* Percentual de valores diários fornecidos pela porção.</p>
        </footer>
      </div>
    </div>
  );
};
