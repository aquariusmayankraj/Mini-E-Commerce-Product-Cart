import { memo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/product';
import { CartItem } from './CartItem';
import { ShoppingBag } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  totalItems: number;
  totalPrice: number;
}

export const CartSidebar = memo(function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  totalItems,
  totalPrice,
}: CartSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-medium text-foreground">
              Your cart is empty
            </h3>
            <p className="text-sm text-muted-foreground">
              Add some products to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-xl font-semibold text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
});
