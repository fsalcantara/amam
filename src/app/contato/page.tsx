import { Container } from '@/components/atoms/Container/Container';
import { ContactForm } from '@/components/organisms/ContactForm/ContactForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Fale Conosco | Amam Alimentos',
  description: 'Entre em contato com a Amam Alimentos.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.header}>
          <h1>Fale Conosco</h1>
          <p>Estamos prontos para atender você. Envie sua mensagem ou visite-nos.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <h2>Canais de Atendimento</h2>
            
            <div className={styles.infoGroup}>
              <h3>📍 Endereço</h3>
              <p>Rua Exemplo da Indústria, 123</p>
              <p>Distrito Industrial - Cidade/UF</p>
              <p>CEP: 00000-000</p>
            </div>

            <div className={styles.infoGroup}>
              <h3>📞 Telefone</h3>
              <p>(00) 1234-5678</p>
              <p>Segunda a Sexta, das 08h às 18h</p>
            </div>

            <div className={styles.infoGroup}>
              <h3>✉️ E-mail</h3>
              <p>contato@amam.com.br</p>
              <p>vendas@amam.com.br</p>
            </div>

            <div className={styles.map}>
              Map Placeholder
            </div>
          </div>

          <div className={styles.formSection}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
