import { memo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { ShoppingCart, Star, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  cartQuantity: number;
}

export const ProductModal = memo(function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  cartQuantity,
}: ProductModalProps) {
  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const isMaxQuantity = cartQuantity >= product.stock;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-xl bg-secondary/50 p-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <Badge variant="outline" className="mb-3 w-fit capitalize">
              {product.category}
            </Badge>

            <h2 className="mb-3 text-xl font-semibold text-foreground">
              {product.title}
            </h2>

            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="text-sm font-medium">{product.rating.rate}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating.count} reviews)
              </span>
            </div>

            <p className="mb-4 flex-1 text-sm text-muted-foreground">
              {product.description}
            </p>

            <div className="mb-4">
              <span className="text-2xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-4">
              <span
                className={`text-sm font-medium ${
                  isOutOfStock ? 'text-destructive' : 'text-success'
                }`}
              >
                {isOutOfStock
                  ? 'Out of stock'
                  : `${product.stock} items in stock`}
              </span>
            </div>

            <Button
              size="lg"
              onClick={() => onAddToCart(product)}
              disabled={isOutOfStock || isMaxQuantity}
              className="w-full"
            >
              {cartQuantity > 0 ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  In Cart ({cartQuantity})
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>

            {isMaxQuantity && !isOutOfStock && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Maximum quantity reached
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
