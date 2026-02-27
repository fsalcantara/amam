import { Container } from '@/components/atoms/Container/Container';
import styles from './Manifesto.module.css';

export const Manifesto = () => {
  return (
    <section>
      {/* Top Banner */}
      <div className={styles.topBanner}>
        <Container>
           <h2 className={styles.bannerText}>
             Seja um <br />
             parceiro AMAM <br />
             <span>e garanta a sua fatia deste mercado em expansão.</span>
           </h2>
        </Container>
      </div>

      {/* Bottom Text Section */}
      <div className={styles.bottomSection}>
        <Container>
          <div className={styles.grid}>
             <div className={styles.leftCol}>
               <h2 className={styles.manifestoTitle}>
                 Nosso Pão <br />
                 <span className={styles.highlight}>Nossa História</span>
               </h2>
             </div>
             
             <div className={styles.rightCol}>
               <p>
                 De mãos que fazem com afeto, de anos de experiência e do desejo profundo de levar para as mesas algo que representam mais do que alimentos: representa presença, aconchego e verdade.
               </p>
               <p>
                 Reafirmamos nosso compromisso com a qualidade, a tradição e a inovação, sempre guiados pelo propósito de tocar vidas através do simples gesto de compartilhar um pão.
               </p>
               <p className={styles.strong}>
                 A partir daqui, cada fornada conta uma história, e <strong>cada história começa com AMAM.</strong>
               </p>
             </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
