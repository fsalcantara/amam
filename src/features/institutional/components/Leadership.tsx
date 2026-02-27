import { Container } from '@/components/atoms/Container/Container';
import styles from './Leadership.module.css';

export const Leadership = () => {
  const leaders = [
    {
      name: 'Antônio Carlos Margutti',
      role: '(In Memoriam)',
      description: '45 anos de experiência em Distribuição, com uma relação de sucesso e confiança com mais de 4.000 clientes.',
      image: 'antonio.jpg' 
    },
    {
      name: 'Márcio Delongo',
      role: 'Diretor Comercial',
      description: '20 anos de experiência em São Paulo, com atuação em contas nacionais e multinacionais e 12 anos de experiência no segmento de Distribuição.',
      image: 'marcio.jpg'
    },
    {
      name: 'Nair Margutti',
      role: 'Diretora Financeira',
      description: '25 anos de know-how em Gestão Financeira, e controladoria no segmento de Distribuição.',
      image: 'nair.jpg'
    },
    {
      name: 'Almir Margutti',
      role: 'Diretor de Produção',
      description: 'Mais de 25 anos de know-how em Panificação.',
      image: 'almir.jpg'
    }
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.titleCol}>
            <h2 className={styles.title}>
              A FORÇA <br />
              POR <br />
              TRÁS DA <br />
              AMAM
            </h2>
          </div>
          
          <div className={styles.grid}>
            {leaders.map((leader, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imageWrapper}>
                   {/* Placeholder for now */}
                   <div className={styles.placeholderImage}>{leader.name[0]}</div>
                </div>
                <h3 className={styles.name}>{leader.name}</h3>
                <span className={styles.role}>{leader.role}</span>
                <p className={styles.description}>{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
