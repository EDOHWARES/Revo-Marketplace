import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";

const ProductPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="text-gray-600 text-sm mb-6">
        <span className="hover:text-gray-900 cursor-pointer">Home</span> 
        <span className="mx-2">/</span> 
        <span className="hover:text-gray-900 cursor-pointer">Products</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Café</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Product Images */}
        <div className="w-full">
          <ProductGallery />
        </div>

        {/* Right Column - Product Info */}
        <div className="w-full">
          <ProductInfo />
        </div>
      </div>

      {/* Related Items Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">Related Products</h2>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductPage;