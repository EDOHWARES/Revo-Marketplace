import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { useTranslations } from "next-intl";

const ProductPage = () => {
  const t = useTranslations('Products');
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: t('title'), href: '/products' },
    { label: 'cafe', href: '', isCurrent: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl font-sans" aria-label="Products">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Product Layout - Ajustado para mejor responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
        <div className="w-full">
          <ProductGallery />
        </div>

        <div className="w-full">
          <ProductInfo />
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12 lg:mt-16 mb-16 lg:mb-32">
        <div className="flex justify-start items-center gap-4 mb-8 lg:mb-[4rem]">
          <div className="w-[12px] lg:w-[20px] h-[30px] lg:h-[40px] rounded bg-[#375B42]"></div>
          <h2 className="text-base font-semibold text-[#375B42]">{t('relatedItems')}</h2>
        </div>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductPage;