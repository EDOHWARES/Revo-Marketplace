//CartItems
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CartItemProps {
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({
  productName,
  productImage,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className="">
    <div className="flex items-center justify-between py-4 border-b pr-8 pl-8">
      {/* Product Details */}
      <div className="flex items-center space-x-4">
        <img
          src={productImage}
          alt={productName}
          className="h-16 w-16 rounded-md object-cover"
        />
        <div>
          <p className="text-sm font-medium">{productName}</p>
        </div>
      </div>

      {/* Price */}
      <p className="text-sm">${price.toFixed(2)}</p>

      {/* Quantity */}
      <Select
        value={quantity.toString()}
        onValueChange={(value) => onQuantityChange(Number(value))}
      >
        <SelectTrigger className="w-16">
          <SelectValue placeholder="Qty" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(10)].map((_, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Subtotal */}
      <p className="text-sm font-medium">${(price * quantity).toFixed(2)}</p>

      {/* Remove Button */}
      {/*<Button variant="ghost" size="sm" onClick={onRemove}>
        Remove
      </Button>*/}
    </div>
    </div>
  );
}



// Cart Page
import { CartItem } from "@/components/cart/cartItem";
import { CartSummary } from "@/components/cart/cartSummary";
import { useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cafe",
      image: "/cafe.jpg",
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: "Cafe",
      image: "/cafe.jpg",
      price: 100,
      quantity: 2,
    },
  ]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0; // Replace with actual calculation if needed
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-24 py-8 space-y-8">
      {/* Cart Items */}
      <div className="space-y-4 border-2 border-blue-50">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            productName={item.name}
            productImage={item.image}
            price={item.price}
            quantity={item.quantity}
            onQuantityChange={(quantity) =>
              handleQuantityChange(item.id, quantity)
            }
            onRemove={() => handleRemove(item.id)}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="w-[50%]">
      <CartSummary
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onCheckout={() => alert("Proceeding to checkout...")}
      />
      </div>

    </div>
  );
}



//Store
import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
  total: 0,
}));

// cart summary