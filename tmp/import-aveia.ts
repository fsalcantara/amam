import db from '../src/lib/db';

const product = {
  "name": "Pão de Forma Aveia",
  "slug": "pao-de-forma-aveia",
  "description": "Pão de forma com aveia em sua composição, com textura macia e sabor leve.",
  "highlights": "",
  "category": "linha-integral",
  "ingredients": "Farinha de trigo branca, farinha de trigo integral, aveia, sal refinado, açúcar, glúten, melhorador de farinha: alfa amilase de Bacillus subtilis (INS 1100), emulsificante: polisorbato 80 (INS 433) e conservantes: ácido sórbico (INS 200) e propionato de cálcio (INS 282).",
  "allergens": "CONTÉM TRIGO E AVEIA.",
  "mayContain": "OVO, SOJA, LEITE, CENTEIO, CEVADA E CASTANHAS.",
  "containsGluten": true,
  "image": "/SITE/PRODUTOS/LINHA INTEGRAL/integral-aveia.png",
  "nutritionalInfo": {
    "servingSize": 50,
    "servingsPerPack": 7,
    "nutrients": {
      "valor_energetico_kcal": { "per100g": "265", "perServing": "133", "vd": "7" },
      "carboidratos_g": { "per100g": "52", "perServing": "26", "vd": "9" },
      "acucares_totais_g": { "per100g": "9", "perServing": "4.5", "vd": "-" },
      "acucares_adicionados_g": { "per100g": "1", "perServing": "0.5", "vd": "1" },
      "proteinas_g": { "per100g": "10", "perServing": "5", "vd": "10" },
      "gorduras_totais_g": { "per100g": "2", "perServing": "1", "vd": "2" },
      "gorduras_saturadas_g": { "per100g": "0", "perServing": "0", "vd": "1" },
      "gorduras_trans_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_monoinsaturadas_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_poliinsaturadas_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "colesterol_mg": { "per100g": "0", "perServing": "0", "vd": "0" },
      "fibras_g": { "per100g": "6", "perServing": "3", "vd": "12" },
      "sodio_mg": { "per100g": "458", "perServing": "229", "vd": "11" }
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
      console.log('✅ Pão de Aveia atualizado!');
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      db.prepare(`
        INSERT INTO products (id, name, slug, description, highlights, category, image, ingredients, allergens, may_contain, contains_gluten, nutritional_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, product.name, product.slug, product.description, product.highlights, product.category, product.image, product.ingredients, product.allergens, product.mayContain, product.containsGluten ? 1 : 0, JSON.stringify(product.nutritionalInfo)
      );
      console.log('✅ Pão de Aveia inserido!');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err);
    process.exit(1);
  }
}

run();
