// CartSummary.tsx
import { Button } from "@/components/ui/button";
interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
    onCheckout: () => void;
  }
  
  export function CartSummary({ subtotal, shipping, total, onCheckout }: CartSummaryProps) {
    return (
      <div className="p-4 border rounded-md">
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal:</p>
            <p className="text-sm font-medium">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Shipping:</p>
            <p className="text-sm font-medium">${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <p className="text-sm font-semibold">Total:</p>
            <p className="text-sm font-semibold">${total.toFixed(2)}</p>
          </div>
        </div>
        <Button className="mt-4 w-full" onClick={onCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    );
  }
  
 