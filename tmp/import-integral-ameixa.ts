import db from '../src/lib/db';

const product = {
  "name": "Pão de Forma Integral 37% com Ameixa",
  "slug": "pao-de-forma-integral-37-com-ameixa",
  "description": "Pão de forma integral com 37% de composição integral e adição de ameixa, com textura macia e sabor levemente adocicado.",
  "highlights": "",
  "category": "linha-integral",
  "ingredients": "Farinha de trigo integral, farinha de trigo branca, glúten, açúcar, margarina (espécie doadora dos genes: Streptomyces viridochromogenes, Agrobacterium tumefaciens e Bacillus thuringiensis), sal, lecitina de soja (espécie doadora dos genes: Agrobacterium tumefaciens), melhorador de farinha: alfa-amilase de Bacillus subtilis (INS 1100), conservantes: propionato de cálcio (INS 282) e ácido sórbico (INS 200).",
  "allergens": "CONTÉM TRIGO E DERIVADOS DE SOJA.",
  "mayContain": "OVO, LEITE, AVEIA, CEVADA, CENTEIO E CASTANHAS.",
  "containsGluten": true,
  "image": "/SITE/PRODUTOS/LINHA INTEGRAL/integral-37-ameixa.png",
  "nutritionalInfo": {
    "servingSize": 50,
    "servingsPerPack": 7,
    "nutrients": {
      "valor_energetico_kcal": { "per100g": "330", "perServing": "165", "vd": "8" },
      "carboidratos_g": { "per100g": "59", "perServing": "30", "vd": "10" },
      "acucares_totais_g": { "per100g": "20", "perServing": "10", "vd": "-" },
      "acucares_adicionados_g": { "per100g": "3", "perServing": "1.5", "vd": "3" },
      "proteinas_g": { "per100g": "14", "perServing": "7", "vd": "14" },
      "gorduras_totais_g": { "per100g": "4", "perServing": "2", "vd": "3" },
      "gorduras_saturadas_g": { "per100g": "2", "perServing": "1", "vd": "4" },
      "gorduras_trans_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_monoinsaturadas_g": { "per100g": "35", "perServing": "18", "vd": "90" },
      "gorduras_poliinsaturadas_g": { "per100g": "165", "perServing": "83", "vd": "415" },
      "colesterol_mg": { "per100g": "0", "perServing": "0", "vd": "0" },
      "fibras_g": { "per100g": "7", "perServing": "3.5", "vd": "13" },
      "sodio_mg": { "per100g": "517", "perServing": "259", "vd": "13" }
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
      console.log('✅ Pão Integral com Ameixa atualizado!');
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      db.prepare(`
        INSERT INTO products (id, name, slug, description, highlights, category, image, ingredients, allergens, may_contain, contains_gluten, nutritional_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, product.name, product.slug, product.description, product.highlights, product.category, product.image, product.ingredients, product.allergens, product.mayContain, product.containsGluten ? 1 : 0, JSON.stringify(product.nutritionalInfo)
      );
      console.log('✅ Pão Integral com Ameixa inserido!');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err);
    process.exit(1);
  }
}

run();
