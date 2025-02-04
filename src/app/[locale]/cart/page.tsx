 'use client';
 // page.tsx
 import { Card, CardContent } from "@/components/ui/card"; // shadcn UI components
 import CartItem from "@/components/cart/cartItem";
 import CartSummary from "@/components/cart/cartSummary";
 import { useCartStore } from "@/store/cartStore/store"; // Zustand store is implemented in the store folder
 
 const CartPage = () => {
   //const {} = useCartStore();
 
   const handleCheckout = () => {
     // Logic for handling checkout
     console.log("Proceeding to checkout");
   };
 
   return (
     <div className="container mx-auto p-6 space-y-6">
       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
 
       {/* Cart Section */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
         {/* Cart Items Section */}
         <div className="col-span-4">
           
             <CartItem />
           
         </div>
 
         {/* Cart Summary Section */}
         <div>
           
             <CartSummary />
          
         </div>
       </div>
     </div>
   );
 };
 
 export default CartPage;








 