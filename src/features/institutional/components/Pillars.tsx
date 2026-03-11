import { Container } from '@/components/atoms/Container/Container';
import styles from './Pillars.module.css';

export const Pillars = () => {
  const leftPillars = [
    { title: 'Sabor como assinatura', text: 'Proporcionar experiências marcantes que despertam memórias e afeto.' },
    { title: 'Qualidade consistente', text: 'Excelência em cada etapa, desde os ingredientes até o produto final.' },
    { title: 'Tradição que inspira', text: 'Honrar nossa história familiar e a arte da panificação.' }
  ];

  const rightPillars = [
    { title: 'Inovação com propósito', text: 'Evoluir sem perder a essência.' },
    { title: 'Sustentabilidade responsável', text: 'Respeitar e proteger o planeta.' },
    { title: 'Acesso com sofisticação', text: 'Tornar produtos de qualidade acessíveis a todos.' }
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
