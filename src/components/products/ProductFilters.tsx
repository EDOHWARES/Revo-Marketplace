'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="space-y-4 sticky top-4">
      <Input
        placeholder={t('search')}
        value={filters.search}
        onChange={(e) => handleFilterChange({ search: e.target.value })}
        className="w-full text-white"
      />
      
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('category')}</label>
        <Select value={filters.category} onValueChange={(value) => handleFilterChange({ category: value })}>
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
        <label className="text-sm font-medium text-white">{t('farmingMethod')}</label>
        <Select value={filters.farmingMethod} onValueChange={(value) => handleFilterChange({ farmingMethod: value })}>
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

      <div className="flex flex-wrap gap-2 ">
        <Badge
          variant="outline"
          className={`cursor-pointer ${filters.deliveryOnly ? 'bg-primary text-white' : 'text-white'}`}
          onClick={() => handleFilterChange({ deliveryOnly: !filters.deliveryOnly })}
        >
          {t('delivery')}
        </Badge>
        <Badge
          variant="outline"
          className={`cursor-pointer ${filters.pickupOnly ? 'bg-primary text-white' : 'text-white'}`}
          onClick={() => handleFilterChange({ pickupOnly: !filters.pickupOnly })}
        >
          {t('pickup')}
        </Badge>
      </div>
    </div>
  );
} 