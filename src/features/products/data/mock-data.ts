import { Product, Category } from '../types/product';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Pães Tradicionais', slug: 'paes-tradicionais' },
  { id: '2', name: 'Linha Integral', slug: 'linha-integral' },
  { id: '3', name: 'Bolos & Doces', slug: 'bolos-e-doces' },
  { id: '4', name: 'Salgados', slug: 'salgados' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pão de Forma Tradicional',
    slug: 'pao-de-forma-tradicional',
    description: 'O clássico pão de forma, macio e saboroso, ideal para o seu café da manhã.',
    category: 'paes-tradicionais',
    image: '/placeholder-bread.jpg',
  },
  {
    id: '2',
    name: 'Pão Integral 12 Grãos',
    slug: 'pao-integral-12-graos',
    description: 'Saúde e sabor em cada fatia com nossa seleção especial de grãos.',
    category: 'linha-integral',
    image: '/placeholder-bread.jpg',
  },
  {
    id: '3',
    name: 'Bolo de Laranja',
    slug: 'bolo-de-laranja',
    description: 'Feito com suco natural da fruta, fofinho e delicioso.',
    category: 'bolos-e-doces',
    image: '/placeholder-cake.jpg',
  },
  {
    id: '4',
    name: 'Croissant Recheado',
    slug: 'croissant-recheado',
    description: 'Massa folhada crocante com recheio cremoso.',
    category: 'salgados',
    image: '/placeholder-croissant.jpg',
  },
  {
    id: '5',
    name: 'Bisnaguinha',
    slug: 'bisnaguinha',
    description: 'A alegria da criançada, macia e perfeita para lanchinhos.',
    category: 'paes-tradicionais',
    image: '/placeholder-bread.jpg',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find(p => p.slug === slug);
};
