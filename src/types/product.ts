export interface Product {
    id: number;
    name: string;
    description: string;
    price: {
      amount: number;
      unit: string;
    };
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
  } 