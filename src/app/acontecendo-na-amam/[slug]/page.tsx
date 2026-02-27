import { Container } from '@/components/atoms/Container/Container';
import { Button } from '@/components/atoms/Button/Button';
import { getPostBySlug } from '@/features/content-hub/data/mock-posts';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface PostDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostDetailProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Conteúdo não encontrado',
    };
  }

  return {
    title: `${post.title} | Amam Alimentos`,
    description: post.excerpt,
  };
}

export default async function PostDetailPage({ params }: PostDetailProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'blog': return styles.blog;
      case 'evento': return styles.evento;
      case 'treinamento': return styles.treinamento;
      default: return '';
    }
  };

  return (
    <article className={styles.page}>
      <Container>
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={`${styles.badge} ${getBadgeClass(post.type)}`}>{post.type}</span>
            <time>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
            {post.author && <span>por {post.author}</span>}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.lead}>{post.excerpt}</p>
        </div>

        {(post.type === 'evento' || post.type === 'treinamento') && (
          <div className={styles.eventDetails}>
            <h3>Detalhes do {post.type === 'evento' ? 'Evento' : 'Treinamento'}</h3>
            
            {post.eventDate && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Data:</span>
                <span>{new Date(post.eventDate).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
            
            {post.location && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Local:</span>
                <span>{post.location}</span>
              </div>
            )}

            {post.targetAudience && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Público-alvo:</span>
                <span>{post.targetAudience}</span>
              </div>
            )}

             {post.format && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Formato:</span>
                <span>{post.format}</span>
              </div>
            )}

            {post.hours && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Carga Horária:</span>
                <span>{post.hours}</span>
              </div>
            )}

            {post.status && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <span style={{ textTransform: 'capitalize' }}>{post.status.replace('_', ' ')}</span>
              </div>
            )}
          </div>
        )}

        <div className={styles.content}>
          {/* Mock Content Body */}
          <p>
            Conteúdo completo do post seria renderizado aqui. Atualmente estamos usando dados mockados, 
            mas futuramente isso virá de um campo Rich Text do CMS.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div style={{ marginTop: 'var(--spacing-12)' }}>
          <Button href="/acontecendo-na-amam" as="a" variant="outline">
            Voltar para Lista
          </Button>
        </div>
      </Container>
    </article>
  );
}
