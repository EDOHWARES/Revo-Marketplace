'use client';

import { Product } from "@/types/product";
import Image from "next/image";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Rating } from '@/components/ui/rating';
import { calculateDiscountedPrice } from "@/constants/helpers/CalculateDiscountedPrice";

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onClick: (productId: string) => void;
  locale?: string;
}

export function ProductCard({ product, viewMode, onClick, locale = 'en' }: ProductCardProps) {
  const t = useTranslations('Products');

  const formatPrice = useCallback((amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }, [locale]);

  const formatDate = useCallback((date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium'
    }).format(date);
  }, [locale]);

  const cardClassName = cn(
    'w-full cursor-pointer transition-all',
    'hover:shadow-lg focus-visible:shadow-lg',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    'focus-visible:ring-offset-2',
    {
      'flex flex-row': viewMode === 'list'
    }
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(product.id);
    }
  };

  return (
    <div
      className={cn(
        "w-screen max-w-[295px]",
        "bg-white overflow-hidden",
        "transition-all duration-200 hover:scale-[1.02]",
        "mx-auto"
      )}
      onClick={() => onClick(product.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div
        className={cn(
          "flex justify-center items-center",
          "bg-[#F5F5F5] rounded-[20px]",
          "w-full aspect-square",
          "p-4"
        )}
      >
        <Image
          src={`/images/${product.images[0]}`}
          alt={product.name}
          className="object-contain"
          width={200}
          height={200}
          sizes="(max-width: 295px) 100vw, 295px"
        />
      </div>

      <div className="py-4 space-y-2">
        <div className="flex flex-col justify-between items-start gap-1">
          <h3 className="text-base font-medium line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Rating
              value={product.rating}
              max={5}
              readOnly
              aria-label={`Product rated ${product.rating} out of 5 stars`}
            />
            <span className="text-sm text-gray-600">{product.rating}/5</span>
          </div>
        </div>

        <div className="flex items-center justify-start gap-2">
          <p className="text-base font-semibold text-black">
            {formatPrice(calculateDiscountedPrice(product.price.amount, product.discount))}
          </p>
          {product.discount > 0 && (
            <>
              <p className={cn("text-base font-semibold", product.discount > 0 && "line-through text-black/40")}>
                {formatPrice(product.price.amount)}
              </p>
              <p className="text-sm text-[#FF3333] bg-[#FF3333]/10 px-2 py-1 rounded-[62px]">
                -{product.discount}%
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 