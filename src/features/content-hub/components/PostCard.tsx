import Link from 'next/link';
import { Post } from '../types/post';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'blog': return styles.blog;
      case 'receita': return styles.receita;
      case 'evento': return styles.evento;
      case 'treinamento': return styles.treinamento;
      default: return '';
    }
  };

  const getBadgeLabel = (type: string) => {
    switch (type) {
      case 'blog': return 'Blog';
      case 'receita': return 'Receitas';
      case 'evento': return 'Evento';
      case 'treinamento': return 'Treinamento';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <article className={styles.card}>
      <Link href={`/acontecendo-na-amam/${post.slug}`} className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className={styles.coverImage} 
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>{post.type.toUpperCase()}</span>
            </div>
          )}
          <div className={styles.imageOverlay}></div>
        </div>
        <div className={`${styles.badge} ${getBadgeClass(post.type)}`}>
          {getBadgeLabel(post.type)}
        </div>
      </Link>
      
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <time className={styles.date}>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
        </div>
        
        <h3 className={styles.title}>
          <Link href={`/acontecendo-na-amam/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className={styles.excerpt}>{post.excerpt}</p>
        
        {(post.type === 'evento' || post.type === 'treinamento') && (
          <div className={styles.footer}>
            <div className={styles.eventInfo}>
              {post.eventDate && (
                <div className={styles.infoItem}>
                  <span className={styles.label}>Data:</span>
                  <span className={styles.value}>{new Date(post.eventDate).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              {post.location && (
                <div className={styles.infoItem}>
                  <span className={styles.label}>Local:</span>
                  <span className={styles.value}>{post.location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {post.type === 'receita' && (
          <div className={styles.footer}>
            <div className={styles.eventInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Ingredientes:</span>
                <span className={styles.value}>{post.ingredients?.length || 0} itens</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Preparo:</span>
                <span className={styles.value}>{post.preparationSteps?.length || 0} passos</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
