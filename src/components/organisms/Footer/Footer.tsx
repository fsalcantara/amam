import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';
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
              Os pães AMAM, são produzidos por Delongo & Margutti Indústria e Comércio LTADA, uma empresa sediada em Vitória da Conquista - Bahia.

            </p>

            <p className={styles.brandDescription}>
              
              <br></br>
              <strong>CNPJ:</strong> 45.238.099/0001-00
            </p>

            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com/amam.alimentos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
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

          <div className={styles.column}>
            <h4>Contato</h4>
            <ul className={styles.contactList}>
              <li>
                Distrito Industrial dos Ymborés.<br />
                BR 116 Km 271, Estrada do Peri Peri<br />
                Vitória da Conquista - Bahia
              </li>
              <li className={styles.contactSpacing}>
                <strong>Fone:</strong> <a href="tel:77991550013">77 9 9155-0013</a>
              </li>
              <li>
                <a href="mailto:vendas@amamalimentos.com.br">vendas@amamalimentos.com.br</a>
              </li>
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
