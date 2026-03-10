"use client";

import { useRef } from 'react';
import { Container } from '../../atoms/Container/Container';
import { Button } from '../../atoms/Button/Button';
import { ProductCard } from '@/features/products/components/ProductCard';
import { PRODUCTS } from '@/features/products/data/mock-data';
import styles from './ProductsPreview.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const ProductsPreview = () => {
  // Take first 4 products for preview
  const products = PRODUCTS.slice(0, 4);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial states
    gsap.set(headerRef.current, { y: 20, opacity: 0 });
    gsap.set(gridRef.current ? gridRef.current.children : [], { y: 30, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // slightly earlier
        toggleActions: "play none none reverse"
      }
    });

    tl.to(headerRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power3.out" 
    })
    .to(gridRef.current ? gridRef.current.children : [], { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4");
    
  }, { scope: containerRef });

  return (
    <section className={styles.section} ref={containerRef}>
      <Container>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>Linha de Produtos</span>
          <h2 className={styles.title}>Nossos Produtos</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Qualidade Amam em cada detalhe. Conheça nossa seleção de produtos feitos com ingredientes rigorosamente selecionados.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Button href="/produtos" as="a" variant="primary">
            Ver Todos os Produtos
          </Button>
        </div>
      </Container>
    </section>
  );
};
