'use client';

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onProductClick: (productId: string) => void;
}

export function ProductGrid({ products, viewMode, onProductClick }: ProductGridProps) {
  const gridClassName = viewMode === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
    : 'flex flex-col gap-4';

  return (
    <div className={gridClassName}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
} 