import db from '@/lib/db';
import { Product } from '../types/product';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const rows = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
      return (rows as any[]).map(row => ({
        ...row,
        mayContain: row.may_contain,
        containsGluten: Boolean(row.contains_gluten),
        nutritionalInfo: typeof row.nutritional_info === 'string' ? JSON.parse(row.nutritional_info) : row.nutritional_info
      }));
    } catch (error: any) {
      console.error('❌ [productService] Erro ao buscar produtos:', error.message);
      return [];
    }
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
      if (!row) return undefined;
      return {
        ...row,
        mayContain: row.may_contain,
        containsGluten: Boolean(row.contains_gluten),
        nutritionalInfo: typeof row.nutritional_info === 'string' ? JSON.parse(row.nutritional_info) : row.nutritional_info
      };
    } catch (error: any) {
      console.error(`❌ [productService] Erro ao buscar produto por ID (${id}):`, error.message);
      return undefined;
    }
  },

  getProductBySlug: async (slug: string): Promise<Product | undefined> => {
    try {
      const row = db.prepare('SELECT * FROM products WHERE slug = ?').get(slug) as any;
      if (!row) return undefined;
      return {
        ...row,
        mayContain: row.may_contain,
        containsGluten: Boolean(row.contains_gluten),
        nutritionalInfo: typeof row.nutritional_info === 'string' ? JSON.parse(row.nutritional_info) : row.nutritional_info
      };
    } catch (error: any) {
      console.error(`❌ [productService] Erro ao buscar produto por SLUG (${slug}):`, error.message);
      return undefined;
    }
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const id = Math.random().toString(36).substr(2, 9);
      const { name, slug, description, highlights, category, image, nutritionalInfo, ingredients, allergens, mayContain, containsGluten } = product;
      
      const info = db.prepare(`
        INSERT INTO products (id, name, slug, description, highlights, category, image, ingredients, allergens, may_contain, contains_gluten, nutritional_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, name, slug, description, highlights, category, image, ingredients, allergens, mayContain, containsGluten ? 1 : 0, JSON.stringify(nutritionalInfo)
      );
      
      return { ...product, id } as Product;
    } catch (error: any) {
      console.error('❌ [productService] Erro ao criar produto:', error.message);
      throw error;
    }
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    try {
      const prev = await productService.getProductById(id);
      if (!prev) return null;

      const data = { ...prev, ...updates };
      
      db.prepare(`
        UPDATE products 
        SET name = ?, slug = ?, description = ?, highlights = ?, category = ?, image = ?, ingredients = ?, allergens = ?, may_contain = ?, contains_gluten = ?, nutritional_info = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        data.name, 
        data.slug, 
        data.description, 
        data.highlights, 
        data.category, 
        data.image, 
        data.ingredients,
        data.allergens,
        data.mayContain,
        data.containsGluten ? 1 : 0,
        JSON.stringify(data.nutritionalInfo), 
        id
      );
      
      return data;
    } catch (error: any) {
      console.error(`❌ [productService] Erro ao atualizar produto (${id}):`, error.message);
      return null;
    }
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    try {
      db.prepare('DELETE FROM products WHERE id = ?').run(id);
      return true;
    } catch (error: any) {
      console.error(`❌ [productService] Erro ao excluir produto (${id}):`, error.message);
      return false;
    }
  }
};
