import { Container } from '@/components/atoms/Container/Container';
import styles from './BrandEssence.module.css';

export const BrandEssence = () => {
  return (
    <section className={styles.section}>
      <Container>
        {/* Top Part: Mission */}
        <div className={styles.grid}>
          <div className={styles.textLeft}>
            <p className={styles.paragraph}>
              O nome <span className={styles.emphasis}>AMAM</span> carrega a força da união e traduz experiência, oportunidade e propósito. Mais do que uma sigla, ele soa como um verbo de ação e afeto.
            </p>
            <p className={styles.paragraph} style={{ marginTop: 'var(--spacing-10)' }}>
              Para famílias que buscam confiança e sabor no dia a dia, a AMAM oferece pães de qualidade superior, feitos com afeto e conhecimento.
            </p>
          </div>

          <div className={styles.centerIconWrapper}>
            <div className={styles.heartContainer}>
              <img 
                src="/SITE/Pagina/Sobre/coracao.png" 
                alt="Coração AMAM" 
                className={styles.heartImage}
              />
              <div className={styles.heartGlow}></div>
            </div>
          </div>

          <div className={styles.textRight}>
            <p className={styles.paragraph}>
              Nossa força está na tradição familiar unida à experiência industrial, entregando um pão macio, gostoso e feito para estar presente em cada momento.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
