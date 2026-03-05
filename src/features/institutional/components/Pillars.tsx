import { Container } from '@/components/atoms/Container/Container';
import styles from './Pillars.module.css';

export const Pillars = () => {
  const leftPillars = [
    { title: 'Sabor como assinatura', text: 'Amamos criar laços e memórias através do sabor.' },
    { title: 'Qualidade de ingredientes', text: 'Excelência em cada etapa, desde os ingredientes até produto final.' },
    { title: 'Tradição que inspira', text: 'Honrar nossa história familiar e a arte de panificação.' }
  ];

  const rightPillars = [
    { title: 'Inovação com propósito', text: 'Evoluir com responsabilidade e sem perder a essência.' },
    { title: 'Sustentabilidade responsável', text: 'Respeitar e proteger nosso planeta.' },
    { title: 'Preço justo para o dia a dia', text: 'Levar à mesa das famílias um produto de qualidade, com valor acessível.' }
  ];

  const bottomPillar = { 
    title: 'Cuidado com as pessoas', 
    text: 'Construir relações genuínas com clientes, colaboradores e parceiros.' 
  };

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Nossos Pilares</h2>

        <div className={styles.layout}>
          {/* Left Side */}
          <div className={styles.side + ' ' + styles.leftSide}>
            {leftPillars.map((pillar, index) => (
              <div key={index}>
                <h3 className={styles.itemTitle}>{pillar.title}</h3>
                <p className={styles.itemText}>{pillar.text}</p>
              </div>
            ))}
          </div>
          
          {/* Central Image */}
          <div className={styles.centerImageWrapper}>
            <img 
              src="/SITE/Pagina/Sobre/Nossos Pilares/imagem-nossos-pilares.png" 
              alt="Planta de Trigo Amam" 
              className={styles.centerImage}
            />
          </div>
          
          {/* Right Side */}
          <div className={styles.side + ' ' + styles.rightSide}>
            {rightPillars.map((pillar, index) => (
              <div key={index}>
                <h3 className={styles.itemTitle}>{pillar.title}</h3>
                <p className={styles.itemText}>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pillar */}
        <div className={styles.bottomItem}>
          <h3 className={styles.itemTitle}>{bottomPillar.title}</h3>
          <p className={styles.itemText}>{bottomPillar.text}</p>
        </div>
        
      </Container>
    </section>
  );
};
