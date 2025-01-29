'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore/store";

const CartSummary = () => {
  const { subtotal, shipping, total, calculateSummary } = useCartStore();

  // Ensure the summary is recalculated when the component loads
  React.useEffect(() => {
    calculateSummary();
  }, [calculateSummary]);

  return (
    <Card className='border-4 border-black'>
      <CardHeader>
        <h2 className="text-lg font-bold">Cart Summary</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#375B42]">Proceed to Checkout</Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;



