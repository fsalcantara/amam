import db from '../src/lib/db';

const product = {
  "name": "Pão de Forma Soja",
  "slug": "pao-de-forma-soja",
  "description": "Pão de forma com soja em sua composição, com textura macia e bom teor de proteínas.",
  "highlights": "",
  "category": "linha-integral",
  "ingredients": "Farinha de trigo branca, farinha integral, farinha de soja, flocos de soja, sal refinado, lecitina de soja (espécie doadora dos genes: Agrobacterium tumefaciens), melhorador de farinha: alfa-amilase de Bacillus subtilis (INS 1100), emulsificante: polisorbato 80 (INS 433), conservantes: propionato de cálcio (INS 282) e ácido sórbico (INS 200).",
  "allergens": "CONTÉM TRIGO E DERIVADOS DE SOJA.",
  "mayContain": "CENTEIO, AVEIA, CEVADA, OVO, LEITE E CASTANHAS.",
  "containsGluten": true,
  "image": "/SITE/PRODUTOS/LINHA INTEGRAL/integral-soja.png",
  "nutritionalInfo": {
    "servingSize": 50,
    "servingsPerPack": 7,
    "nutrients": {
      "valor_energetico_kcal": { "per100g": "222", "perServing": "111", "vd": "6" },
      "carboidratos_g": { "per100g": "42", "perServing": "21", "vd": "7" },
      "acucares_totais_g": { "per100g": "0", "perServing": "0", "vd": "-" },
      "acucares_adicionados_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "proteinas_g": { "per100g": "8", "perServing": "4", "vd": "8" },
      "gorduras_totais_g": { "per100g": "2", "perServing": "1", "vd": "2" },
      "gorduras_saturadas_g": { "per100g": "0", "perServing": "0", "vd": "1" },
      "gorduras_trans_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_monoinsaturadas_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_poliinsaturadas_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "colesterol_mg": { "per100g": "0", "perServing": "0", "vd": "0" },
      "fibras_g": { "per100g": "5", "perServing": "2.5", "vd": "10" },
      "sodio_mg": { "per100g": "518", "perServing": "259", "vd": "13" }
    }
  }
};

async function run() {
  try {
    const existing = db.prepare('SELECT id FROM products WHERE slug = ?').get(product.slug) as any;
    
    if (existing) {
      db.prepare(`
        UPDATE products 
        SET name = ?, description = ?, highlights = ?, category = ?, image = ?, ingredients = ?, allergens = ?, may_contain = ?, contains_gluten = ?, nutritional_info = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        product.name, 
        product.description, 
        product.highlights, 
        product.category, 
        product.image, 
        product.ingredients, 
        product.allergens, 
        product.mayContain, 
        product.containsGluten ? 1 : 0, 
        JSON.stringify(product.nutritionalInfo),
        existing.id
      );
      console.log('✅ Pão de Soja atualizado!');
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      db.prepare(`
        INSERT INTO products (id, name, slug, description, highlights, category, image, ingredients, allergens, may_contain, contains_gluten, nutritional_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, product.name, product.slug, product.description, product.highlights, product.category, product.image, product.ingredients, product.allergens, product.mayContain, product.containsGluten ? 1 : 0, JSON.stringify(product.nutritionalInfo)
      );
      console.log('✅ Pão de Soja inserido!');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err);
    process.exit(1);
  }
}

run();
