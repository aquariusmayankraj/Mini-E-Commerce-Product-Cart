import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

interface FakeStoreProduct {
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
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data: FakeStoreProduct[] = await response.json();
        
        // Add random stock to each product (0-20)
        const productsWithStock: Product[] = data.map((product) => ({
          ...product,
          stock: Math.floor(Math.random() * 21),
        }));
        
        setProducts(productsWithStock);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
