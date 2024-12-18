'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';

import { productsMock } from '@/mocks/products';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import Bounded from '@/components/Bounded';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductFilters } from '@/components/products/ProductFilters';

export default function ProductsPage() {
  const t = useTranslations('Products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    farmingMethod: '',
    deliveryOnly: false,
    pickupOnly: false,
  });
  const [sortBy, setSortBy] = useState<'price' | 'date' | 'stock'>('date');

  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId);
  };

  const filteredProducts = productsMock.filter((product) => {
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.farmingMethod && product.farmingMethod !== filters.farmingMethod) {
      return false;
    }
    if (filters.deliveryOnly && !product.availableForDelivery) {
      return false;
    }
    if (filters.pickupOnly && !product.pickupAvailable) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price.amount - b.price.amount;
      case 'date':
        return b.harvestDate.getTime() - a.harvestDate.getTime();
      case 'stock':
        return b.stockQuantity - a.stockQuantity;
      default:
        return 0;
    }
  });

  const categories = Array.from(new Set(productsMock.map((p) => p.category)));
  const farmingMethods = Array.from(new Set(productsMock.map((p) => p.farmingMethod)));

  return (
    <Bounded>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <ProductFilters
            onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
            categories={categories}
            farmingMethods={farmingMethods}
          />
        </aside>

        <main className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('sortBy.label')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">{t('sortBy.price')}</SelectItem>
                  <SelectItem value="date">{t('sortBy.date')}</SelectItem>
                  <SelectItem value="stock">{t('sortBy.stock')}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  title={t('viewMode.grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  title={t('viewMode.list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <ProductGrid
            products={sortedProducts}
            viewMode={viewMode}
            onProductClick={handleProductClick}
          />
        </main>
      </div>
    </Bounded>
  );
} 