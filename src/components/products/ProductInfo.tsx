'use client';

import { useState } from 'react';

const ProductInfo = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-semibold">Café</h1>
            
            {/* Rating and Stock */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                        {'★'.repeat(4)}{'☆'.repeat(1)}
                    </div>
                    <span>(150 Reviews)</span>
                </div>
                <span>|</span>
                <span>In Stock</span>
            </div>

            {/* Price */}
            <div className="text-2xl">$192.00</div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio.
            </p>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded">
                    <button 
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        −
                    </button>
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) setQuantity(Math.max(1, val));
                        }}
                        className="w-12 text-center border-x border-gray-300 py-2"
                    />
                    <button 
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        +
                    </button>
                </div>

                {/* Buy Now Button */}
                <button className="flex-1 bg-green-700 text-white py-2 px-6 rounded hover:bg-green-800">
                    Buy Now
                </button>

                {/* Wishlist Button */}
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                    ♡
                </button>
            </div>

            {/* Delivery Info Cards */}
            <div className="space-y-3 pt-6">
                {/* Free Delivery */}
                <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🚚</span>
                        <div>
                            <h3 className="font-medium">Free Delivery</h3>
                            <p className="text-sm text-gray-500">
                                Enter your postal code for Delivery Availability
                            </p>
                        </div>
                    </div>
                </div>

                {/* Return Delivery */}
                <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">↩️</span>
                        <div>
                            <h3 className="font-medium">Return Delivery</h3>
                            <div className="text-sm text-gray-500">
                                Free 30 Days Delivery Returns. <span className="text-gray-800 underline cursor-pointer">Details</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;