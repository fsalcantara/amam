"use client";

import { useRef } from 'react';
import { Container } from '../../atoms/Container/Container';
import { Button } from '../../atoms/Button/Button';
import { PostCard } from '@/features/content-hub/components/PostCard';
import { POSTS } from '@/features/content-hub/data/mock-posts';
import styles from './WhatsHappeningPreview.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const WhatsHappeningPreview = () => {
  // Take first 3 posts for preview
  const posts = POSTS.slice(0, 3);
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
        start: "top 80%",
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
          <div className={styles.headerInfo}>
            <h2 className={styles.title}>O que está acontecendo na AMAM</h2>
            <p className={styles.subtitle}>Fique por dentro das nossas novidades, eventos e dicas.</p>
          </div>
          <div className={styles.actions}>
            <Button href="/acontecendo-na-amam" as="a" className={styles.verTudoButton}>
              Ver Tudo
            </Button>
          </div>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
