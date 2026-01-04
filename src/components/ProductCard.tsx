import { memo } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartQuantity: number;
  onViewDetails: (product: Product) => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
  cartQuantity,
  onViewDetails,
}: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  const isMaxQuantity = cartQuantity >= product.stock;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <button
        onClick={() => onViewDetails(product)}
        className="relative aspect-square overflow-hidden bg-secondary/50 p-4"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Badge variant="secondary" className="text-sm font-medium">
              Out of Stock
            </Badge>
          </div>
        )}
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Badge variant="outline" className="mb-2 w-fit capitalize text-xs">
          {product.category}
        </Badge>
        
        <button
          onClick={() => onViewDetails(product)}
          className="mb-2 line-clamp-2 text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {product.title}
        </button>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`text-xs ${
                isOutOfStock ? 'text-destructive' : 'text-success'
              }`}
            >
              {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
            </span>
          </div>

          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock || isMaxQuantity}
            className="shrink-0"
          >
            {cartQuantity > 0 ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                {cartQuantity}
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
});
