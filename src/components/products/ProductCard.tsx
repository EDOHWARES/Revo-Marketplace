'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { CalendarDays, Package2, Truck } from "lucide-react";

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onClick: (productId: string) => void;
}

export function ProductCard({ product, viewMode, onClick }: ProductCardProps) {
  const cardClassName = viewMode === 'grid' 
    ? 'w-full cursor-pointer hover:shadow-lg transition-shadow'
    : 'w-full flex flex-row cursor-pointer hover:shadow-lg transition-shadow';

  return (
    <Card className={cardClassName} onClick={() => onClick(product.id)}>
      <div className={viewMode === 'grid' ? 'w-full' : 'w-1/4'}>
        <Image
          src={`/images/${product.images[0]}`}
          alt={product.name}
          width={300}
          height={200}
          className="object-cover w-full h-48 rounded-t-lg"
        />
      </div>
      <div className={viewMode === 'grid' ? 'p-4' : 'w-3/4 p-4'}>
        {/* Farm Info Section */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/logo.jpeg"
              alt={`${product.farmer.farmName} logo`}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-500">{product.farmer.farmName}</p>
        </div>

        {/* Product Info Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="text-right">
              <p className="text-lg font-bold">
                ${product.price.amount} <span className="text-sm text-gray-500">{product.price.unit}</span>
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-1.5">
            {product.certifications.map((cert) => (
              <Badge key={cert} variant="secondary" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Package2 className="h-4 w-4" />
              <span>Stock: {product.stockQuantity}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{product.harvestDate.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="flex gap-2">
            {product.availableForDelivery && (
              <Badge variant="outline" className="text-xs">
                <Truck className="h-3 w-3 mr-1" />
                Delivery
              </Badge>
            )}
            {product.pickupAvailable && (
              <Badge variant="outline" className="text-xs">
                <Package2 className="h-3 w-3 mr-1" />
                Pickup
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 