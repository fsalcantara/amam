"use client";

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the preloader after a short delay to allow animations to play
    // and content to render on the first load.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={styles.preloader}>
      <div className={styles.logoContainer}>
        <img 
          src="/SITE/LOGO/logo-white.png" 
          alt="Amam Alimentos" 
          className={styles.logo}
        />
      </div>
    </div>
  );
};
