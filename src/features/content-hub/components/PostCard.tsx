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
      case 'evento': return styles.evento;
      case 'treinamento': return styles.treinamento;
      default: return '';
    }
  };

  return (
    <article className={styles.card}>
      <Link href={`/acontecendo-na-amam/${post.slug}`} className={styles.image}>
        {/* Placeholder */}
        Imagem
      </Link>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`${styles.badge} ${getBadgeClass(post.type)}`}>
            {post.type}
          </span>
          <time className={styles.date}>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
        </div>
        
        <h3 className={styles.title}>
          <Link href={`/acontecendo-na-amam/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className={styles.excerpt}>{post.excerpt}</p>
        
        {(post.type === 'evento' || post.type === 'treinamento') && (
          <div className={styles.details}>
            {post.eventDate && <div>Data do Evento: {new Date(post.eventDate).toLocaleDateString('pt-BR')}</div>}
            {post.location && <div>Local: {post.location}</div>}
            {post.format && <div>Formato: {post.format}</div>}
          </div>
        )}
      </div>
    </article>
  );
};
