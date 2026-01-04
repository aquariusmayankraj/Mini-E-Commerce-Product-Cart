export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc';
