import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";

const ProductPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl font-sans">
      {/* Breadcrumb */}
      <div className="text-gray-600 text-sm mb-6">
        <span className="hover:text-gray-900 cursor-pointer">Home</span> 
        <span className="mx-2">/</span> 
        <span className="hover:text-gray-900 cursor-pointer">Products</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Café</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="w-full">
          <ProductGallery />
        </div>

        <div className="w-full">
          <ProductInfo />
        </div>
      </div>

      <div className="mt-16 mb-32">
        <div className="flex justify-start items-center gap-4 mb-[4rem]">
          <div className="w-[20px] h-[40px] rounded bg-[#375B42]"></div>
          <h2 className="text-base font-semibold text-[#375B42]">Related item</h2>
        </div>
        <RelatedProducts />

      </div>

    </div>

  );
};

export default ProductPage;