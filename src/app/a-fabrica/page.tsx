"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import styles from './page.module.css';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AFabricaPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 2. Horizontal Scroll Logic
        const slides = gsap.utils.toArray(`.${styles.slide}`);
        const totalSlides = slides.length;

        const scrollTween = gsap.to(wrapperRef.current, {
            x: () => -(wrapperRef.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 0.5,
                snap: {
                    snapTo: 1 / (totalSlides - 1),
                    duration: { min: 0.2, max: 0.7 },
                    delay: 0,
                    ease: "power2.inOut"
                },
                invalidateOnRefresh: true,
                end: () => `+=${wrapperRef.current!.scrollWidth - window.innerWidth}`,
                onUpdate: (self) => {
                    // Update progress line
                    if (progressRef.current) {
                        gsap.set(progressRef.current, { scaleX: self.progress });
                    }
                }
            }
        });

        // 3. Splitting Text Effect (Dynamic Import to avoid SSR error)
        const initSplitting = async () => {
            const { default: Splitting } = await import('splitting');
            const titleItems = document.querySelectorAll(`.${styles.splitText}`);
            Splitting({ target: titleItems, by: 'chars' });

            gsap.from(`.${styles.heroSlide} .char`, {
                opacity: 0,
                y: 100,
                rotateX: -90,
                stagger: 0.05,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: `.${styles.heroSlide}`,
                    start: "top center",
                }
            });
        };

        initSplitting();

        // 4. Parallax & Stagger Effects for each slide
        slides.forEach((slide: any, i) => {
            // Smooth fade in on entry (Skip first slide as it should be visible immediately)
            if (i > 0) {
                gsap.from(slide.querySelector(`.${styles.slideContent}`), {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: scrollTween,
                        start: "left center",
                        toggleActions: "play none none reverse"
                    }
                });
            } else {
                // Ensure first slide is visible
                gsap.set(slide.querySelector(`.${styles.slideContent}`), { opacity: 1, y: 0 });
            }

            // Slide 2: Drawing the red line (SVG)
            if (i === 1) {
                gsap.from(`.${styles.drawingLine}`, {
                    strokeDashoffset: 1000,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: scrollTween,
                        start: "left center"
                    }
                });
            }

            // Slide 3: Card stagger
            if (i === 2) {
                gsap.from(`.${styles.processCard}`, {
                    y: 60,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: scrollTween,
                        start: "left center"
                    }
                });
            }

            // Slide 4: Parallax Image
            if (i === 3) {
                gsap.to(`.${styles.parallaxImg}`, {
                    x: -50,
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: scrollTween,
                        scrub: true
                    }
                });
            }
        });

        // 5. Custom Cursor
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', moveCursor);

        return () => {
            lenis.destroy();
            window.removeEventListener('mousemove', moveCursor);
        };
    }, { scope: containerRef });

    return (
        <div className={styles.root}>
            {/* Custom Cursor */}
            <div className={styles.cursor} ref={cursorRef}></div>
            
            {/* Progress indicator */}
            <div className={styles.progressBar}>
                <div className={styles.progressLine} ref={progressRef}></div>
            </div>

            {/* Main scroll container */}
            <div className={styles.container} ref={containerRef}>
                <div className={styles.horizontalWrapper} ref={wrapperRef}>
                    
                    {/* Slide 1: HERO */}
                    <section className={`${styles.slide} ${styles.heroSlide}`}>
                        <div className={styles.slideBg}>
                            <img src="/SITE/Empresa/fachada_amam.jpg" alt="Fábrica fachada" />
                            <div className={styles.overlay}></div>
                        </div>
                        <div className={`${styles.slideContent} ${styles.centeredContent}`}>
                            <span className={styles.badge}>NOSSA CASA</span>
                            <h1 className={`${styles.heroTitle} ${styles.splitText}`} data-splitting>
                                A Fábrica AMAM
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Onde a tecnologia industrial encontra o cuidado artesanal para criar o pão perfeito.
                            </p>
                        </div>
                    </section>

                    {/* Slide 2: TECNOLOGIA & QUALIDADE */}
                    <section className={`${styles.slide} ${styles.techSlide}`}>
                        <div className={styles.slideContent}>
                            <div className={styles.splitLayout}>
                                <div className={styles.layoutText}>
                                    <div className={styles.statBox}>
                                        <h2 className={styles.bigStat}>+3.000m²</h2>
                                        <p className={styles.statLabel}>Área Fabril</p>
                                    </div>
                                    <h3 className={styles.slideHeading}>Tecnologia e Qualidade</h3>
                                    <p className={styles.description}>
                                        Localizada em Vitória da Conquista - Bahia, nossa unidade fabril une a tradição das receitas afetivas da família Margutti ao que há de mais moderno em panificação industrial.
                                    </p>
                                    <svg viewBox="0 0 400 20" className={styles.svgLine}>
                                        <path d="M0,10 Q200,20 400,10" className={styles.drawingLine} stroke="#E8192C" strokeWidth="2" fill="none" strokeDasharray="1000" />
                                    </svg>
                                </div>
                                <div className={styles.layoutImage}>
                                    <div className={styles.imageAccent}>
                                        <img src="/SITE/Empresa/Paes_na_maquina.jpg" alt="Tecnologia AMAM" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Slide 3: NOSSO PROCESSO */}
                    <section className={`${styles.slide} ${styles.darkSlide} ${styles.processSlide}`}>
                        <div className={styles.grain}></div>
                        <div className={styles.slideContent}>
                            <h2 className={styles.slideHeading}>Nosso Processo</h2>
                            <div className={styles.processCards}>
                                {[
                                    { id: "01", title: "Seleção Ingredientes", img: "/SITE/Empresa/Imagem10.jpg" },
                                    { id: "02", title: "Mistura e Preparo", img: "/SITE/Empresa/Operador_mexendo_na_maquina.jpg" },
                                    { id: "03", title: "Modelagem", img: "/SITE/Empresa/Operadora_mexendo_no_pao.jpg" },
                                    { id: "04", title: "Forneamento", img: "/SITE/Empresa/operador_retirando_paes_forno.jpg" }
                                ].map((step) => (
                                    <div key={step.id} className={styles.processCard}>
                                        <div className={styles.cardImg}>
                                            <img src={step.img} alt={step.title} />
                                            <span className={styles.cardNum}>{step.id}</span>
                                        </div>
                                        <h4>{step.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Slide 4: AMBIENTE CONTROLADO */}
                    <section className={`${styles.slide} ${styles.envSlide}`}>
                        <div className={styles.slideContent}>
                            <div className={styles.splitLayout}>
                                <div className={styles.layoutImage}>
                                    <img src="/SITE/Empresa/Imagem20.jpg" alt="Ambiente Controlado" className={styles.parallaxImg} />
                                </div>
                                <div className={styles.layoutText}>
                                    <h2 className={styles.slideHeading}>Ambiente Controlado</h2>
                                    <p className={styles.description}>
                                        Trabalhamos em um ambiente com temperatura e higiene rigorosamente controlados.
                                        Nossa equipe utiliza todos os EPIs necessários e segue protocolos internacionais de boas práticas de fabricação (BPF).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Slide 5: CTA */}
                    <section className={`${styles.slide} ${styles.ctaSlide}`}>
                        <div className={styles.slideContent}>
                            <h2 className={styles.ctaTitle}>Vamos crescer juntos?</h2>
                            <div className={styles.ctaActions}>
                                <Link href="/contato" className={styles.ghostBtn}>
                                    Fechar negócios
                                </Link>
                                <Link href="/trabalhe-conosco" className={styles.ghostBtn}>
                                    Trabalhar na AMAM
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
