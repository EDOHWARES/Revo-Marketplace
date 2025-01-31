import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";

const ProductPage = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mb-4">
        <span>Account</span> / <span>Organic Products</span> / <span className="text-black font-medium">Café</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <ProductGallery/>

        {/* Product Details */}
        <ProductInfo/>
      </div>

      {/* Related Items Section */}      
      <RelatedProducts/>
    </div>
  );
};

export default ProductPage;