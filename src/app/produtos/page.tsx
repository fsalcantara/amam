"use client";

import Link from 'next/link';
import { useRef, use } from 'react'; 
import { Container } from '@/components/atoms/Container/Container';
import { ProductCard } from '@/features/products/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/features/products/data/mock-data';
import styles from './page.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the plugin if needed, though useGSAP usually handles context
if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  // Check if we are running on server or client to safely unwrap params if needed.
  // Next.js 15 requires awaiting searchParams.
  // We can use the experimental `use` hook or async/await in a Server Component.
  // Since I made this a Client Component ("use client") to use GSAP, 
  // I need to handle the promise or receive resolved props.
  // HOWEVER, converting this to "use client" complicates the async props.
  // APPROACH: Keep it as a Client Component for GSAP, but since we receive a Promise,
  // we must use the `use` hook to unwrap it in Next.js 15+ Client Components.
  
  const resolvedParams = use(searchParams); 
  const { category } = resolvedParams;
  const selectedCategory = typeof category === 'string' ? category : undefined;

  const filteredProducts = selectedCategory
    ? PRODUCTS.filter(p => p.category === selectedCategory)
    : PRODUCTS;

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial reveal of layout (Header & Sidebar) - only on mount
    gsap.fromTo([headerRef.current, sidebarRef.current],
      { opacity: 0, y: (i) => i === 0 ? -20 : 0, x: (i) => i === 1 ? -20 : 0 },
      { opacity: 1, y: 0, x: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    );

    // Grid items animation - happens every time selectedCategory changes
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { y: 30, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.08,
          ease: 'power2.out',
          overwrite: true
        }
      );
    }
  }, { scope: containerRef, dependencies: [selectedCategory] });

  return (
    <div className={styles.page} ref={containerRef}>
      <Container>
        <div className={styles.header} ref={headerRef}>
            <h1>Nossos Produtos</h1>
            <p>Qualidade e tradição em cada receita.</p>
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar} ref={sidebarRef}>
            <h3>Categorias</h3>
            <ul className={styles.categoryList}>
              <li>
                <Link 
                  href="/produtos" 
                  className={!selectedCategory ? styles.active : ''}
                  scroll={false}
                >
                  Todos
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link 
                    href={`/produtos?category=${cat.slug}`}
                    className={selectedCategory === cat.slug ? styles.active : ''}
                    scroll={false}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <section className={styles.grid} ref={gridRef}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className={styles.empty}>
                <p>Nenhum produto encontrado nesta categoria.</p>
              </div>
            )}
          </section>
        </div>
      </Container>
    </div>
  );
}
