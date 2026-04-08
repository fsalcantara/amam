"use client";

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { Product } from '@/features/products/types/product';
import { productClientService } from '@/features/products/services/productClientService';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminSelect } from '@/features/admin/components/ui/AdminInput';
import styles from './ProductList.module.css';
import { useDebounce } from '@/hooks/useDebounce';

import { ProductFormProps } from './ProductForm';

const ProductForm = dynamic<ProductFormProps>(() => import('./ProductForm').then(mod => mod.ProductForm), {
  loading: () => <div className={styles.loading}>Carregando formulário...</div>
});

export default function ProductList() {
  const { data: products, error, mutate: mutateProducts } = useSWR<Product[]>('/api/products', () => productClientService.getProducts());
  const loading = !products && !error;

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredProducts = useMemo(() => 
    (products || []).filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      return matchesSearch && matchesCategory;
    }),
    [products, debouncedSearchTerm, categoryFilter]
  );

  const handleCreate = () => {
    setCurrentProduct(null);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      await productClientService.deleteProduct(id);
      mutateProducts();
    }
  };

  const handleSave = async (data: Partial<Product>) => {
    if (currentProduct?.id) {
      await productClientService.updateProduct(currentProduct.id, data);
    } else {
      await productClientService.createProduct(data as any);
    }
    setIsEditing(false);
    mutateProducts();
  };

  if (isEditing) {
    return (
      <ProductForm 
        initialData={currentProduct} 
        onSubmit={handleSave} 
        onCancel={() => {
          setIsEditing(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Gerenciar Produtos</h1>
          <p className={styles.subtitle}>Gerencie o catálogo de produtos e informações nutricionais.</p>
        </div>
        <AdminButton onClick={handleCreate}>+ Novo Produto</AdminButton>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Buscar por nome..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.filterBox}>
          <AdminSelect 
            value={categoryFilter} 
            onChange={(value: string) => setCategoryFilter(value)}
            options={[
              { label: 'Todas as Categorias', value: '' },
              { label: 'Pães Tradicionais', value: 'paes-tradicionais' },
              { label: 'Linha Integral', value: 'linha-integral' },
              { label: 'Sem Casca', value: 'sem-casca' },
            ]}
            placeholder="Filtrar por Categoria"
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className={styles.cardList}>
        {filteredProducts.length === 0 ? (
          <p className={styles.emptyState}>Nenhum produto encontrado.</p>
        ) : filteredProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.name} className={styles.cardImg} />
            <div className={styles.cardBody}>
              <span className={styles.cardName}>{product.name}</span>
              <span className={styles.categoryTag}>{product.category}</span>
              <div className={styles.cardActions}>
                <AdminButton variant="secondary" className={styles.smBtn} onClick={() => handleEdit(product)}>Editar</AdminButton>
                <AdminButton variant="danger" className={styles.smBtn} onClick={() => handleDelete(product.id)}>Excluir</AdminButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} className={styles.productImg} />
                  </td>
                  <td className={styles.productName}>{product.name}</td>
                  <td>
                    <span className={styles.categoryTag}>{product.category}</span>
                  </td>
                  <td className={styles.actions}>
                    <AdminButton variant="secondary" className={styles.smBtn} onClick={() => handleEdit(product)}>
                      Editar
                    </AdminButton>
                    <AdminButton variant="danger" className={styles.smBtn} onClick={() => handleDelete(product.id)}>
                      Excluir
                    </AdminButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
