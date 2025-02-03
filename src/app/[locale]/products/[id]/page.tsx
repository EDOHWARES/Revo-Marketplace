import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { useTranslations } from "next-intl";
import { Metadata } from 'next';
import { notFound } from "next/navigation";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const t = useTranslations('Products');
  
  try {
    const product = await getProduct(params.id);

    if (!product) {
      notFound();
    }

    const breadcrumbItems = [
      { label: t('breadcrumb.home'), href: '/' },
      { label: t('title'), href: '/products' },
      { label: product.name, href: '', isCurrent: true }
    ];

    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl font-sans" aria-label="Products">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
          <div className="w-full">
            <ProductGallery images={product.images} />
          </div>
          <div className="w-full">
            <ProductInfo
              price={product.price}
              description={product.description}
              rating={product.rating}
              reviews={product.reviews}
            />
          </div>
        </div>

        <div className="mt-12 lg:mt-16 mb-16 lg:mb-32">
          <div className="flex justify-start items-center gap-4 mb-8 lg:mb-[4rem]">
            <div className="w-[12px] lg:w-[20px] h-[30px] lg:h-[40px] rounded bg-[#375B42]"></div>
            <h2 className="text-base font-semibold text-[#375B42]">{t('relatedItems')}</h2>
          </div>
          <RelatedProducts productId={params.id} />
        </div>
      </div>
    );
  } catch (error) {
    throw new Error('Failed to fetch product data');
  }
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    
    if (!product) {
      return {
        title: 'Product Not Found | Revolutionary Farmers',
        description: 'The requested product could not be found',
      };
    }

    return {
      title: `${product.name} | Revolutionary Farmers`,
      description: product.description,
      openGraph: {
        title: `${product.name} | Revolutionary Farmers`,
        description: product.description,
        images: product.images?.[0] ? [
          {
            url: product.images[0],
            width: 800,
            height: 600,
            alt: product.name,
          },
        ] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Error | Revolutionary Farmers',
      description: 'There was an error loading the product',
    };
  }
}

export default ProductPage;