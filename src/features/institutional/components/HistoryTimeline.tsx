"use client";

import { useEffect, useRef } from 'react';
import { Container } from '@/components/atoms/Container/Container';
import styles from './HistoryTimeline.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HistoryTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const wheatRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(textRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(logoRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.6"
      );

      tl.fromTo(namesRef.current?.children || [],
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );

      tl.fromTo(wheatRef.current,
        { y: 20, opacity: 0, rotate: -10 },
        { y: 0, opacity: 0.4, rotate: 0, duration: 1, ease: "power2.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <Container>
        <div className={styles.grid}>
          {/* Left Column: Text */}
          <div className={styles.leftColumn}>
            <span className={styles.eyebrow}>Nossa Jornada</span>
            <h2 className={styles.title} ref={titleRef}>
              Nossa História
            </h2>
            <div className={styles.text} ref={textRef}>
              <p>
                A <strong>AMAM</strong> nasce do sonho de <strong>Antônio Carlos Margutti</strong> em criar uma marca própria que trouxesse tranquilidade e segurança para a família seguir os negócios. Ter uma marca própria significava autonomia para desenvolver, crescer e trabalhar no próprio ritmo.
              </p>
              <p>
                O pão foi a escolha natural: uniu a experiência da família com décadas na produção às receitas caseiras e afetivas da sua mãe. Assim nasceu a essência, um produto com sabor de casa e conhecimento técnico de alto nível.
              </p>
            </div>
          </div>

          {/* Right Column: Logo Breakdown */}
          <div className={styles.rightColumn}>
            <div className={styles.logoWrapper}>
              <img 
                src="/SITE/LOGO/logo-color.png" 
                alt="AMAM Alimentos" 
                className={styles.logo}
                ref={logoRef}
              />
            </div>

            <div className={styles.explanationHeader}>
              <h3 className={styles.subtitle}>
                O nosso nome é a união da
                <span> inicial dos fundadores</span>
              </h3>
            </div>

            <div className={styles.names} ref={namesRef}>
              <div className={styles.nameItem}><span>A</span>ntônio</div>
              <div className={styles.nameItem}><span>M</span>árcio</div>
              <div className={styles.nameItem}><span>A</span>lmir</div>
            </div>

            <p className={styles.description}>
              Representam a força desta parceria.
            </p>
             
            <img 
              src="/SITE/Pagina/Sobre/Nossos Pilares/imagem-nossos-pilares.png" 
              alt="Planta (Trigo)" 
              className={styles.wheatIcon} 
              ref={wheatRef}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
