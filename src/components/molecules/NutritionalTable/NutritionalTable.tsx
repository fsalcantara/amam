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
      // 1. Initial fade in of the entire card
      gsap.fromTo(containerRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Staggered entry for sections and rows
      const rows = containerRef.current?.querySelectorAll(`.${styles.row}, .${styles.sectionHeader}`);
      if (rows) {
        gsap.fromTo(rows, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 0.2 }
        );
      }

      // 3. Animate progress bars
      const bars = containerRef.current?.querySelectorAll(`.${styles.progressFill}`);
      if (bars) {
        bars.forEach(bar => {
          const width = (bar as HTMLElement).dataset.width || "0%";
          gsap.fromTo(bar, 
            { width: 0 },
            { width: width, duration: 1.2, ease: "power4.out", delay: 0.6 }
          );
        });
      }

      // 4. Simple count up animation for kcal (just the main one)
      const caloriesVal = containerRef.current?.querySelector(`.${styles.caloriesValue}`);
      if (caloriesVal) {
        const value = parseInt(caloriesVal.textContent || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.4,
          onUpdate: () => {
            caloriesVal.textContent = Math.round(obj.val).toString();
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [product]);

  if (!product || !product.nutritionalInfo) {
    return <div className={styles.noData}>Informação nutricional não disponível.</div>;
  }

  const { servingSize, servingsPerPack, nutrients } = product.nutritionalInfo;

  const categories = [
    {
      id: 'macronutrients',
      name: 'Macronutrientes',
      items: [
        { label: 'Valor energético', key: 'valor_energetico_kcal', unit: 'kcal' },
        { label: 'Carboidratos', key: 'carboidratos_g', unit: 'g' },
        { label: 'Proteínas', key: 'proteinas_g', unit: 'g' },
        { label: 'Gorduras totais', key: 'gorduras_totais_g', unit: 'g' },
      ]
    },
    {
      id: 'breakdown',
      name: 'Detalhamento',
      items: [
        { label: 'Açúcares totais', key: 'acucares_totais_g', unit: 'g' },
        { label: 'Açúcares adicionados', key: 'acucares_adicionados_g', unit: 'g' },
        { label: 'Gorduras saturadas', key: 'gorduras_saturadas_g', unit: 'g' },
        { label: 'Gorduras trans', key: 'gorduras_trans_g', unit: 'g' },
        { label: 'Gorduras monoinsaturadas', key: 'gorduras_monoinsaturadas_g', unit: 'g' },
        { label: 'Gorduras poliinsaturadas', key: 'gorduras_poliinsaturadas_g', unit: 'g' },
        { label: 'Colesterol', key: 'colesterol_mg', unit: 'mg' },
      ]
    },
    {
      id: 'others',
      name: 'Outros',
      items: [
        { label: 'Fibras', key: 'fibras_g', unit: 'g' },
        { label: 'Sódio', key: 'sodio_mg', unit: 'mg' },
      ]
    }
  ];

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h2 className={styles.title}>Informação Nutricional</h2>
        <div className={styles.metadata}>
          <span>Porções por embalagem: <strong>{servingsPerPack}</strong></span>
          <span className={styles.dot}>•</span>
          <span>Porção: <strong>{servingSize}g</strong></span>
        </div>
      </header>

      <div className={styles.gridHeader}>
        <div className={styles.colLabel}>Nutriente</div>
        <div className={styles.colLabel}>100g</div>
        <div className={styles.colLabel}>Porção</div>
        <div className={styles.colLabel}>%VD*</div>
      </div>

      <div className={styles.content}>
        {categories.map((cat) => (
          <div key={cat.id} className={styles.section}>
            <h3 className={styles.sectionHeader}>{cat.name}</h3>
            {cat.items.map((item) => {
              const data = nutrients[item.key as keyof typeof nutrients];
              if (!data) return null;

              const isEnergy = item.key === 'valor_energetico_kcal';
              const vdPercent = data.vd || 0;

              return (
                <div key={item.key} className={styles.row}>
                  <div className={styles.nutrientName}>{item.label}</div>
                  <div className={styles.val100g}>{data.per100g}<span className={styles.unit}>{item.unit}</span></div>
                  <div className={`${styles.valPortion} ${isEnergy ? styles.caloriesValue : ''}`}>
                    {data.perServing}<span className={styles.unit}>{item.unit}</span>
                  </div>
                  <div className={styles.vdCol}>
                    <div className={styles.vdInfo}>
                      <span className={styles.vdNum}>{vdPercent}%</span>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          data-width={`${Math.min(Number(vdPercent), 100)}%`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>Percentual de valores diários fornecidos pela porção.</p>
        <p>No alimento pronto para consumo.</p>
      </footer>
    </div>
  );
};
