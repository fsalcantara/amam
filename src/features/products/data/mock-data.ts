import { Product, Category } from '../types/product';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Pães Tradicionais', slug: 'paes-tradicionais' },
  { id: '2', name: 'Linha Integral', slug: 'linha-integral' },
  { id: '3', name: 'Sem Casca', slug: 'sem-casca' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'soja',
    name: 'Pão de Forma Integral com Soja',
    slug: 'pao-de-forma-integral-soja',
    description: 'Pão de massa clara com presença de flocos de soja na casca[cite: 73]. É uma excelente fonte de proteína vegetal e isoflavonas, auxiliando na redução do colesterol e na saúde digestiva[cite: 73].',
    highlights: 'FONTE DE FIBRAS - NÃO CONTÉM AÇÚCARES - ZERO COLESTEROL [cite: 73]',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-soja.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: '-', perServing: '124 kcal / 521 kJ', vd: 6 },
        carboidratos_g: { per100g: '-', perServing: 21, vd: 7 },
        acucares_totais_g: { per100g: '-', perServing: '-', vd: '-' },
        acucares_adicionados_g: { per100g: '-', perServing: '-', vd: '-' },
        proteinas_g: { per100g: '-', perServing: 5.4, vd: 7 },
        gorduras_totais_g: { per100g: '-', perServing: 2.1, vd: 4 },
        gorduras_saturadas_g: { per100g: '-', perServing: 0.5, vd: 2 },
        gorduras_trans_g: { per100g: '-', perServing: 0, vd: '**' },
        gorduras_monoinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        gorduras_poliinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        colesterol_mg: { per100g: '-', perServing: '-', vd: '-' },
        fibras_g: { per100g: '-', perServing: 3.2, vd: 13 },
        sodio_mg: { per100g: '-', perServing: 151, vd: 6 }
      }
    }
  },
  {
    id: 'tradicional',
    name: 'Pão de Forma Tradicional',
    slug: 'pao-de-forma-tradicional',
    description: 'O clássico pão de forma AMAM, macio e perfeito para qualquer momento.',
    category: 'paes-tradicionais',
    image: '/SITE/PRODUTOS/TRADICIONAL/Tradicional.png',
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
    name: 'Pão de Forma Tradicional Sem Casca',
    slug: 'pao-sem-casca-tradicional',
    description: 'Pão saboroso com massa de cor clara, textura macia e sem casca[cite: 75, 78, 84, 88]. Oferece versatilidade para o consumo com recheios doces ou salgados[cite: 16].',
    highlights: 'ZERO GORDURAS TRANS - 0g DE COLESTEROL - SEM ALTO TEOR DE AÇÚCAR [cite: 13, 14, 15]',
    category: 'sem-casca',
    image: '/SITE/PRODUTOS/SEM CASCAS/sem-casca-tradicional.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: '-', perServing: '123 kcal / 517 kJ', vd: 6 },
        carboidratos_g: { per100g: '-', perServing: 24, vd: 8 },
        acucares_totais_g: { per100g: '-', perServing: '-', vd: '-' },
        acucares_adicionados_g: { per100g: '-', perServing: '-', vd: '-' },
        proteinas_g: { per100g: '-', perServing: 4.2, vd: 6 },
        gorduras_totais_g: { per100g: '-', perServing: 1.1, vd: 2 },
        gorduras_saturadas_g: { per100g: '-', perServing: 0.2, vd: 1 },
        gorduras_trans_g: { per100g: '-', perServing: 0, vd: '**' },
        gorduras_monoinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        gorduras_poliinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        colesterol_mg: { per100g: '-', perServing: '-', vd: '-' },
        fibras_g: { per100g: '-', perServing: 1.1, vd: 4 },
        sodio_mg: { per100g: '-', perServing: 160, vd: 7 }
      }
    }
  },
  {
    id: 'integral-37-tradicional',
    name: 'Pão de Forma Integral 37% Tradicional',
    slug: 'pao-de-forma-integral-37-tradicional',
    description: 'Apresenta massa de cor marrom e casca fina[cite: 8]. Contém gordura monoinsaturada, auxiliando na redução do colesterol LDL, melhora da sensibilidade à insulina e regulação do trânsito intestinal[cite: 8].',
    highlights: '37% DE INGREDIENTES INTEGRAIS - FONTE DE FIBRA - ZERO COLESTEROL [cite: 8, 44]',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-37-tradicional.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: '-', perServing: '120 kcal / 504 kJ', vd: 6 },
        carboidratos_g: { per100g: '-', perServing: 21, vd: 7 },
        acucares_totais_g: { per100g: '-', perServing: '-', vd: '-' },
        acucares_adicionados_g: { per100g: '-', perServing: '-', vd: '-' },
        proteinas_g: { per100g: '-', perServing: 4.5, vd: 6 },
        gorduras_totais_g: { per100g: '-', perServing: 1.8, vd: 3 },
        gorduras_saturadas_g: { per100g: '-', perServing: 0.4, vd: 2 },
        gorduras_trans_g: { per100g: '-', perServing: 0, vd: '**' },
        gorduras_monoinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        gorduras_poliinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        colesterol_mg: { per100g: '-', perServing: '-', vd: '-' },
        fibras_g: { per100g: '-', perServing: 3.5, vd: 14 },
        sodio_mg: { per100g: '-', perServing: 151, vd: 6 }
      }
    }
  },
  {
    id: 'integral-37-ameixa',
    name: 'Pão de Forma Integral 37% Com Ameixa',
    slug: 'pao-de-forma-integral-37-com-ameixa',
    description: 'Massa de cor marrom com pedaços de ameixa[cite: 38]. Contém gorduras monoinsaturadas e poli-insaturadas que ajudam a reduzir o colesterol LDL e a melhorar a função cerebral[cite: 38].',
    highlights: '37% DE INGREDIENTES INTEGRAIS - FONTE DE FIBRA - ZERO GORDURAS TRANS [cite: 38]',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-37-ameixa.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: '-', perServing: '122 kcal / 512 kJ', vd: 6 },
        carboidratos_g: { per100g: '-', perServing: 22, vd: 7 },
        acucares_totais_g: { per100g: '-', perServing: '-', vd: '-' },
        acucares_adicionados_g: { per100g: '-', perServing: '-', vd: '-' },
        proteinas_g: { per100g: '-', perServing: 4.5, vd: 6 },
        gorduras_totais_g: { per100g: '-', perServing: 1.8, vd: 3 },
        gorduras_saturadas_g: { per100g: '-', perServing: 0.4, vd: 2 },
        gorduras_trans_g: { per100g: '-', perServing: 0, vd: '**' },
        gorduras_monoinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        gorduras_poliinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        colesterol_mg: { per100g: '-', perServing: '-', vd: '-' },
        fibras_g: { per100g: '-', perServing: 3.6, vd: 14 },
        sodio_mg: { per100g: '-', perServing: 151, vd: 6 }
      }
    }
  },
  {
    id: 'centeio-linhaca',
    name: 'Pão de Forma Integral Centeio & Linhaça',
    slug: 'pao-de-forma-centeio-e-linhaca',
    description: 'Pão com massa cor bege clara contendo linhaça no interior da massa[cite: 50, 51]. A linhaça fornece ômega-3 (ALA), possui antioxidantes e auxilia no controle do açúcar no sangue e do colesterol[cite: 63, 65, 67, 68, 69].',
    highlights: 'FONTE DE FIBRAS - ZERO COLESTEROL - NÃO CONTÉM AÇÚCARES [cite: 49, 60, 61]',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-centeio-linhaca.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: '-', perServing: '121 kcal / 508 kJ', vd: 6 },
        carboidratos_g: { per100g: '-', perServing: 21, vd: 7 },
        acucares_totais_g: { per100g: '-', perServing: '-', vd: '-' },
        acucares_adicionados_g: { per100g: '-', perServing: '-', vd: '-' },
        proteinas_g: { per100g: '-', perServing: 4.6, vd: 6 },
        gorduras_totais_g: { per100g: '-', perServing: 2.1, vd: 4 },
        gorduras_saturadas_g: { per100g: '-', perServing: 0.5, vd: 2 },
        gorduras_trans_g: { per100g: '-', perServing: 0, vd: '**' },
        gorduras_monoinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        gorduras_poliinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        colesterol_mg: { per100g: '-', perServing: '-', vd: '-' },
        fibras_g: { per100g: '-', perServing: 3.9, vd: 16 },
        sodio_mg: { per100g: '-', perServing: 150, vd: 6 }
      }
    }
  },
  {
    id: 'aveia',
    name: 'Pão de Forma Integral com Aveia',
    slug: 'pao-de-forma-aveia',
    description: 'Pão de forma com aveia em sua composição e aveia em flocos na casca dos pães[cite: 32]. Possui textura macia, sabor leve e ajuda a regular o trânsito intestinal, com pouca adição de açúcares[cite: 32].',
    highlights: 'ZERO GORDURAS SATURADAS - FONTE DE FIBRA - ZERO GORDURAS TRANS [cite: 32]',
    category: 'linha-integral',
    image: '/SITE/PRODUTOS/INTEGRAIS/integral-aveia.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: '-', perServing: '122 kcal / 512 kJ', vd: 6 },
        carboidratos_g: { per100g: '-', perServing: 22, vd: 7 },
        acucares_totais_g: { per100g: '-', perServing: '-', vd: '-' },
        acucares_adicionados_g: { per100g: '-', perServing: '-', vd: '-' },
        proteinas_g: { per100g: '-', perServing: 4.5, vd: 6 },
        gorduras_totais_g: { per100g: '-', perServing: 1.8, vd: 3 },
        gorduras_saturadas_g: { per100g: '-', perServing: 0.4, vd: 2 },
        gorduras_trans_g: { per100g: '-', perServing: 0, vd: '**' },
        gorduras_monoinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        gorduras_poliinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        colesterol_mg: { per100g: '-', perServing: '-', vd: '-' },
        fibras_g: { per100g: '-', perServing: 3.4, vd: 14 },
        sodio_mg: { per100g: '-', perServing: 153, vd: 6 }
      }
    }
  },
  {
    id: 'sem-casca-integral-37',
    name: 'Pão de Forma Integral 37% Sem Casca',
    slug: 'pao-sem-casca-tradicional-integral-37',
    description: 'Versão sem casca com 37% de ingredientes integrais[cite: 89]. Rico em gorduras monoinsaturadas e poli-insaturadas, auxilia na saúde cardiovascular e na melhora da função cerebral[cite: 89, 99].',
    highlights: '37% DE INGREDIENTES INTEGRAIS - FONTE DE FIBRA - ZERO GORDURAS TRANS [cite: 89, 91]',
    category: 'sem-casca',
    image: '/SITE/PRODUTOS/SEM CASCAS/sem-casca-integral-37.png',
    nutritionalInfo: {
      servingSize: 50,
      servingsPerPack: 7,
      nutrients: {
        valor_energetico_kcal: { per100g: '-', perServing: '120 kcal / 504 kJ', vd: 6 },
        carboidratos_g: { per100g: '-', perServing: 21, vd: 7 },
        acucares_totais_g: { per100g: '-', perServing: '-', vd: '-' },
        acucares_adicionados_g: { per100g: '-', perServing: '-', vd: '-' },
        proteinas_g: { per100g: '-', perServing: 4.5, vd: 6 },
        gorduras_totais_g: { per100g: '-', perServing: 1.8, vd: 3 },
        gorduras_saturadas_g: { per100g: '-', perServing: 0.4, vd: 2 },
        gorduras_trans_g: { per100g: '-', perServing: 0, vd: '**' },
        gorduras_monoinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        gorduras_poliinsaturadas_g: { per100g: '-', perServing: '-', vd: '-' },
        colesterol_mg: { per100g: '-', perServing: '-', vd: '-' },
        fibras_g: { per100g: '-', perServing: 3.5, vd: 14 },
        sodio_mg: { per100g: '-', perServing: 151, vd: 6 }
      }
    }
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find(p => p.slug === slug);
};
