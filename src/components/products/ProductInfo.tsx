'use client';

import { useState } from 'react';
import { Rating } from '../ui/rating';
import { HeartIcon, UpdateIcon } from '@radix-ui/react-icons';
import { TruckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ProductInfo = () => {
    const [quantity, setQuantity] = useState(1);
    const [isWishlist, setIsWishlist] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const t = useTranslations('Products');

    return (
        <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl font-medium text-black">{t('productName')}</h1>

            {/* Rating and Stock Status */}
            <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                    <Rating
                        value={4 as number & { __brand: 'ValidRating' }}
                        max={5}
                        readOnly
                        aria-label={t('rating.aria')}
                    />
                    <span className="text-gray-500">{t('rating.reviews', { count: 150 })}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">{t('stock.inStock')}</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-medium text-black">
                $192.00
            </div>

            {/* Description */}
            <div className="border-b border-gray-200">
                <p className="text-gray-500 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio.
                </p>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-3 ">
                {/* Quantity Selector */}
                <div className="flex items-center mt-[8rem]">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className={`
                            w-10 h-10 flex items-center justify-center border border-r-2 border-gray-300 rounded-l hover:bg-gray-50
                            ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        disabled={quantity === 1}
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
                        className="w-12 h-10 border-y border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className={`
                            w-10 h-10 flex items-center justify-center border border-l-2 border-gray-300 rounded-r hover:bg-gray-50
                            ${quantity > 1 ? 'bg-[#375B42] text-white-dark hover:bg-[#375B42]/90' : ''}
                        `}
                    >
                        +

                    </button>
                </div>

                {/* Buy Now Button */}
                <button className="mt-[8rem] flex-1 h-10 bg-[#375B42] text-white-dark rounded hover:bg-[#375B42]/90 transition-colors">
                    {t('buttons.buyNow')}
                </button>

                {/* Wishlist Button */}
                <button
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`
                        w-10 h-10 flex items-center justify-center rounded
                        transition-all duration-300 mt-[8rem]
                        ${isWishlist 
                          ? 'bg-[#375B42] border-[#375B42] hover:bg-white hover:border-[#375B42] border' 
                          : 'bg-white border-gray-300 hover:bg-[#375B42] hover:border-[#375B42] border'
                        }
                    `}
                >
                    <HeartIcon 
                        className={`
                            w-5 h-5 transition-colors duration-300
                            ${isWishlist

                                ? isHover 
                                  ? 'text-[#375B42]'  // Wishlist activo + hover
                                  : 'text-white-dark' // Wishlist activo sin hover
                                : isHover
                                  ? 'text-white-dark' // No activo + hover
                                  : 'text-[#000000]'  // No activo sin hover
                            }
                        `}
                    />
                </button>

            </div>


            {/* Delivery Info */}
            <div className="">
    {/* Free Delivery */}
    <div className="border border-gray-200 rounded-lg p-4 mt-12">
        <h3 className="font-medium text-black">{t('delivery.free')}</h3>
        <button className="text-black text-left underline hover:no-underline text-xs">
            {t('delivery.checkPostalCode')}
        </button>
    </div>

    {/* Return Delivery */}
    <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-black">{t('returns.title')}</h3>
        <div className="text-sm">
            <span className="text-gray-500">{t('returns.description')} </span>
            <button className="text-black underline hover:no-underline text-xs">
                {t('returns.details')}
            </button>
        </div>
    </div>
</div>
        </div>
    );
};

export default ProductInfo;