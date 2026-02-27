export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  nutritionalInfo?: {
    servingSize: string;
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
