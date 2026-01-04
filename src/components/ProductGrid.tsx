import { memo } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  getItemQuantity: (productId: number) => number;
  onViewDetails: (product: Product) => void;
}

export const ProductGrid = memo(function ProductGrid({
  products,
  onAddToCart,
  getItemQuantity,
  onViewDetails,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <PackageX className="mb-4 h-16 w-16 text-muted-foreground/50" />
        <h3 className="mb-2 text-lg font-medium text-foreground">No products found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          cartQuantity={getItemQuantity(product.id)}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
});
