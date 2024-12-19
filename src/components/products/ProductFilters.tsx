'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { debounce, DebouncedFunc } from 'lodash';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFilters) => void;
  categories: string[];
  farmingMethods: string[];
}

export interface ProductFilters {
  search: string;
  category: string;
  farmingMethod: string;
  deliveryOnly: boolean;
  pickupOnly: boolean;
}

export function ProductFilters({ onFilterChange, categories, farmingMethods }: ProductFiltersProps) {
  const t = useTranslations('Products.filters');
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    farmingMethod: '',
    deliveryOnly: false,
    pickupOnly: false,
  });

  const debouncedFilterChange = useRef<DebouncedFunc<() => void>>();

  useEffect(() => {
    return () => {
      if (debouncedFilterChange.current) {
        debouncedFilterChange.current.cancel();
      }
    };
  }, []);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    if (debouncedFilterChange.current) {
      debouncedFilterChange.current.cancel();
    }
    
    debouncedFilterChange.current = debounce(() => {
      onFilterChange(updatedFilters);
    }, 300);
    
    debouncedFilterChange.current();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label id="search-label" className="text-sm font-medium text-white">
          {t('search')}
        </label>
        <Input
          placeholder={t('search')}
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="w-full text-white"
          aria-labelledby="search-label"
        />
      </div>

      <div className="space-y-2">
        <label id="category-label" className="text-sm font-medium text-white">
          {t('category')}
        </label>
        <Select 
          value={filters.category} 
          onValueChange={(value) => handleFilterChange({ category: value })}
          aria-labelledby="category-label"
          aria-expanded="false"
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label id="farming-method-label" className="text-sm font-medium text-white">
          {t('farmingMethod')}
        </label>
        <Select 
          value={filters.farmingMethod} 
          onValueChange={(value) => handleFilterChange({ farmingMethod: value })}
          aria-labelledby="farming-method-label"
          aria-expanded="false"
        >
          <SelectTrigger>
            <SelectValue placeholder="All Methods" />
          </SelectTrigger>
          <SelectContent>
            {farmingMethods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 