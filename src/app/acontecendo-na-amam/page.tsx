"use client";

import { Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { Container } from '@/components/atoms/Container/Container';
import { PostCard } from '@/features/content-hub/components/PostCard';
import { Post } from '@/features/content-hub/types/post';
import { postService } from '@/features/content-hub/services/postService';
import styles from './page.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

export default function ContentHubPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ContentHubInner />
    </Suspense>
  );
}

function ContentHubInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? 'todos';

  const { data: allPosts = [] } = useSWR<Post[]>('api/posts', () => postService.getPosts());
  const posts = category === 'todos' ? allPosts : allPosts.filter(p => p.type === category);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = [
    { label: 'Todos', value: 'todos' },
    { label: 'Blog', value: 'blog' },
    { label: 'Receitas', value: 'receita' },
    { label: 'Eventos', value: 'evento' },
    { label: 'Treinamentos', value: 'treinamento' },
  ];

  useGSAP(() => {
    // Set initial states
    gsap.set([headerRef.current, filtersRef.current, gridRef.current ? gridRef.current.children : []], { opacity: 0 });
    if (headerRef.current) gsap.set(headerRef.current, { y: -20 });
    if (filtersRef.current) gsap.set(filtersRef.current, { scale: 0.95 });
    if (gridRef.current) gsap.set(gridRef.current.children, { y: 30 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(headerRef.current,
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .to(filtersRef.current,
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.4"
    )
    .to(gridRef.current ? gridRef.current.children : [],
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1 
      },
      "-=0.2"
    );

  }, { scope: containerRef });

  return (
    <div className={styles.page} ref={containerRef}>
      
      <div className={styles.hero}>
        <Container>
          <div className={styles.header} ref={headerRef}>
            <h1>O que está acontecendo na AMAM</h1>
            <p>Notícias, eventos e conhecimento para você.</p>
          </div>

          <div className={styles.filters} ref={filtersRef}>
            {filters.map((filter) => (
              <Link 
                key={filter.value}
                href={filter.value === 'todos' ? '/acontecendo-na-amam' : `/acontecendo-na-amam?category=${filter.value}`}
                className={`${styles.filterLink} ${category === filter.value || (category === 'todos' && filter.value === 'todos') ? styles.active : ''}`}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <Container>

        {posts.length > 0 ? (
          <div className={styles.grid} ref={gridRef}>
            {posts.map((post) => (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Nenhum conteúdo encontrado nesta categoria.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
