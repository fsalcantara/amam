export type ContentType = 'blog' | 'evento' | 'treinamento';

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
  
  // Event specific
  eventDate?: string;
  location?: string;
  status?: 'futuro' | 'acontecendo' | 'finalizado';
  
  // Training specific
  targetAudience?: string;
  format?: 'presencial' | 'online' | 'hibrido';
  hours?: string;
  
  createdAt?: string;
}

export const CONTENT_TYPES: { id: ContentType; label: string }[] = [
  { id: 'blog', label: 'Blog Post' },
  { id: 'evento', label: 'Evento' },
  { id: 'treinamento', label: 'Treinamento' },
];
