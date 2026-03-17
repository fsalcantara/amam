-- SCRIPT DE CRIAÇÃO E CARGA INICIAL - AMAM ALIMENTOS
-- Utilize este arquivo para configurar o banco de dados na HostGator ou Localhost.

-- 1. Criação da Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  highlights TEXT,
  category VARCHAR(100),
  image LONGTEXT,
  ingredients TEXT,
  allergens TEXT,
  may_contain TEXT,
  contains_gluten BOOLEAN DEFAULT 1,
  nutritional_info JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Inserção do Pão de Forma Sem Casca Tradicional (Dados Oficiais)
INSERT INTO products (
  id, 
  name, 
  slug, 
  description, 
  highlights, 
  category, 
  image, 
  ingredients, 
  allergens, 
  may_contain, 
  contains_gluten, 
  nutritional_info
) VALUES (
  'sem-casca-tradicional-001', 
  'Pão de Forma Sem Casca Tradicional', 
  'pao-de-forma-sem-casca-tradicional', 
  'Pão de forma sem casca, com textura macia e sabor suave, ideal para o consumo diário.', 
  '', 
  'sem-casca', 
  '/SITE/PRODUTOS/SEM CASCAS/sem-casca-tradicional.png', 
  'Farinha de trigo branca, açúcar, margarina (espécie doadora dos genes: Streptomyces viridochromogenes, Agrobacterium tumefaciens e Bacillus thuringiensis), glúten, farinha de soja, sal, lecitina de soja (espécie doadora dos genes: Agrobacterium tumefaciens), melhorador de farinha: alfa-amilase de Bacillus subtilis (INS 1100), conservantes: ácido sórbico (INS 200) e propionato de cálcio (INS 282).',
  'CONTÉM TRIGO E DERIVADOS DE SOJA.',
  'CENTEIO, AVEIA, CEVADA, OVO, LEITE E CASTANHAS.',
  1, 
  '{"servingSize": 50, "servingsPerPack": 7, "nutrients": {"valor_energetico_kcal": {"per100g": "240", "perServing": "120", "vd": "6"}, "carboidratos_g": {"per100g": "42", "perServing": "21", "vd": "7"}, "acucares_totais_g": {"per100g": "5", "perServing": "2.5", "vd": "-"}, "acucares_adicionados_g": {"per100g": "3", "perServing": "1.5", "vd": "3"}, "proteinas_g": {"per100g": "10", "perServing": "5", "vd": "10"}, "gorduras_totais_g": {"per100g": "4", "perServing": "2", "vd": "3"}, "gorduras_saturadas_g": {"per100g": "1", "perServing": "0.5", "vd": "3"}, "gorduras_trans_g": {"per100g": "0", "perServing": "0", "vd": "0"}, "gorduras_monoinsaturadas_g": {"per100g": "0", "perServing": "0", "vd": "0"}, "gorduras_poliinsaturadas_g": {"per100g": "0.1", "perServing": "0.1", "vd": "1"}, "colesterol_mg": {"per100g": "0", "perServing": "0", "vd": "0"}, "fibras_g": {"per100g": "2", "perServing": "1", "vd": "4"}, "sodio_mg": {"per100g": "422", "perServing": "211", "vd": "11"}}}'
);
