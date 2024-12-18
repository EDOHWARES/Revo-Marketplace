'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import { Badge } from "../ui/badge";


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
      <div className={viewMode === 'grid' ? '' : 'w-3/4 p-4'}>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.farmer.farmName}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">
                ${product.price.amount} {product.price.unit}
              </p>
              <p className="text-sm text-gray-500">
                Stock: {product.stockQuantity}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.certifications.map((cert) => (
              <Badge key={cert} variant="secondary">
                {cert}
              </Badge>
            ))}
          </div>
          <p className="text-sm mt-2">
            Harvest Date: {product.harvestDate.toLocaleDateString()}
          </p>
        </CardContent>
      </div>
    </Card>
  );
} 