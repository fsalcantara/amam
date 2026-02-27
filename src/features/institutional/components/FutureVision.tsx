import { Container } from '@/components/atoms/Container/Container';

export const FutureVision = () => {
  return (
    <section style={{ backgroundColor: '#ffffff', color: 'var(--color-text-main)', padding: 'var(--section-padding-lg) 0', textAlign: 'center' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-12)', alignItems: 'center', textAlign: 'left' }}>
           <div>
             <h2 style={{ fontSize: '3rem', lineHeight: '1', color: 'var(--color-primary)' }}>
               Visão <br /> de Futuro
             </h2>
           </div>
           
           <div>
             <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: '1.6' }}>
               A Delongo & Margutti tem a ambição de ir além do pão, ele é a base para um portfólio diversificado que, ainda este ano, incluirá panetones e biscoitos, cada um com marcas próprias, mas sob a identidade central AMAM.
             </p>
           </div>
        </div>

        <div style={{ margin: 'var(--spacing-12) 0' }}>
          {/* Product Lineup Image Placeholder */}
          <div style={{ height: '300px', backgroundColor: '#f5f5f5', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
             Imagem da Linha de Produtos (Pães Variados)
          </div>
        </div>

        <p style={{ maxWidth: '900px', margin: '0 auto', fontSize: 'var(--font-size-lg)', lineHeight: '1.6' }}>
          Nosso principal objetivo é ser líder no fornecimento de pães embalados de alta qualidade, levando alegria e praticidade às famílias, buscamos incorporar tradição familiar, cuidado e inovação em diferentes momentos de consumo, mantendo sempre a conexão com o cliente.
        </p>

      </Container>
    </section>
  );
};
