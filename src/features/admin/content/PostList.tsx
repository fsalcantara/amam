"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { Post, CONTENT_TYPES } from '@/features/content-hub/types/post';
import { postService } from '@/features/content-hub/services/postService';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminSelect } from '@/features/admin/components/ui/AdminInput';
import styles from './PostList.module.css';
import { useDebounce } from '@/hooks/useDebounce';

const PostForm = dynamic(() => import('./PostForm').then(mod => mod.PostForm), {
  loading: () => <div className={styles.loading}>Carregando editor...</div>
});

export default function PostList() {
  const { data: posts, error, mutate: mutatePosts } = useSWR<Post[]>('api/posts', () => postService.getPosts());
  const loading = !posts && !error;

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [typeFilter, setTypeFilter] = useState('');

  const filteredPosts = (posts || []).filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesType = typeFilter ? post.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  const getTypeLabel = (typeId: string) => {
    return CONTENT_TYPES.find(t => t.id === typeId)?.label || typeId;
  };

  const handleCreate = () => {
    setCurrentPost(null);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este conteúdo?')) {
      await postService.deletePost(id);
      mutatePosts();
    }
  };

  const handleSave = async (data: Partial<Post>) => {
    if (currentPost) {
      await postService.updatePost(currentPost.id, data);
    } else {
      await postService.createPost(data as any);
    }
    setIsEditing(false);
    mutatePosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isEditing) {
    return (
      <PostForm 
        initialData={currentPost} 
        onSubmit={handleSave} 
        onCancel={() => {
          setIsEditing(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  if (loading) return <div className={styles.loading}>Carregando conteúdos...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Gerenciar Conteúdo</h1>
          <p className={styles.subtitle}>Gerencie blog, eventos e treinamentos.</p>
        </div>
        <AdminButton onClick={handleCreate}>+ Novo Post</AdminButton>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Buscar por título..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.filterBox}>
          <AdminSelect 
            value={typeFilter} 
            onChange={(value: string) => setTypeFilter(value)}
            options={[
              { label: 'Todos os Tipos', value: '' },
              ...CONTENT_TYPES.map(type => ({ label: type.label, value: type.id }))
            ]}
            placeholder="Filtrar por Tipo"
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className={styles.cardList}>
        {filteredPosts.length === 0 ? (
          <p className={styles.emptyState}>Nenhum conteúdo encontrado.</p>
        ) : filteredPosts.map((post) => (
          <div key={post.id} className={styles.card}>
            <span className={styles.cardTitle}>{post.title}</span>
            <div className={styles.cardMeta}>
              <span className={styles.typeTag}>{getTypeLabel(post.type)}</span>
              <span className={styles.cardDate}>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className={styles.cardActions}>
              <AdminButton variant="secondary" className={styles.smBtn} onClick={() => handleEdit(post)}>Editar</AdminButton>
              <AdminButton variant="danger" className={styles.smBtn} onClick={() => handleDelete(post.id)}>Excluir</AdminButton>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td style={{ fontWeight: 600 }}>{post.title}</td>
                  <td><span className={styles.typeTag}>{getTypeLabel(post.type)}</span></td>
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                  <td className={styles.actions}>
                    <AdminButton variant="secondary" className={styles.smBtn} onClick={() => handleEdit(post)}>
                      Editar
                    </AdminButton>
                    <AdminButton variant="danger" className={styles.smBtn} onClick={() => handleDelete(post.id)}>
                      Excluir
                    </AdminButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  Nenhum conteúdo encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
