import db from '../src/lib/db';

const product = {
  "name": "Pão de Forma Centeio & Linhaça",
  "slug": "pao-de-forma-centeio-linhaca",
  "description": "Pão de forma integral com centeio e linhaça, com textura macia e sabor marcante.",
  "highlights": "",
  "category": "linha-integral",
  "ingredients": "Farinha de trigo branca, farinha de trigo integral, semente de linhaça marrom, farinha de centeio, glúten, sal refinado, emulsificante: polisorbato 80 (INS 433), melhorador de farinha: alfa-amilase de Bacillus subtilis (INS 1100), conservantes: propionato de cálcio (INS 282) e ácido sórbico (INS 200).",
  "allergens": "CONTÉM TRIGO E CENTEIO.",
  "mayContain": "AVEIA, DERIVADOS DE SOJA, OVO, LEITE, CEVADA E CASTANHAS.",
  "containsGluten": true,
  "image": "/SITE/PRODUTOS/LINHA INTEGRAL/integral-centeio-linhaca.png",
  "nutritionalInfo": {
    "servingSize": 50,
    "servingsPerPack": 7,
    "nutrients": {
      "valor_energetico_kcal": { "per100g": "231", "perServing": "116", "vd": "6" },
      "carboidratos_g": { "per100g": "40", "perServing": "20", "vd": "7" },
      "acucares_totais_g": { "per100g": "8", "perServing": "4", "vd": "-" },
      "acucares_adicionados_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "proteinas_g": { "per100g": "12", "perServing": "6", "vd": "12" },
      "gorduras_totais_g": { "per100g": "3", "perServing": "1", "vd": "2" },
      "gorduras_saturadas_g": { "per100g": "1", "perServing": "0", "vd": "2" },
      "gorduras_trans_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_monoinsaturadas_g": { "per100g": "8", "perServing": "4", "vd": "20" },
      "gorduras_poliinsaturadas_g": { "per100g": "29", "perServing": "15", "vd": "75" },
      "colesterol_mg": { "per100g": "0", "perServing": "0", "vd": "0" },
      "fibras_g": { "per100g": "5", "perServing": "3", "vd": "10" },
      "sodio_mg": { "per100g": "417", "perServing": "209", "vd": "10" }
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
      console.log('✅ Pão de Centeio & Linhaça atualizado!');
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      db.prepare(`
        INSERT INTO products (id, name, slug, description, highlights, category, image, ingredients, allergens, may_contain, contains_gluten, nutritional_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, product.name, product.slug, product.description, product.highlights, product.category, product.image, product.ingredients, product.allergens, product.mayContain, product.containsGluten ? 1 : 0, JSON.stringify(product.nutritionalInfo)
      );
      console.log('✅ Pão de Centeio & Linhaça inserido!');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err);
    process.exit(1);
  }
}

run();
