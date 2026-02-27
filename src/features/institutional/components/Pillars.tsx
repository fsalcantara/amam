import { Container } from '@/components/atoms/Container/Container';
import styles from './Pillars.module.css';

export const Pillars = () => {
  const pillars = [
    { title: 'Sabor como assinatura', text: 'Proporcionar experiências marcantes que despertam memória e afeto.' },
    { title: 'Inovação com propósito', text: 'Evoluir sem perder a essência.' },
    { title: 'Qualidade consistente', text: 'Excelência em cada etapa, desde os ingredientes até produto final.' },
    { title: 'Sustentabilidade responsável', text: 'Respeitar e proteger o planeta.' },
    { title: 'Tradição que inspira', text: 'Honrar nossa história familiar e a arte de panificação.' },
    { title: 'Preço justo para o dia a dia', text: 'Levar à mesa das famílias um produto de qualidade, com valor acessível e justo.' },
    { title: 'Cuidado com as pessoas', text: 'Construir relações genuínas com clientes, colaboradores e parceiros.', isBottom: true },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Nossos Pilares</h2>
        <p className={styles.subtitle}>No que acreditamos</p>

        <div className={styles.layout}>
          {/* Central Icon */}
          <div className={styles.centerIcon}>
            🌾
          </div>
          
          {/* Manually placing items for the circular/scattered effect shown in image
              Grid or specific positioning can work. Using a grid with 2 columns around center.
          */}
          <div className={styles.grid}>
             {pillars.map((pillar, index) => (
               <div key={index} className={`${styles.item} ${pillar.isBottom ? styles.bottomItem : ''}`}>
                 <h3 className={styles.itemTitle}>{pillar.title}</h3>
                 <p className={styles.itemText}>{pillar.text}</p>
               </div>
             ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
