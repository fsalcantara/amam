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
          <div className={styles.imageWrapper} ref={imageRef}>
            <img 
              src="/SITE/thumbnail.png" 
              alt="AMAM Institucional" 
              className={styles.image}
            />
          </div>
          
          <div className={styles.content} ref={contentRef}>
            <h2>Nossa História e Propósito</h2>
            <p>
              A AMAM nasce de um sonho de Antônio
              Carlos Margutti (Em memória).

              Para famílias que buscam confiança e sabor no dia a dia, a AMAM oferece pães 
              de qualidade superior, feitos com afeto e
              conhecimento.

              Nossa força está na tradição familiar unida à experiência industrial,
              entregando um pão macio, gostoso e feito para estar presente em cada momento.
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
