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
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '2',
    title: 'A história do Pão Francês no Brasil',
    slug: 'historia-pao-frances',
    type: 'blog',
    excerpt: 'Curiosidades sobre o pão mais amado do país e como a Amam preserva essa tradição.',
    date: '2023-09-20',
    author: 'Equipe de Conteúdo',
    coverImage: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Exemplo vimeo/youtube
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
    coverImage: '/SITE/CONTENT/feira-panificacao-2025.jpg',
    gallery: [
       'https://images.unsplash.com/photo-1586444248902-2f64eddc13bf?auto=format&fit=crop&q=80&w=800',
       'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=800',
       'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
    ]
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
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200'
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
    coverImage: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '6',
    title: 'Pudim de Pão Amam',
    slug: 'pudim-de-pao-amam',
    type: 'receita',
    excerpt: 'Transforme sobras de pão em uma sobremesa deliciosa e cremosa.',
    date: '2023-11-05',
    author: 'Chef Amam',
    coverImage: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=1200',
    ingredients: [
      { measure: '3 a 4', name: 'pães Amam amanhecidos' },
      { measure: '3', name: 'ovos' },
      { measure: '1 lata', name: 'de leite condensado' },
      { measure: '2 medidas da lata', name: 'de leite' },
      { measure: '1 colher de sopa', name: 'de manteiga' },
      { measure: '1 xícara', name: 'de açúcar para a calda' }
    ],
    preparationSteps: [
      'Derreta o açúcar em uma forma de pudim até virar caramelo.',
      'Pique os pães e coloque no liquidificador junto com o leite para amolecer.',
      'Adicione os ovos, o leite condensado e a manteiga. Bata até ficar homogêneo.',
      'Despeje a mistura na forma caramelizada.',
      'Leve ao forno em banhomaria por aproximadamente 50 minutos ou até firmar.',
      'Deixe esfriar e leve à geladeira antes de desenformar.'
    ]
  },
  {
    id: '7',
    title: 'Sanduíche Gourmet com Pão de Hambúrguer',
    slug: 'sanduiche-gourmet',
    type: 'receita',
    excerpt: 'Uma receita rápida e sofisticada para impressionar seus convidados.',
    date: '2023-11-10',
    author: 'Chef Amam',
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200',
    ingredients: [
      { measure: '2', name: 'Pães de Hambúrguer Amam' },
      { measure: '200g', name: 'de carne moída (blend de sua preferência)' },
      { measure: '150g', name: 'Queijo cheddar ou prato fatiado' },
      { measure: '1 porção', name: 'Cebola caramelizada' },
      { measure: 'A gosto', name: 'Rúcula fresca' },
      { measure: 'A gosto', name: 'Maionese temperada' }
    ],
    preparationSteps: [
      'Molde a carne em formato de hambúrguer e tempere com sal e pimenta.',
      'Grelhe o hambúrguer até o ponto desejado, adicionando o queijo no final para derreter.',
      'Corte os pães ao meio e sele-os levemente na chapa com manteiga.',
      'Monte o sanduíche começando pela maionese, carne com queijo, cebola e rúcula.',
      'Sirva imediatamente enquanto está quente.'
    ]
  }
];

export const getPostsByType = (type?: string) => {
  if (!type || type === 'todos') return POSTS;
  return POSTS.filter(post => post.type === type);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return POSTS.find(post => post.slug === slug);
};
