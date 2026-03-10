import { Product, Category } from '../types/product';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Pães Tradicionais', slug: 'paes-tradicionais' },
  { id: '2', name: 'Linha Integral', slug: 'linha-integral' },
  { id: '3', name: 'Sem Casca', slug: 'sem-casca' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'soja',
    name: 'Pão de Forma Integral Soja',
    slug: 'pao-de-forma-integral-soja',
    description: 'Pão de forma integral com soja, rico em fibras e proteínas.',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-soja.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: 222, perServing: 111, vd: 6 },
        carboidratos_g: { per100g: 42, perServing: 21, vd: 7 },
        acucares_totais_g: { per100g: 0, perServing: 0, vd: 0 },
        acucares_adicionados_g: { per100g: 0, perServing: 0, vd: 0 },
        proteinas_g: { per100g: 8, perServing: 4, vd: 8 },
        gorduras_totais_g: { per100g: 2, perServing: 1, vd: 2 },
        gorduras_saturadas_g: { per100g: 0, perServing: 0, vd: 1 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_poliinsaturadas_g: { per100g: 0, perServing: 0, vd: 0 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 5, perServing: 2.5, vd: 10 },
        sodio_mg: { per100g: 518, perServing: 259, vd: 13 }
      }
    }
  },
  {
    id: 'tradicional',
    name: 'Pão de Forma Tradicional',
    slug: 'pao-de-forma-tradicional',
    description: 'O clássico pão de forma AMAM, macio e perfeito para qualquer momento.',
    category: 'paes-tradicionais',
    image: '/SITE/PRODUTOS/TRADICIONAL/tradicional.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 8,
      nutrients: {
        valor_energetico_kcal: { per100g: 240, perServing: 120, vd: 6 },
        carboidratos_g: { per100g: 42, perServing: 21, vd: 7 },
        acucares_totais_g: { per100g: 5, perServing: 2.5, vd: null },
        acucares_adicionados_g: { per100g: 3, perServing: 1.5, vd: 3 },
        proteinas_g: { per100g: 10, perServing: 5, vd: 10 },
        gorduras_totais_g: { per100g: 4, perServing: 2, vd: 3 },
        gorduras_saturadas_g: { per100g: 1, perServing: 0.5, vd: 3 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_poliinsaturadas_g: { per100g: 0.1, perServing: 0.1, vd: 1 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 2, perServing: 1, vd: 4 },
        sodio_mg: { per100g: 422, perServing: 211, vd: 11 }
      }
    }
  },
  {
    id: 'sem-casca-tradicional',
    name: 'Pão Sem Casca Tradicional',
    slug: 'pao-sem-casca-tradicional',
    description: 'Praticidade e maciez sem a casca, ideal para sanduíches delicados.',
    category: 'sem-casca',
    image: '/SITE/PRODUTOS/SEM CASCAS/sem-casca-tradicional.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: 240, perServing: 120, vd: 6 },
        carboidratos_g: { per100g: 42, perServing: 21, vd: 7 },
        acucares_totais_g: { per100g: 5, perServing: 2.5, vd: null },
        acucares_adicionados_g: { per100g: 3, perServing: 1.5, vd: 3 },
        proteinas_g: { per100g: 10, perServing: 5, vd: 10 },
        gorduras_totais_g: { per100g: 4, perServing: 2, vd: 3 },
        gorduras_saturadas_g: { per100g: 1, perServing: 0.5, vd: 3 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_poliinsaturadas_g: { per100g: 0.1, perServing: 0.1, vd: 1 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 2, perServing: 1, vd: 4 },
        sodio_mg: { per100g: 422, perServing: 211, vd: 11 }
      }
    }
  },
  {
    id: 'integral-37-tradicional',
    name: 'Pão de Forma Integral 37% Tradicional',
    slug: 'pao-de-forma-integral-37-tradicional',
    description: 'Alto teor de fibras com 37% de farinha integral.',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-37-tradicional.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: 330, perServing: 165, vd: 8 },
        carboidratos_g: { per100g: 59, perServing: 30, vd: 10 },
        acucares_totais_g: { per100g: 20, perServing: 10, vd: null },
        acucares_adicionados_g: { per100g: 3, perServing: 1.5, vd: 3 },
        proteinas_g: { per100g: 14, perServing: 7, vd: 14 },
        gorduras_totais_g: { per100g: 4, perServing: 2, vd: 3 },
        gorduras_saturadas_g: { per100g: 2, perServing: 1, vd: 4 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 35, perServing: 18, vd: 90 },
        gorduras_poliinsaturadas_g: { per100g: 165, perServing: 83, vd: 415 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 7, perServing: 3.5, vd: 13 },
        sodio_mg: { per100g: 517, perServing: 259, vd: 13 }
      }
    }
  },
  {
    id: 'integral-37-ameixa',
    name: 'Pão de Forma Integral 37% Com Ameixa',
    slug: 'pao-de-forma-integral-37-com-ameixa',
    description: 'Sabor único e funcional com o toque da ameixa.',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-37-ameixa.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: 330, perServing: 165, vd: 8 },
        carboidratos_g: { per100g: 59, perServing: 30, vd: 10 },
        acucares_totais_g: { per100g: 20, perServing: 10, vd: null },
        acucares_adicionados_g: { per100g: 3, perServing: 1.5, vd: 3 },
        proteinas_g: { per100g: 14, perServing: 7, vd: 14 },
        gorduras_totais_g: { per100g: 4, perServing: 2, vd: 3 },
        gorduras_saturadas_g: { per100g: 2, perServing: 1, vd: 4 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 35, perServing: 18, vd: 90 },
        gorduras_poliinsaturadas_g: { per100g: 165, perServing: 83, vd: 415 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 7, perServing: 3.5, vd: 13 },
        sodio_mg: { per100g: 517, perServing: 259, vd: 13 }
      }
    }
  },
  {
    id: 'centeio-linhaca',
    name: 'Pão de Forma Centeio e Linhaça',
    slug: 'pao-de-forma-centeio-e-linhaca',
    description: 'A combinação poderosa do centeio com a linhaça para sua saúde.',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-centeio-linhaca.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: 231, perServing: 116, vd: 6 },
        carboidratos_g: { per100g: 40, perServing: 20, vd: 7 },
        acucares_totais_g: { per100g: 8, perServing: 4, vd: null },
        acucares_adicionados_g: { per100g: 0, perServing: 0, vd: 0 },
        proteinas_g: { per100g: 12, perServing: 6, vd: 12 },
        gorduras_totais_g: { per100g: 3, perServing: 1, vd: 2 },
        gorduras_saturadas_g: { per100g: 1, perServing: 0, vd: 2 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 8, perServing: 4, vd: 20 },
        gorduras_poliinsaturadas_g: { per100g: 29, perServing: 15, vd: 75 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 5, perServing: 3, vd: 10 },
        sodio_mg: { per100g: 417, perServing: 209, vd: 10 }
      }
    }
  },
  {
    id: 'aveia',
    name: 'Pão de Forma Aveia',
    slug: 'pao-de-forma-aveia',
    description: 'Suave e nutritivo, com os benefícios da aveia em cada fatia.',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-aveia.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: 265, perServing: 133, vd: 7 },
        carboidratos_g: { per100g: 52, perServing: 26, vd: 9 },
        acucares_totais_g: { per100g: 9, perServing: 4.5, vd: null },
        acucares_adicionados_g: { per100g: 1, perServing: 0.5, vd: 1 },
        proteinas_g: { per100g: 10, perServing: 5, vd: 10 },
        gorduras_totais_g: { per100g: 2, perServing: 1, vd: 2 },
        gorduras_saturadas_g: { per100g: 0, perServing: 0, vd: 1 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_poliinsaturadas_g: { per100g: 0, perServing: 0, vd: 0 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 6, perServing: 3, vd: 12 },
        sodio_mg: { per100g: 458, perServing: 229, vd: 11 }
      }
    }
  },
  {
    id: 'sem-casca-integral-37',
    name: 'Pão Sem Casca Tradicional Integral 37%',
    slug: 'pao-sem-casca-tradicional-integral-37',
    description: 'A maciez do sem casca com os benefícios do integral 37%.',
    category: 'sem-casca',
    image: '/SITE/PRODUTOS/SEM CASCAS/sem-casca-integral-37.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: 330, perServing: 165, vd: 8 },
        carboidratos_g: { per100g: 59, perServing: 30, vd: 10 },
        acucares_totais_g: { per100g: 20, perServing: 10, vd: null },
        acucares_adicionados_g: { per100g: 3, perServing: 1.5, vd: 3 },
        proteinas_g: { per100g: 14, perServing: 7, vd: 14 },
        gorduras_totais_g: { per100g: 4, perServing: 2, vd: 3 },
        gorduras_saturadas_g: { per100g: 2, perServing: 1, vd: 4 },
        gorduras_trans_g: { per100g: 0, perServing: 0, vd: 0 },
        gorduras_monoinsaturadas_g: { per100g: 35, perServing: 18, vd: 90 },
        gorduras_poliinsaturadas_g: { per100g: 165, perServing: 83, vd: 415 },
        colesterol_mg: { per100g: 0, perServing: 0, vd: 0 },
        fibras_g: { per100g: 7, perServing: 3.5, vd: 13 },
        sodio_mg: { per100g: 517, perServing: 259, vd: 13 }
      }
    }
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find(p => p.slug === slug);
};
