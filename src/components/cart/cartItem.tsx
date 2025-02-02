'use client';
// CartItem.tsx


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter, } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore/store";
import { useRouter } from 'next/navigation';




interface CartItem {
  quantity: number;
  id: number;
  name: string;
  price: {
    amount: number;
    unit: string;
  },
  images:string;
}



const CartItem = () => {
  const router = useRouter(); 
  const {Items, updateQuantity, clearCart} = useCartStore((state) => state)
  const handleQuantityChange = (id: number, quantity: number) => {
    try {
        updateQuantity(id, quantity);
       } catch (err) {
        console.error(`Failed to update quantity for item ${id}:`, err);  
      }
  };

  return (
    <div className="border-0">

      <Card className="flex items-center justify-between px-10 py-4 mb-4 ">
        <div className=''>
          <h1>Products</h1>
        </div>
        <div className='md:ml-10 sm:ml-0'>
          <h1>Price</h1>
        </div>
        <div className=''>
          <h1>Quantity</h1>
        </div>
        <div className=''>
          <h1>Subtotal</h1>
        </div>
  

      </Card>


      <div>
        {Items.length > 0 ? (Items.map((item) => (
          
              <Card key={item.id} className="flex items-center justify-between px-8 py-4 mb-4">
                <div className="flex md:flex-row items-center">
                    {/*<img src={item.images} alt='product image'  className="h-16 w-16 rounded-md object-cover"/>*/}
                    <Image 
                      src={item.images} 
                      alt={`${item.name} image`}
                      className="rounded-md object-cover h-16 w-16"
              
                    />
                    <p>{item.name}</p>

                </div>
                <div className="flex items-center ">
                  <p>{item.price.unit}</p>
                  <p>{item.price.amount}</p>
                </div>
                <div>
                  <Select
                  defaultValue={item.quantity.toString()}
                  onValueChange={(value) => handleQuantityChange(item.id, parseInt(value))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  </Select>
                </div>
                <div>
                    <p>{item.price.amount * item.quantity}</p>
                </div>
               
               
        
              </Card>
        ))) : null}

      </div>
      <div className='flex justify-between'>
      <Button variant="outline" className="px-10 py-6" onClick={() => router.push('/shop')}>Return to shop</Button>
      <Button variant="outline" className="px-10 py-6"  onClick={() => clearCart()}>Update Cart</Button>
      </div>
    </div>
  );
};

export default CartItem;


