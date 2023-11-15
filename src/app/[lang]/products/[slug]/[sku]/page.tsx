import { ProductDetail } from "../../product-detail";
import { PageLayout } from "~/components/layouts/page-layout";
import { getTranslations } from "~/i18n";

export interface ProductDetailProps {
  params: {
    slug: string;
    sku: string;
    lang: string;
  };
}

export default async function ProductDetailPage({ params: { lang } }: ProductDetailProps) {
  const t = getTranslations(lang);

  const product = null;
  const variant = null;

  return (
    <PageLayout>
      {!variant ? (
        <h2>{t("products.productVariantNotFound")}</h2>
      ) : !product ? (
        <h2>{t("products.productNotFound")}</h2>
      ) : (
        <ProductDetail lang={lang} product={product} />
      )}
    </PageLayout>
  );
}
