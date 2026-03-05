"use client";

import { useRef } from 'react';
import { HistoryTimeline } from '@/features/institutional/components/HistoryTimeline';
import { Leadership } from '@/features/institutional/components/Leadership';
import { FutureVision } from '@/features/institutional/components/FutureVision';
import { BrandEssence } from '@/features/institutional/components/BrandEssence';
import { Values } from '@/features/institutional/components/Values';
import { Pillars } from '@/features/institutional/components/Pillars';
import { Manifesto } from '@/features/institutional/components/Manifesto';
import { SectionDivider } from '@/components/atoms/SectionDivider/SectionDivider';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(containerRef.current?.querySelectorAll('.section-wrapper') || []);

    sections.forEach((section) => {
      gsap.fromTo(section, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* 1. History — White */}
      <div className="section-wrapper"><HistoryTimeline /></div>
      <SectionDivider variant="white-to-red" />

      {/* 2. Future Vision — Red & White Curve */}
      <div className="section-wrapper" style={{ position: 'relative', zIndex: 10 }}><FutureVision /></div>
      <SectionDivider variant="white-to-red" />
      
      {/* 3. Brand Essence — Red (Continuous) */}
      <div className="section-wrapper" style={{ position: 'relative', zIndex: 1 }}><BrandEssence /></div>
      
      {/* 4. Values — Red (Continuous) */}
      <div className="section-wrapper"><Values /></div>
      <SectionDivider variant="red-to-white" />

      {/* 5. Pillars — White */}
      <div className="section-wrapper"><Pillars /></div>
      <SectionDivider variant="white-to-red" />

      {/* 6. Leadership — Red */}
      <div className="section-wrapper"><Leadership /></div>

      {/* 7. Manifesto (Banner Image + Form on Red) */}
      <div className="section-wrapper" style={{ position: 'relative', zIndex: 20, marginBottom: '-80px' }}><Manifesto /></div>
    </div>
  );
}
