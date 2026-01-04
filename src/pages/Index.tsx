import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { Filters } from '@/components/Filters';
import { ProductGrid } from '@/components/ProductGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { ProductModal } from '@/components/ProductModal';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useDebounce } from '@/hooks/useDebounce';
import { Product, SortOption } from '@/types/product';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const { products, loading, error } = useProducts();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    getItemQuantity,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return cats.sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, debouncedSearch, selectedCategory, sortOption]);

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all' || sortOption !== 'default';

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortOption('default');
  }, []);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <AlertCircle className="mb-4 h-16 w-16 text-destructive" />
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Failed to load products
        </h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Results count */}
        {!loading && (
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        )}

        {/* Products */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
            getItemQuantity={getItemQuantity}
            onViewDetails={handleViewDetails}
          />
        )}
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        cartQuantity={selectedProduct ? getItemQuantity(selectedProduct.id) : 0}
      />
    </div>
  );
};

export default Index;
