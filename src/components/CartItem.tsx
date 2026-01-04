import { memo } from 'react';
import { CartItem as CartItemType } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItem = memo(function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const { product, quantity } = item;
  const isMaxQuantity = quantity >= product.stock;

  return (
    <div className="flex gap-4 border-b border-border py-4 last:border-0">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary/50 p-2">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h4 className="line-clamp-2 text-sm font-medium text-foreground">
          {product.title}
        </h4>
        <span className="mt-1 text-sm font-semibold text-primary">
          ${product.price.toFixed(2)}
        </span>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={isMaxQuantity}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(product.id)}
            aria-label="Remove from cart"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});
