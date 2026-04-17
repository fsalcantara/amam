import { Container } from '@/components/atoms/Container/Container';
import { Button } from '@/components/atoms/Button/Button';
import db from '@/lib/db';
import { CONTENT_TYPES } from '@/features/content-hub/types/post';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface PostDetailProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const row = await db.get('SELECT * FROM posts WHERE slug = ?', [slug]);
  if (!row) return null;
  return {
    ...row,
    isFeatured: Boolean(row.is_featured),
    coverImage: row.cover_image,
    videoUrl: row.video_url,
    eventDate: row.event_date,
    targetAudience: row.target_audience,
    gallery: row.gallery ? JSON.parse(row.gallery) : [],
    ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
    preparationSteps: row.preparation_steps ? JSON.parse(row.preparation_steps) : [],
    createdAt: row.created_at,
  };
}

export async function generateMetadata({ params }: PostDetailProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Conteúdo não encontrado' };
  }

  return {
    title: `${post.title} | Amam Alimentos`,
    description: post.excerpt,
  };
}

export default async function PostDetailPage({ params }: PostDetailProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

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
    const typeObj = CONTENT_TYPES.find((t: any) => t.id === type);
    return typeObj ? typeObj.label : type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <article className={styles.page}>
      
      {/* Hero Cover Image */}
      {post.coverImage && (
        <div className={styles.heroCover}>
          <div className={styles.heroImageWrapper}>
            <img src={post.coverImage} alt={post.title} className={styles.heroImage} />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent}>
            <Container>
              <div className={styles.metaHero}>
                <span className={`${styles.badge} ${getBadgeClass(post.type)}`}>{getBadgeLabel(post.type)}</span>
                <time className={styles.heroTime}>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
                {post.author && <span className={styles.heroAuthor}>por {post.author}</span>}
              </div>
              <h1 className={styles.heroTitle}>{post.title}</h1>
              <p className={styles.heroLead}>{post.excerpt}</p>
            </Container>
          </div>
        </div>
      )}

      <Container>
        {/* Header if NO Cover Image */}
        {!post.coverImage && (
          <div className={styles.header}>
            <div className={styles.meta}>
              <span className={`${styles.badge} ${getBadgeClass(post.type)}`}>{getBadgeLabel(post.type)}</span>
              <time>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
              {post.author && <span>por {post.author}</span>}
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.lead}>{post.excerpt}</p>
          </div>
        )}

        <div className={styles.contentLayout}>
            {/* Main Content Area */}
            <div className={styles.mainColumn}>
                
                {post.videoUrl && (
                  <div className={styles.videoEmbed}>
                    {post.videoUrl.includes('youtube') || post.videoUrl.includes('vimeo') ? (
                      <iframe 
                        src={post.videoUrl} 
                        title="Video Player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      />
                    ) : (
                      <video 
                        src={post.videoUrl} 
                        controls 
                        className={styles.uploadedVideo}
                        preload="metadata"
                      />
                    )}
                  </div>
                )}

                {post.content && (
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}

                {/* Photo Gallery Grid */}
                {post.gallery && post.gallery.length > 0 && (
                  <div className={styles.gallerySection}>
                    <h3>Galeria de Fotos</h3>
                    <div className={styles.galleryGrid}>
                       {post.gallery.map((img: string, idx: number) => (
                          <div key={idx} className={styles.galleryItem}>
                            <img src={img} alt={`Galeria imagem ${idx + 1}`} loading="lazy" />
                          </div>
                       ))}
                    </div>
                  </div>
                )}

                {/* Recipe Section */}
                {post.type === 'receita' && (
                  <div className={styles.recipeContainer}>
                    {post.ingredients && (
                      <div className={styles.ingredientsSection}>
                        <div className={styles.sectionHeaderIcon}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                          <h3>Ingredientes</h3>
                        </div>
                        <ul className={styles.ingredientsList}>
                          {post.ingredients.map((item, idx) => (
                            <li key={idx}>
                              <span className={styles.bullet}></span>
                              <span className={styles.ingredientMeasure}>{item.measure}</span>
                              <span className={styles.ingredientName}>{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {post.preparationSteps && (
                      <div className={styles.preparationSection}>
                        <div className={styles.sectionHeaderIcon}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          <h3>Modo de Preparo</h3>
                        </div>
                        <div className={styles.stepsList}>
                          {post.preparationSteps.map((step, idx) => (
                            <div key={idx} className={styles.stepItem}>
                              <div className={styles.stepNumber}>{String(idx + 1).padStart(2, '0')}</div>
                              <div className={styles.stepText}>{step}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
            
            {/* Sidebar for Event Metadata */}
            {(post.type === 'evento' || post.type === 'treinamento') && (
              <div className={styles.sidebarColumn}>
                <div className={styles.eventDetails}>
                  <h3>Informações do {post.type === 'evento' ? 'Evento' : 'Treinamento'}</h3>
                  
                  {post.eventDate && (
                    <div className={styles.detailCard}>
                      <div className={styles.iconCircle}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                      <div>
                        <strong>Data</strong>
                        <p>{new Date(post.eventDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  )}
                  
                  {post.location && (
                    <div className={styles.detailCard}>
                      <div className={styles.iconCircle}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      </div>
                      <div>
                        <strong>Local</strong>
                        <p>{post.location}</p>
                      </div>
                    </div>
                  )}

                  {post.targetAudience && (
                     <div className={styles.detailCard}>
                      <div className={styles.iconCircle}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                      <div>
                        <strong>Público</strong>
                        <p>{post.targetAudience}</p>
                      </div>
                    </div>
                  )}

                  {post.format && (
                     <div className={styles.detailCard}>
                      <div className={styles.iconCircle}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                      </div>
                      <div>
                        <strong>Formato</strong>
                        <p style={{ textTransform: 'capitalize' }}>{post.format}</p>
                      </div>
                    </div>
                  )}

                  {post.hours && (
                    <div className={styles.detailCard}>
                      <div className={styles.iconCircle}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      </div>
                      <div>
                        <strong>Carga Horária</strong>
                        <p>{post.hours}</p>
                      </div>
                    </div>
                  )}

                  {post.status && (
                    <div className={styles.detailCard}>
                      <div className={`${styles.iconCircle} ${post.status === 'finalizado' ? styles.statusClosed : styles.statusOpen}`}>
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      </div>
                      <div>
                        <strong>Situação</strong>
                        <p style={{ textTransform: 'capitalize' }}>{post.status.replace('_', ' ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>

        <div className={styles.footerNav}>
          <Button href="/acontecendo-na-amam" as="a" variant="outline">
            ← Voltar para Todos os Conteúdos
          </Button>
        </div>
      </Container>
    </article>
  );
}
