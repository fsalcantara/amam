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
            <div className={styles.infoGroup}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Endereço</h3>
                <p>Distrito Indústrial dos Ymborés</p>
                <p>BR 116 Km 271, Estrada do Peri Peri</p>
                <p>Vitória da Conquista - Bahia</p>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l2.27-2.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Telefone</h3>
                <a href="tel:+5577991550013" className={styles.contactLink}>77 9 9155-0013</a>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="12" r="10" />
                   <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Horário de Funcionamento</h3>
                <div className={styles.hoursTable}>
                  {[
                    { day: 'Segunda-feira', hours: '09:00–17:00' },
                    { day: 'Terça-feira', hours: '09:00–17:00' },
                    { day: 'Quarta-feira', hours: '09:00–17:00' },
                    { day: 'Quinta-feira', hours: '09:00–17:00' },
                    { day: 'Sexta-feira', hours: '09:00–17:00' },
                    { day: 'Sábado', hours: '09:00–12:00' },
                    { day: 'Domingo', hours: 'Fechado' },
                  ].map((item) => (
                    <div key={item.day} className={styles.hoursRow}>
                      <span className={styles.day}>{item.day}</span>
                      <span className={styles.time}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>E-mail</h3>
                <a href="mailto:vendas@amamalimentos.com.br" className={styles.contactLink}>vendas@amamalimentos.com.br</a>
              </div>
            </div>

            <div className={styles.mapWrapper}>
              <div className={styles.mapTitle}>Onde Estamos</div>
              <div className={styles.mapFrame}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9291.31224464205!2d-40.82572655825291!3d-14.816827992781905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x746391abf35ed87%3A0x38e988d58a391729!2sAMAM%20ALIMENTOS!5e1!3m2!1spt-BR!2sbr!4v1772768682788!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
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
