import { Product } from '../types/product';

export const productClientService = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  deleteProduct: async (id: string): Promise<void> => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
  }
};
