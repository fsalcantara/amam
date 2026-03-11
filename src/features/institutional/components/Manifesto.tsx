import { Container } from '@/components/atoms/Container/Container';
import styles from './Manifesto.module.css';
import { ContactForm } from '@/components/organisms/ContactForm/ContactForm';

export const Manifesto = () => {
  return (
    <section className={styles.section}>



      {/* 2. NOSSO PÃO NOSSA HISTÓRIA (Unified & Centralized) */}
      <div className={styles.historySection}>
        <Container>
          <div className={styles.historyContent}>
            <h2 className={styles.manifestoTitle}>
              Nosso Pão <span className={styles.highlight}>Nossa História</span>
            </h2>
            <div className={styles.textContent}>
              <p>
                Na AMAM Alimentos, nosso pão embalado é mais que alimento; é a essência do compartilhar, do aconchego e da tradição.
              </p>
              <p>
                Cada fatia é um convite à união e à celebração de momentos simples e especiais. Mantemos viva a paixão pela panificação, aliando conhecimento técnico, cuidado artesanal e respeito às pessoas e ao planeta. Nosso propósito é enriquecer a vida das pessoas com cada pedaço de pão que entregamos.
              </p>
              <p>
                A AMAM Alimentos nasce de um legado familiar, de mãos que fazem com afeto, de anos de experiência e do desejo profundo de levar para as mesas algo que representa mais do que alimento: representa presença, aconchego e verdade.
              </p>
              <p>
                Com esses pilares, encerramos este plano de negócios reafirmando nosso compromisso com a qualidade, a tradição e a inovação — sempre guiados pelo propósito de tocar vidas através do simples gesto de compartilhar um pão. Chegou a fatia que faltava.
              </p>
              <p className={styles.strongText}>
                A partir daqui, cada fornada conta uma história. <br />
                E cada história começa com <strong>AMAM.</strong>
              </p>
            </div>
          </div>
        </Container>
      </div>



      {/* 3. CONTACT FORM SECTION (With pao_2.png background) */}
      <div className={styles.contactFormSection}>
        <div className={styles.formContainer}>
          <Container>
            <div className={styles.formGrid}>
               <div className={styles.formText}>
                 <h2 className={styles.bannerText}>
                   Seja um parceiro <strong>AMAM</strong><br />
                   <span>e garanta a sua fatia<br/>deste mercado em expansão.</span>
                 </h2>
               </div>
               <div className={styles.formWrapper}>
                 <ContactForm variant="dark" />
               </div>
            </div>
          </Container>
        </div>
      </div>

    </section>
  );
};
