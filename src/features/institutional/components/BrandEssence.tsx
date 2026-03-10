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
              Nossa principal missão é <span className={styles.emphasis}>fabricar alimentos deliciosos</span>, elaborados de forma qualificada. Tudo isso com foco em ser parte da vida de famílias, lares e laços.
            </p>
            <p className={styles.paragraph} style={{ marginTop: 'var(--spacing-10)' }}>
              Aquilo que é feito de coração só pode alimentar o coração, trazendo conforto e muita paz para o dia a dia.
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
              A receita que enche a sua vida e a de muita gente de <span className={styles.emphasis}>afeto, carinho e cuidado</span> de quem cozinha com o coração.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
