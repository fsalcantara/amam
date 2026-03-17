import db from '../src/lib/db';

const product = {
  "name": "Pão de Forma Tradicional",
  "slug": "pao-de-forma-tradicional",
  "description": "Pão de forma tradicional com textura macia e sabor suave, ideal para o consumo diário.",
  "highlights": "",
  "category": "paes-tradicionais",
  "ingredients": "Farinha de trigo branca, açúcar, margarina (espécie doadora dos genes: Streptomyces viridochromogenes, Agrobacterium tumefaciens e Bacillus thuringiensis), glúten, farinha de soja, sal, lecitina de soja (espécie doadora dos genes: Agrobacterium tumefaciens), melhorador de farinha: alfa-amilase de Bacillus subtilis (INS 1100), conservantes: ácido sórbico (INS 200) e propionato de cálcio (INS 282).",
  "allergens": "CONTÉM TRIGO E DERIVADOS DE SOJA.",
  "mayContain": "CENTEIO, AVEIA, CEVADA, OVO, LEITE E CASTANHAS.",
  "containsGluten": true,
  "image": "/SITE/PRODUTOS/PAES TRADICIONAIS/tradicional.png",
  "nutritionalInfo": {
    "servingSize": 50,
    "servingsPerPack": 8,
    "nutrients": {
      "valor_energetico_kcal": { "per100g": "240", "perServing": "120", "vd": "6" },
      "carboidratos_g": { "per100g": "42", "perServing": "21", "vd": "7" },
      "acucares_totais_g": { "per100g": "5", "perServing": "2.5", "vd": "-" },
      "acucares_adicionados_g": { "per100g": "3", "perServing": "1.5", "vd": "3" },
      "proteinas_g": { "per100g": "10", "perServing": "5", "vd": "10" },
      "gorduras_totais_g": { "per100g": "4", "perServing": "2", "vd": "3" },
      "gorduras_saturadas_g": { "per100g": "1", "perServing": "0.5", "vd": "3" },
      "gorduras_trans_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_monoinsaturadas_g": { "per100g": "0", "perServing": "0", "vd": "0" },
      "gorduras_poliinsaturadas_g": { "per100g": "0.1", "perServing": "0.1", "vd": "1" },
      "colesterol_mg": { "per100g": "0", "perServing": "0", "vd": "0" },
      "fibras_g": { "per100g": "2", "perServing": "1", "vd": "4" },
      "sodio_mg": { "per100g": "422", "perServing": "211", "vd": "11" }
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
      console.log('✅ Pão Tradicional atualizado!');
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      db.prepare(`
        INSERT INTO products (id, name, slug, description, highlights, category, image, ingredients, allergens, may_contain, contains_gluten, nutritional_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, product.name, product.slug, product.description, product.highlights, product.category, product.image, product.ingredients, product.allergens, product.mayContain, product.containsGluten ? 1 : 0, JSON.stringify(product.nutritionalInfo)
      );
      console.log('✅ Pão Tradicional inserido!');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err);
    process.exit(1);
  }
}

run();
