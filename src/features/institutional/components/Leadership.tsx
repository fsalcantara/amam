import { Container } from '@/components/atoms/Container/Container';
import styles from './Leadership.module.css';

export const Leadership = () => {
  const leaders = [
    {
      name: 'Antônio Carlos Margutti',
      role: '(Em memória)',
      description: '45 anos de experiência em Distribuição, com uma relação de sucesso e confiança com mais de 4.000 clientes.',
      image: '/SITE/Pagina/Sobre/A forca por tras da amam/ANTONIO.png' 
    },
    {
      name: 'Nair Margutti',
      role: 'Diretora Financeira',
      description: '25 anos de know-how em Gestão Financeira e controladoria no segmento de Distribuição.',
      image: '/SITE/Pagina/Sobre/A forca por tras da amam/NAIR.png'
    },
    {
      name: 'Márcio Delongo',
      role: 'Diretor Comercial',
      description: '20 anos de experiência em São Paulo, com atuação em contas nacionais e multinacionais e 12 anos de experiência no segmento de Distribuição.',
      image: '/SITE/Pagina/Sobre/A forca por tras da amam/MARCIO.png'
    },
    {
      name: 'Almir Margutti',
      role: 'Diretor de Produção',
      description: 'Mestre Padeiro com mais de 25 anos de know-how em Panificação.',
      image: '/SITE/Pagina/Sobre/A forca por tras da amam/ALMIR.png'
    }
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.titleCol}>
            <h2 className={styles.title}>
              A FORÇA <br />
              POR TRÁS <br />
              DA AMAM
            </h2>
          </div>
          
          <div className={styles.grid}>
            {leaders.map((leader, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imageWrapper}>
                   <img src={leader.image} alt={leader.name} className={styles.leaderImage} />
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
