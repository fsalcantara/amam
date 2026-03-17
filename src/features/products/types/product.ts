export interface NutrientValues {
  per100g: number | string;
  perServing: number | string;
  vd?: number | string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  highlights?: string;
  category: string;
  image: string;
  ingredients?: string;
  allergens?: string;
  mayContain?: string;
  containsGluten?: boolean;
  nutritionalInfo?: {
    servingSize: number;
    servingsPerPack: number;
    nutrients: {
      valor_energetico_kcal: NutrientValues;
      carboidratos_g: NutrientValues;
      acucares_totais_g: NutrientValues;
      acucares_adicionados_g: NutrientValues;
      proteinas_g: NutrientValues;
      gorduras_totais_g: NutrientValues;
      gorduras_saturadas_g: NutrientValues;
      gorduras_trans_g: NutrientValues;
      gorduras_monoinsaturadas_g: NutrientValues;
      gorduras_poliinsaturadas_g: NutrientValues;
      colesterol_mg: NutrientValues;
      fibras_g: NutrientValues;
      sodio_mg: NutrientValues;
    };
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
