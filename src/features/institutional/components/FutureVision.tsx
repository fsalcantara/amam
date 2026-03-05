import { Container } from '@/components/atoms/Container/Container';
import styles from './FutureVision.module.css';

export const FutureVision = () => {
  return (
    <section className={styles.section}>
      {/* Top Red Part */}
      <div className={styles.topRed}>
        <Container>
          <div className={styles.topGrid}>
             <div className={styles.titleCol}>
               <h2 className={styles.title}>
                 Visão <br /> de Futuro
               </h2>
             </div>
             
             <div className={styles.textCol}>
               <p className={styles.topText}>
                 A Delongo & Margutti tem a ambição de ir além do pão: ele é a base para um portfólio diversificado que, ainda este ano, incluirá panetones e biscoitos, cada um com marcas próprias, mas sob a identidade central AMAM.
               </p>
             </div>
          </div>
        </Container>
      </div>

      {/* Middle Breads overlapping the curve */}
      <div className={styles.middleOverlap}>
        <div className={styles.curveBg}>
           <svg viewBox="0 0 1440 120" className={styles.curveSvg} preserveAspectRatio="none">
             <path d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z" fill="#ffffff" />
           </svg>
           <div className={styles.solidWhiteBg}></div>
        </div>
        
        <Container>
          <div className={styles.imageContainer}>
            <img 
              src="/SITE/Pagina/Sobre/Visão de futuro/paes-amam.png" 
              alt="Pães Amam" 
              className={styles.image}
            />
          </div>
        </Container>
      </div>

      {/* Bottom White Part */}
      <div className={styles.bottomWhite}>
        <Container>
          <div className={styles.bottomTextContainer}>
            <p className={styles.bottomText}>
              <span className={styles.mainHighlight}>
                Nosso principal objetivo é ser líder no fornecimento de pães embalados de alta qualidade, 
                levando alegria e praticidade às famílias.
              </span>
            </p>
            <p className={styles.subText}>
              Buscamos incorporar tradição familiar, cuidado e inovação em diferentes momentos de consumo, 
              mantendo sempre a conexão com o cliente.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
};
