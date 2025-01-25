'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { CalendarDays, Package2, Truck } from "lucide-react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Rating } from '@/components/ui/rating';

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
        "w-screen max-w-[295px] ",
        "bg-white rounded-lg overflow-hidden",
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
          "bg-[#F5F5F5] rounded-lg",
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
      
      <div className="p-4 space-y-2">
        <div className="flex flex-col justify-between items-start gap-1">
          <h3 className="text-base font-medium line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Rating value={product.rating} max={5} readOnly />
            <span className="text-sm text-gray-600">{product.rating}/5</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold">
            {formatPrice(product.price.amount)}
          </p>
        </div>
      </div>
    </div>
  );
} 