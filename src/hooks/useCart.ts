import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '@/types/product';

const CART_STORAGE_KEY = 'mini-ecommerce-cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        // Don't exceed stock
        if (existingItem.quantity >= product.stock) return prev;
        
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        
        // Clamp quantity between 1 and stock
        const newQuantity = Math.max(1, Math.min(quantity, item.product.stock));
        return { ...item, quantity: newQuantity };
      })
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = cartItems.find((item) => item.product.id === productId);
      return item?.quantity || 0;
    },
    [cartItems]
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    getItemQuantity,
  };
}
