import { Container } from '@/components/atoms/Container/Container';
// Inline styles for simplicity or separate module if preferred
// Using inline for quick iteration on this specific section

export const HistoryTimeline = () => {
  return (
    <section style={{ padding: 'var(--section-padding-lg) 0', backgroundColor: '#fff' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-16)', alignItems: 'center' }}>
          
          {/* Left Column: Text */}
          <div>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-8)' }}>
              Nossa História
            </h2>
            <div style={{ color: 'var(--color-text-main)', lineHeight: '1.8', fontSize: 'var(--font-size-lg)' }}>
              <p style={{ marginBottom: 'var(--spacing-6)' }}>
                A A<strong>MAM</strong> nasce do sonho de <strong>Antônio Carlos Margutti</strong> em criar uma marca própria que trouxesse tranquilidade e segurança para a família seguir os negócios. Ter uma marca própria significava autonomia para desenvolver, crescer e trabalhar no próprio ritmo.
              </p>
              <p>
                O pão foi a escolha natural: uniu a experiência da família com décadas na produção às receitas caseiras e afetivas da sua mãe. Assim nasceu a essência, um produto com sabor de casa e conhecimento técnico de alto nível.
              </p>
            </div>
          </div>

          {/* Right Column: Logo Breakdown */}
          <div style={{ textAlign: 'center' }}>
             {/* Logo Placeholder - Text for now */}
             <div style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: 'var(--spacing-8)', color: '#222'}}>
                amam 
                <span style={{ color: 'var(--color-primary)', fontSize: '5rem', verticalAlign: 'middle', marginLeft: '10px' }}>❤</span>
             </div>

             <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-4)' }}>
               O nosso nome é a união das iniciais dos fundadores
             </h3>

             <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: '#222' }}>
               <span style={{ color: 'var(--color-primary)' }}>A</span>ntônio &nbsp;
               <span style={{ color: 'var(--color-primary)' }}>M</span>árcio &nbsp;
               <span style={{ color: 'var(--color-primary)' }}>A</span>lmir
             </div>

             <p style={{ marginTop: 'var(--spacing-6)', fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>
               Representam a força dessa parceria.
             </p>
             
             {/* Wheat Icon Placeholder */}
             <div style={{ marginTop: 'var(--spacing-8)', fontSize: '3rem', color: 'var(--color-secondary)' }}>
                🌾
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
