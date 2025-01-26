// CartItem.tsx
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
    <div className="flex items-center justify-between py-4 border-b">
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
      <Button variant="ghost" size="sm" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}
