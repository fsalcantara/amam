"use client";

import { useEffect, useRef } from 'react';
import { Container } from '@/components/atoms/Container/Container';
import styles from './FutureVision.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const FutureVision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Curve/Wave fade in
      tl.fromTo(curveRef.current, 
        { opacity: 0, scaleY: 0.8 },
        { opacity: 1, scaleY: 1, duration: 1, ease: "power2.out" }
      );

      // 2. Headline and Eyebrow slide up
      tl.fromTo([eyebrowRef.current, titleRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );

      // 3. Supporting Paragraph fade in
      tl.fromTo(textRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      // 4. Bread products rise slightly - adjusted starting position for better overlap
      tl.fromTo(imageRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
        "-=0.8"
      );

      // 5. Mission statement manifesto fade in
      tl.fromTo(manifestoRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Top Red Part with Gradient */}
      <div className={styles.topRed}>
        <Container>
          <div className={styles.topGrid}>
             <div className={styles.titleCol}>
               <span className={styles.eyebrow} ref={eyebrowRef}>Nossa Visão</span>
               <h2 className={styles.title} ref={titleRef}>
                 Visão de <br /> Futuro
               </h2>
             </div>
             
             <div className={styles.textCol} ref={textRef}>
               <p className={styles.topText}>
                 A Delongo & Margutti tem a ambição de ir além do pão: ele é a base para um portfólio diversificado que incluirá panetones e biscoitos, cada um com marcas próprias, mas sob a identidade central AMAM.
               </p>
             </div>
          </div>
        </Container>
      </div>

      {/* Middle Breads with Radial Glow */}
      <div className={styles.middleOverlap}>
        <div className={styles.curveBg} ref={curveRef}>
           <svg viewBox="0 0 1440 120" className={styles.curveSvg} preserveAspectRatio="none">
             <path d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z" fill="#ffffff" />
           </svg>
           <div className={styles.solidWhiteBg}></div>
        </div>
        
        <Container>
          <div className={styles.imageWrapper} ref={imageRef}>
            <div className={styles.radialGlow}></div>
            <img 
              src="/SITE/Pagina/Sobre/Visão de futuro/paes-amam.png" 
              alt="Pães Amam" 
              className={styles.image}
            />
          </div>
        </Container>
      </div>

      {/* Bottom White Part with Manifesto Block */}
      <div className={styles.bottomWhite}>
        <Container>
          <div className={styles.manifestoContainer} ref={manifestoRef}>
            <p className={styles.manifestoText}>
              <span className={styles.manifestoHighlight}>
                Nosso principal objetivo é ser líder no fornecimento de pães embalados de alta qualidade, 
                levando alegria e praticidade às famílias.
              </span>
            </p>
            <p className={styles.subText}>
              Buscamos incorporar tradição familiar, cuidado e inovação em diferentes momentos de consumo, 
              mantendo sempre a conexão com o cliente.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
};
