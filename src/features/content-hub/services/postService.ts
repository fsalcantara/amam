import { Post } from '../types/post';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch('/api/posts');
    if (!res.ok) throw new Error('Falha ao buscar posts');
    return res.json();
  },

  getPostById: async (id: string): Promise<Post | undefined> => {
    const posts = await postService.getPosts();
    return posts.find(p => p.id === id);
  },

  createPost: async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(err.error || 'Falha ao criar post');
    }
    return res.json();
  },

  updatePost: async (id: string, updates: Partial<Post>): Promise<Post | null> => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return null;
    return res.json();
  },

  deletePost: async (id: string): Promise<boolean> => {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    return res.ok;
  },
};
