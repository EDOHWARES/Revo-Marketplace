 // page.tsx
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
     <div className="container mx-auto px-4 py-8 space-y-8">
       {/* Cart Items */}
       <div className="space-y-4">
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
       <CartSummary
         subtotal={subtotal}
         shipping={shipping}
         total={total}
         onCheckout={() => alert("Proceeding to checkout...")}
       />
     </div>
   );
 }
 