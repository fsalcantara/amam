import Link from 'next/link';
import { Container } from '../../atoms/Container/Container';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink}>
              <img 
                src="/SITE/ELEMENTOS E ICONES/DELONGO LOGO.png" 
                alt="Amam Alimentos" 
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.brandDescription}>
              Tradição e qualidade em alimentos.
            </p>
          </div>
          
          <div className={styles.column}>
            <h4>Empresa</h4>
            <ul>
              <li><Link href="/sobre">Sobre nós</Link></li>
              <li><Link href="/produtos">Produtos</Link></li>
              <li><Link href="/contato">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Conteúdo</h4>
            <ul>
              <li><Link href="/acontecendo-na-amam">Blog</Link></li>
              <li><Link href="/acontecendo-na-amam">Eventos</Link></li>
              <li><Link href="/acontecendo-na-amam">Treinamentos</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacidade">Política de Privacidade</Link></li>
              <li><Link href="/termos">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Amam Alimentos. Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  );
};
