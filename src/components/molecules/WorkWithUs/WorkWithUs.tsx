"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './WorkWithUs.module.css';

const JOB_AREAS = [
  {
    id: 'admin',
    title: 'Administrativo',
    vacancies: ['Analista Financeiro', 'Assistente de RH', 'Recepção']
  },
  {
    id: 'production',
    title: 'Produção',
    vacancies: ['Auxiliar de Padaria', 'Confeiteiro', 'Supervisor de Qualidade']
  },
  {
    id: 'logistics',
    title: 'Logística',
    vacancies: ['Motorista Entregador', 'Auxiliar de Estoque', 'Gestor de Frota']
  },
  {
    id: 'commercial',
    title: 'Comercial',
    vacancies: ['Vendedor Externo', 'Promotor de Vendas', 'Atendimento ao Cliente']
  }
];

export const WorkWithUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Close on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]); // Re-bind if isOpen changes (though ref logic is stable, dependency is safe)

  const openDropdown = () => {
    setIsOpen(true);
    if (dropdownRef.current) {
      gsap.set(dropdownRef.current, { display: 'block' });
      gsap.to(dropdownRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
      
      // Stagger animations for columns
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: 'power2.out' }
        );
      }
    }
  };

  const closeDropdown = () => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
             setIsOpen(false);
             gsap.set(dropdownRef.current!, { display: 'none' }); 
             // Use non-null assertion or check inside
        }
      });
    } else {
        setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  return (
    <div className={styles.container}>
      <button 
        ref={triggerRef}
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        Trabalhe Conosco
        <span className={styles.icon}>▼</span>
      </button>

      <div ref={dropdownRef} className={styles.dropdown}>
        <button className={styles.closeButton} onClick={closeDropdown} aria-label="Fechar">×</button>
        <div ref={contentRef} className={styles.grid}>
          {JOB_AREAS.map((area) => (
            <div key={area.id} className={styles.column}>
              <h4 className={styles.columnTitle}>{area.title}</h4>
              <ul className={styles.vacancyList}>
                {area.vacancies.map((vacancy, index) => (
                  <li key={index} className={styles.vacancyItem}>
                    <Link href={`/trabalhe-conosco/${area.id}`} className={styles.vacancyLink} onClick={closeDropdown}>
                      {vacancy}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
