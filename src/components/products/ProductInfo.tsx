import React from 'react'

const ProductInfo = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold">Café</h1>
            <div className="flex items-center gap-2 text-yellow-500 mt-2">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-5 h-5">⭐️</span>
                ))}
                <span className="text-gray-600 text-sm">(150 Reviews) | In Stock</span>
            </div>

            <p className="text-xl font-semibold mt-3">$192.00</p>
            <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Quantity and Buy Buttons */}
            <div className="flex items-center gap-4 mt-4">
                <button className="bg-gray-200 text-black px-3 py-1 rounded">-</button>
                <span className="font-semibold">2</span>
                <button className="bg-gray-200 text-black px-3 py-1 rounded">+</button>
                <button className="bg-green-700 text-white px-6 py-2 rounded">Buy Now</button>
            </div>

            {/* Delivery Options */}
            <div className="border p-4 mt-4 flex flex-col gap-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <span className="w-5 h-5">🚚</span>
                    <p className="text-black">Free Delivery</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-5 h-5">🔄</span>
                    <p className="text-black">Free 30 Days Returns</p>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo