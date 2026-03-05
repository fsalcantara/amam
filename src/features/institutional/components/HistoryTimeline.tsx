import { Container } from '@/components/atoms/Container/Container';
import styles from './HistoryTimeline.module.css';
import Image from 'next/image';

export const HistoryTimeline = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {/* Left Column: Text */}
          <div>
            <h2 className={styles.title}>
              Nossa História
            </h2>
            <div className={styles.text}>
              <p>
                A Amam Alimentos iniciou suas atividades no ano de 2011 na cidade de Sorocaba – SP, com o propósito de fabricar e distribuir produtos de alta qualidade, agregando segurança alimentar a seus consumidores.
              </p>
              <p>
                Trabalhando sempre com a mais alta tecnologia no processo e os melhores ingredientes do mercado, e claro, muito amor e dedicação na fabricação de cada produto.
              </p>
            </div>
          </div>

          {/* Right Column: Logo Breakdown */}
          <div className={styles.rightColumn}>
            <img 
              src="/SITE/LOGO/logo-color.png" 
              alt="AMAM Alimentos" 
              className={styles.logo}
            />

            <h3 className={styles.subtitle}>
              O nosso nome é a união da
              <br/>
              inicial dos fundadores
            </h3>

            <div className={styles.names}>
              <div><span>A</span>ntônio</div>
              <div><span>M</span>árcio</div>
              <div><span>A</span>lmir</div>
            </div>

            <p className={styles.description}>
              Representam a força<br/>dessa parceria.
            </p>
             
            <img 
              src="/SITE/Pagina/Sobre/Nossos Pilares/imagem-nossos-pilares.png" 
              alt="Planta (Trigo)" 
              className={styles.wheatIcon} 
              style={{ objectFit: 'contain', width: '80px' }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
