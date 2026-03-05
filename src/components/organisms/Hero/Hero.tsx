"use client";

import { useRef } from 'react';
import { Container } from '../../atoms/Container/Container';
import { Button } from '../../atoms/Button/Button';
import styles from './Hero.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  headline: string;
  subheadline?: string;
  imageSrc?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero = ({ 
  headline, 
  subheadline, 
  imageSrc = '/hero-placeholder.jpg',
  ctaText = 'Saiba Mais',
  ctaLink = '/produtos'
}: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(headlineRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo(subheadlineRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      '-=0.6'
    )
    .fromTo(actionsRef.current?.children || [], 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15 }, 
      '-=0.4'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.heroBackground} />
      <div className={styles.gradientOverlay} />
      
      <Container className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 ref={headlineRef} className={styles.headline}>
              {headline}
              <span className={styles.subtext}>a fatia que faltava</span>
            </h1>
            <div className={styles.wheatIcon}>
              {/* Optional wheat icon or similar decorative element if needed, though we can use CSS */}
            </div>
          </div>

          <div className={styles.productVisual}>
            <img 
              src="/SITE/BANNER/Pães Amam.png" 
              alt="Pães Amam" 
              className={styles.breadPackages} 
            />
          </div>
        </div>
      </Container>

      <div className={styles.scrollIndicator}>
        <svg 
          className={styles.arrowIcon}
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
        <span>Conheça a Amam</span>
      </div>
    </section>
  );
};
