import { Container } from '@/components/atoms/Container/Container';
import styles from './BrandEssence.module.css';

export const BrandEssence = () => {
  return (
    <section className={styles.section}>
      {/* Wave removed to merge with previous red section */}

      <Container>
        <div className={styles.grid}>
          <div className={styles.textLeft}>
            <p className={styles.lead}>
              AMAM, além de ser uma sigla, a palavra soa como o verbo &quot;amar&quot;, 
              que expressa a essência da marca:
            </p>
            <p className={styles.sub}>
              Experiência, oportunidade e propósito.
            </p>
          </div>

          <div className={styles.centerIcon}>
             {/* Heart Text Character or SVG placeholder */}
             ❤
          </div>

          <div className={styles.textRight}>
            <p className={styles.lead}>
              O coração que acompanha o nome reforça essa mensagem de <span className={styles.highlight}>afeto</span> e cuidado com o consumidor.
            </p>
          </div>
        </div>
      </Container>
      
      {/* Optional bottom wave or transition to gold section */}
    </section>
  );
};
