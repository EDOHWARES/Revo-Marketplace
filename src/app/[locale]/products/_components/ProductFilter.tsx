'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { productsMock } from '@/mocks/products';

interface ProductFilterProps {
  categories: string[];
  farmingMethods: string[];
  onFilterChange: (filters: {
    category: string;
    farmingMethod: string;
    priceRange: [number, number];
    deliveryOnly: boolean;
    pickupOnly: boolean;
  }) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ 
  categories, 
  farmingMethods, 
  onFilterChange 
}) => {
  // Calcular el rango de precios min y max de los productos
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = productsMock.map(product => product.price.amount);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices))
    };
  }, []);

  // Estados para los filtros
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFarmingMethod, setSelectedFarmingMethod] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [pickupOnly, setPickupOnly] = useState(false);

  // Efecto para inicializar el rango de precios
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]] as [number, number]);
    applyFilters();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    applyFilters();
  };

  const handleFarmingMethodChange = (method: string) => {
    setSelectedFarmingMethod(method === selectedFarmingMethod ? '' : method);
    applyFilters();
  };

  const handleDeliveryChange = (checked: boolean) => {
    setDeliveryOnly(checked);
    applyFilters();
  };

  const handlePickupChange = (checked: boolean) => {
    setPickupOnly(checked);
    applyFilters();
  };

  const applyFilters = () => {
    onFilterChange({
      category: selectedCategory,
      farmingMethod: selectedFarmingMethod,
      priceRange,
      deliveryOnly,
      pickupOnly
    });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedFarmingMethod('');
    setPriceRange([minPrice, maxPrice]);
    setDeliveryOnly(false);
    setPickupOnly(false);
    onFilterChange({
      category: '',
      farmingMethod: '',
      priceRange: [minPrice, maxPrice],
      deliveryOnly: false,
      pickupOnly: false
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                selectedCategory === category 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Farming Methods */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Farming Method</h3>
        <div className="space-y-2">
          {farmingMethods.map(method => (
            <button
              key={method}
              onClick={() => handleFarmingMethodChange(method)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                selectedFarmingMethod === method 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Price Range</h3>
        <div className="px-2">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Delivery Options */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Delivery Options</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={deliveryOnly}
              onChange={(e) => handleDeliveryChange(e.target.checked)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="text-sm text-gray-600">Delivery Only</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={pickupOnly}
              onChange={(e) => handlePickupChange(e.target.checked)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="text-sm text-gray-600">Pickup Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}; 