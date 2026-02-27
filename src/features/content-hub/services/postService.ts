import { Post } from '../types/post';
import { POSTS as INITIAL_POSTS } from '../data/mock-posts';

// Initialize with data from mock-posts.ts
let MOCKED_POSTS: Post[] = [...INITIAL_POSTS].map(p => ({
  ...p,
  createdAt: new Date().toISOString()
}));

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...MOCKED_POSTS];
  },

  getPostById: async (id: string): Promise<Post | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCKED_POSTS.find(p => p.id === id);
  },

  createPost: async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    MOCKED_POSTS.push(newPost);
    return newPost;
  },

  updatePost: async (id: string, updates: Partial<Post>): Promise<Post | null> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = MOCKED_POSTS.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    MOCKED_POSTS[index] = { ...MOCKED_POSTS[index], ...updates };
    return MOCKED_POSTS[index];
  },

  deletePost: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    MOCKED_POSTS = MOCKED_POSTS.filter(p => p.id !== id);
    return true;
  }
};
