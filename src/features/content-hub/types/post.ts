export type ContentType = 'blog' | 'evento' | 'treinamento' | 'receita';

export interface Post {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  excerpt: string;
  content?: string; // HTML content
  date: string;
  author?: string;
  isFeatured?: boolean;
  
  // Media fields
  coverImage?: string;
  gallery?: string[]; // Array of image URLs
  videoUrl?: string; // YouTube/Vimeo embed URL
  
  // Event specific
  eventDate?: string;
  location?: string;
  status?: 'futuro' | 'acontecendo' | 'finalizado';
  
  // Training specific
  targetAudience?: string;
  format?: 'presencial' | 'online' | 'hibrido';
  hours?: string;
  
  // Recipe specific
  ingredients?: { measure: string; name: string }[];
  preparationSteps?: string[];
  recipeNote?: string;
  
  createdAt?: string;
}

export const CONTENT_TYPES: { id: ContentType; label: string }[] = [
  { id: 'blog', label: 'Blog' },
  { id: 'evento', label: 'Evento' },
  { id: 'treinamento', label: 'Treinamento' },
  { id: 'receita', label: 'Receitas' },
];
