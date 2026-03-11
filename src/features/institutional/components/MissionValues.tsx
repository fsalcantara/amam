import { Container } from '@/components/atoms/Container/Container';
import styles from './MissionValues.module.css';


export const MissionValues = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className={styles.title}>Missão</h3>
            <p className={styles.text}>
              Oferecer um produto com sabor de casa e conhecimento técnico de alto nível, unindo a força da tradição familiar à experiência industrial.
            </p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.title}>Visão</h3>
            <p className={styles.text}>
              Ser a marca líder no fornecimento de pães embalados de alta qualidade, 
              levando alegria e praticidade às famílias.
            </p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3H18L22 9L12 22L2 9L6 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 3L8 9L12 22L16 9L13 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 9H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.title}>Valores</h3>
            <div className={styles.valuesList}>
              <div className={styles.valueItem}>
                <strong>Qualidade</strong> — Manter padrões elevados em todas as etapas, da seleção de ingredientes à entrega.
              </div>
              <div className={styles.valueItem}>
                <strong>Sustentabilidade</strong> — Reduzir o impacto ambiental com práticas responsáveis.
              </div>
              <div className={styles.valueItem}>
                <strong>Inovação</strong> — Criar e aprimorar produtos para atender a novas demandas.
              </div>
              <div className={styles.valueItem}>
                <strong>Integridade</strong> — Atuar com ética, honestidade e transparência.
              </div>
              <div className={styles.valueItem}>
                <strong>Satisfação do Cliente</strong> — Superar expectativas em cada experiência.
              </div>
            </div>
          </div>
        </div>


      </Container>
    </section>
  );
};
