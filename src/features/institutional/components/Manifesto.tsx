import { Container } from '@/components/atoms/Container/Container';
import styles from './Manifesto.module.css';
import { ContactForm } from '@/components/organisms/ContactForm/ContactForm';

export const Manifesto = () => {
  return (
    <section>
      {/* Top Banner */}
      <div className={styles.topBanner}>
        <Container>
           <h2 className={styles.bannerText}>
             Seja um parceiro <strong>AMAM</strong><br />
             <span>e garanta a sua fatia<br/>deste mercado em expansão.</span>
           </h2>
        </Container>
      </div>

      {/* Bottom Contact Section */}
      <div className={styles.bottomSection}>
        <Container>
          <div className={styles.grid}>
             {/* Left Column: Form */}
             <div className={styles.leftCol}>
               <ContactForm />
             </div>
             
             {/* Right Column: Text */}
             <div className={styles.rightCol}>
               <h2 className={styles.manifestoTitle}>
                 Nosso Pão <br />
                 <span className={styles.highlight}>Nossa História</span>
               </h2>
               <div className={styles.textContent}>
                 <p>
                   De mãos que fazem com afeto, de anos de experiência e do desejo profundo de levar para as mesas algo que representam mais do que alimentos: representa presença, aconchego e verdade.
                 </p>
                 <p>
                   Reafirmamos nosso compromisso com a qualidade, a tradição e a inovação, sempre guiados pelo propósito de tocar vidas através do simples gesto de compartilhar um pão.
                 </p>
                 <p className={styles.strongText}>
                   A partir daqui, cada fornada conta uma história, e <strong>cada história começa com AMAM.</strong>
                 </p>
               </div>
             </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
