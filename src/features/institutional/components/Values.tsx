import { Container } from '@/components/atoms/Container/Container';
import styles from './Values.module.css';

export const Values = () => {
  const values = [
    { title: 'Confiança', icon: '/SITE/Pagina/Sobre/Valores/INTEGRIDADE.png', text: 'Honestidade, transparência e respeito em todas as relações corporativas e humanas.' },
    { title: 'Responsabilidade Social', icon: '/SITE/Pagina/Sobre/Valores/satisfacao-cliente.png', text: 'Trabalho com amor, empatia, honestidade, e responsabilidade com o próximo.' },
    { title: 'Inovação', icon: '/SITE/Pagina/Sobre/Valores/inovacao.png', text: 'Inovar nas operações da empresa buscando soluções eficientes e sustentáveis.' },
    { title: 'Sustentabilidade', icon: '/SITE/Pagina/Sobre/Valores/sustentabilidade.png', text: 'Respeito e preservação ambiental para deixarmos um mundo melhor a todos.' },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Nossos Valores</h2>
        <div className={styles.grid}>
          {values.map((val, idx) => (
             <div key={idx} className={styles.card}>
               <div className={styles.iconWrapper}>
                 <img src={val.icon} alt={val.title} className={styles.iconImage} />
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
