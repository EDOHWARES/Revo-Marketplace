'use client';

import { Product } from '@/types/product'
import Image from 'next/image'
import { useState } from 'react'

const products: Product[] = [
  {
    id: "prod_1",
    name: "Tomates Orgánicos Cherry",
    description: "Tomates cherry cultivados sin pesticidas, dulces y jugosos",
    price: {
      amount: 3.99,
      unit: "kg"
    },
    discount: 10,
    farmer: {
      id: "farm_1",
      name: "María González",
      farmName: "Huerta El Paraíso",
      location: {
        latitude: 40.4168,
        longitude: -3.7038,
        address: "Camino Rural 23, Valencia"
      }
    },
    category: "Verduras",
    subCategory: "Tomates",
    images: ["/images/tomatoes.jpg", "/images/tomatoes-2.jpg"],
    stockQuantity: 100,
    harvestDate: new Date("2024-03-15"),
    certifications: ["Orgánico", "Km 0"],
    seasonality: ["Primavera", "Verano"],
    farmingMethod: "Cultivo orgánico",
    availableForDelivery: true,
    pickupAvailable: true,
    rating: 4.5
  },
  {
    id: "prod_2",
    name: "Huevos",
    description: "Fresas dulces cultivadas en invernadero sostenible",
    price: {
      amount: 4.50,
      unit: "500g"
    },
    discount: 0,
    farmer: {
      id: "farm_2",
      name: "Juan Martínez",
      farmName: "Finca Los Berries",
      location: {
        latitude: 37.3891,
        longitude: -5.9845,
        address: "Finca 45, Huelva"
      }
    },
    category: "Frutas",
    subCategory: "Bayas",
    images: ["/images/eggs.jpg"],
    stockQuantity: 50,
    harvestDate: new Date("2024-03-18"),
    certifications: ["Ecológico"],
    seasonality: ["Primavera"],
    farmingMethod: "Hidropónico",
    availableForDelivery: true,
    pickupAvailable: false,
    rating: 4.8
  },
  {
    id: "prod_3",
    name: "Lechugas Batavia",
    description: "Lechugas frescas hidropónicas",
    price: {
      amount: 1.99,
      unit: "unidad"
    },
    discount: 15,
    farmer: {
      id: "farm_3",
      name: "Ana Pérez",
      farmName: "Hidroponía Verde",
      location: {
        latitude: 41.3851,
        longitude: 2.1734,
        address: "Polígono 7, Barcelona"
      }
    },
    category: "Verduras",
    subCategory: "Hojas Verdes",
    images: ["/images/tomatoes.jpg", "/images/lettuce-2.jpg"],
    stockQuantity: 200,
    harvestDate: new Date("2024-03-19"),
    certifications: ["Hidropónico", "Sin pesticidas"],
    seasonality: ["Todo el año"],
    farmingMethod: "Hidropónico vertical",
    availableForDelivery: true,
    pickupAvailable: true,
    rating: 4.2
  },
  {
    id: "prod_4",
    name: "Zanahorias Moradas",
    description: "Zanahorias moradas heritage con alto contenido en antioxidantes",
    price: {
      amount: 2.99,
      unit: "kg"
    },
    discount: 5,
    farmer: {
      id: "farm_4",
      name: "Pedro Sánchez",
      farmName: "Huerta Tradicional",
      location: {
        latitude: 39.4699,
        longitude: -0.3763,
        address: "Camino de la Huerta 12, Valencia"
      }
    },
    category: "Verduras",
    subCategory: "Raíces",
    images: ["/images/eggs.jpg"],
    stockQuantity: 75,
    harvestDate: new Date("2024-03-17"),
    certifications: ["Biodinámica"],
    seasonality: ["Invierno", "Primavera"],
    farmingMethod: "Biodinámico",
    availableForDelivery: true,
    pickupAvailable: true,
    rating: 4.7
  }
];

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-gray-50 rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-green-700 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </span>
        </div>
      )}
      
      {/* Wishlist & Quick View */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          ♡
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          👁
        </button>
      </div>

      {/* Product Image */}
      <div className="aspect-square relative">
        <Image 
          src={product.images[0]} 
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold">${product.price.amount}</span>
          {product.discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              ${(product.price.amount * (1 + product.discount/100)).toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-gray-500 text-sm">({product.rating})</span>
        </div>

        {/* Add to Cart Button - Hidden by default, shown on hover */}
        <div className={`
          transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
          <button className="w-full bg-green-700 text-white py-2 rounded-md mt-3 hover:bg-green-800">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const RelatedProducts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default RelatedProducts
