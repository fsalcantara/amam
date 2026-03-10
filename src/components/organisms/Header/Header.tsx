"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../../atoms/Container/Container';
import { Button } from '../../atoms/Button/Button';
import styles from './Header.module.css';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image 
            src={(isScrolled || isMobileMenuOpen) ? "/SITE/LOGO/logo-color.png" : "/SITE/LOGO/logo-white.png"} 
            alt="Amam Alimentos Logo" 
            width={260}
            height={106}
            className={styles.logoImage}
            priority
          />
        </Link>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileNav : ''}`}>
          <Link href="/sobre" className={styles.navLink} onClick={closeMobileMenu}>Quem Somos</Link>
          <Link href="/produtos" className={styles.navLink} onClick={closeMobileMenu}>Produtos</Link>
          <Link href="/a-fabrica" className={styles.navLink} onClick={closeMobileMenu}>A Fábrica</Link>
          <Link href="/trabalhe-conosco" className={styles.navLink} onClick={closeMobileMenu}>Trabalhe Conosco</Link>
          <Link href="/acontecendo-na-amam" className={styles.navLink} onClick={closeMobileMenu}>O que está acontecendo</Link>
          
          <div className={styles.mobileActions}>
            <Button href="/contato" as="a" variant="primary" onClick={closeMobileMenu}>
              Fale Conosco
            </Button>
          </div>
        </nav>

        <div className={styles.actions}>
          <Button href="/contato" as="a" variant={isScrolled ? "primary" : "white"}>
            Fale Conosco
          </Button>
          
          <button 
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </Container>
    </header>
  );
};
