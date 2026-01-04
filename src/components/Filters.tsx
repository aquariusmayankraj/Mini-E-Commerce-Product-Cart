import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SortOption } from '@/types/product';
import { memo } from 'react';

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const Filters = memo(function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortOption} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="price-asc">Price: Low → High</SelectItem>
          <SelectItem value="price-desc">Price: High → Low</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
});
