"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container/Container';
import { PostCard } from '@/features/content-hub/components/PostCard';
import { Post } from '@/features/content-hub/types/post';
import styles from './page.module.css';

const FILTERS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Blog', value: 'blog' },
  { label: 'Receitas', value: 'receita' },
  { label: 'Eventos', value: 'evento' },
  { label: 'Treinamentos', value: 'treinamento' },
];

export function ContentHubClient({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState('todos');
  const filtered = category === 'todos' ? posts : posts.filter(p => p.type === category);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Container>
          <div className={styles.header}>
            <h1>O que está acontecendo na AMAM</h1>
            <p>Notícias, eventos e conhecimento para você.</p>
          </div>
          <div className={styles.filters}>
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setCategory(filter.value)}
                className={`${styles.filterLink} ${category === filter.value ? styles.active : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container>
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((post) => (
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
