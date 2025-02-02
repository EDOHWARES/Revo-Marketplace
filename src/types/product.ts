type DiscountPercentage = number & { __brand: 'DiscountPercentage' };

export function isValidDiscount(value: number): value is DiscountPercentage {
  return value >= 0 && value <= 100;
}

type Rating = number & { __brand: 'Rating' };

export function isValidRating(value: number): value is Rating {
  return value >= 0 && value <= 5;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    unit: string;
  };
  discount: number;
  farmer: {
    id: string;
    name: string;
    farmName: string;
    location: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
  category: string;
  subCategory: string;
  images: string[];
  stockQuantity: number;
  harvestDate: Date;
  certifications: string[];
  seasonality: string[];
  farmingMethod: string;
  availableForDelivery: boolean;
  pickupAvailable: boolean;
  rating: number;
}
