"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '../../atoms/Container/Container';
import { Button } from '../../atoms/Button/Button';
import styles from './Header.module.css';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Amam Alimentos
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/sobre" className={styles.navLink}>Quem Somos</Link>
          <Link href="/produtos" className={styles.navLink}>Produtos</Link>
          <Link href="/trabalhe-conosco" className={styles.navLink}>Trabalhe Conosco</Link>
          <Link href="/acontecendo-na-amam" className={styles.navLink}>O que está acontecendo</Link>
        </nav>

        <div className={styles.actions}>
          <Button href="/contato" as="a" variant="primary">
            Fale Conosco
          </Button>
        </div>
      </Container>
    </header>
  );
};
