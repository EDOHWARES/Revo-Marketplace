import React from 'react'
import Image from "next/image";

const ProductGallery = () => {
    return (
        <div className="flex flex-col gap-4">
            <Image src="/coffee-main.png" width={400} height={400} alt="Coffee Bag" className="rounded-lg" />
        </div>
    )
}

export default ProductGallery