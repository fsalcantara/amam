"use client";

import { useRef } from 'react';
import { Container } from '../../atoms/Container/Container';
import { Button } from '../../atoms/Button/Button';
import styles from './InstitutionalTeaser.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const InstitutionalTeaser = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(imageRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(contentRef.current, 
      { x: 50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <section className={styles.section} ref={containerRef}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imagePlaceholder} ref={imageRef}>
            {/* Visual content / Image goes here */}
            <span>Imagem Institucional</span>
          </div>
          
          <div className={styles.content} ref={contentRef}>
            <h2>Nossa História e Propósito</h2>
            <p>
              A AMAM Alimentos é sinônimo de excelência e tradição. 
              Comprometidos com a qualidade desde a origem, levamos sabor 
              e confiança para a mesa de milhares de famílias com um toque de afeto.
            </p>
            <Button href="/sobre" as="a" variant="secondary">
              Conheça Nossa História
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
