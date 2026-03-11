import { Container } from '@/components/atoms/Container/Container';
import styles from './Values.module.css';

export const Values = () => {
  const values = [
    { 
      title: 'Qualidade', 
      icon: '/SITE/Empresa/Valores/icone-qualidade.png', 
      text: 'Manter padrões elevados em todas as etapas, da seleção de ingredientes à entrega.' 
    },
    { 
      title: 'Sustentabilidade', 
      icon: '/SITE/Empresa/Valores/icone-sustentabilidade.png', 
      text: 'Reduzir o impacto ambiental com práticas responsáveis.' 
    },
    { 
      title: 'Inovação', 
      icon: '/SITE/Empresa/Valores/icone-inovacao.png', 
      text: 'Criar e aprimorar produtos para atender as novas demandas' 
    },
    { 
      title: 'Integridade', 
      icon: '/SITE/Empresa/Valores/icone-integridade.png', 
      text: 'Atuar com ética, honestidade e transparência.' 
    },
    { 
      title: 'Satisfação do Cliente', 
      icon: '/SITE/Empresa/Valores/icone-satisfacao.png', 
      text: 'Superar expectativas em cada experiência.' 
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Nossos Valores</h2>
        <div className={styles.grid}>
          {values.map((val, idx) => (
             <div key={idx} className={styles.card}>
               <div className={styles.iconWrapper}>
                 <img src={val.icon} alt={`Ícone ${val.title}`} className={styles.iconImage} />
               </div>
               <h3 className={styles.cardTitle}>{val.title}</h3>
               <p className={styles.text}>{val.text}</p>
             </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
