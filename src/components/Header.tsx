import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = memo(function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Mini<span className="text-primary">Shop</span>
        </h1>
        
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onCartClick}
          aria-label={`Shopping cart with ${cartItemCount} items`}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
});
