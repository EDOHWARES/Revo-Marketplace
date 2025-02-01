'use client';

import Image from 'next/image';
import { useState } from 'react';

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    '/images/product-1.jpg',
    '/images/product-2.jpg',
    '/images/product-3.jpg',
    '/images/product-4.jpg',
  ];

  return (
    <div className="flex gap-4">
      {/* Thumbnails Column */}
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              relative w-16 h-16 border rounded-lg overflow-hidden
              ${selectedImage === index ? 'border-green-600' : 'border-gray-200'}
              hover:border-green-600 transition-colors
            `}
          >
            <Image
              src={image}
              alt={`Product view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt="Product main view"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default ProductGallery;