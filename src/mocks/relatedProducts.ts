import { Product } from '@/types/product';

export const mockProducts: Product[] = [
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
  // ... resto de los productos ...
]; 