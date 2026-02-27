import { Post } from '../types/post';

export const POSTS: Post[] = [
  {
    id: '1',
    title: 'Dicas para um café da manhã nutritivo',
    slug: 'dicas-cafe-nutritivo',
    type: 'blog',
    excerpt: 'Descubra como os produtos Amam podem transformar a primeira refeição do dia.',
    date: '2023-10-15',
    author: 'Nutricionista Amam',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'A história do Pão Francês no Brasil',
    slug: 'historia-pao-frances',
    type: 'blog',
    excerpt: 'Curiosidades sobre o pão mais amado do país e como a Amam preserva essa tradição.',
    date: '2023-09-20',
    author: 'Equipe de Conteúdo',
  },
  {
    id: '3',
    title: 'Feira de Panificação 2025',
    slug: 'feira-panificacao-2025',
    type: 'evento',
    excerpt: 'Visite nosso estande na maior feira do setor e conheça nossos lançamentos.',
    date: '2023-11-01',
    eventDate: '2025-11-20',
    location: 'Expo Center Norte - SP',
    status: 'futuro',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Workshop de Técnicas de Vendas',
    slug: 'workshop-vendas',
    type: 'treinamento',
    excerpt: 'Treinamento exclusivo para representantes comerciais da região.',
    date: '2023-10-01',
    targetAudience: 'Representantes Comerciais',
    format: 'online',
    hours: '4h',
  },
  {
    id: '5',
    title: 'Lançamento Linha Integral',
    slug: 'lancamento-linha-integral',
    type: 'evento',
    excerpt: 'Evento de degustação para parceiros e distribuidores.',
    date: '2023-08-15',
    eventDate: '2023-08-30',
    location: 'Sede Amam',
    status: 'finalizado',
  }
];

export const getPostsByType = (type?: string) => {
  if (!type || type === 'todos') return POSTS;
  return POSTS.filter(post => post.type === type);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return POSTS.find(post => post.slug === slug);
};
