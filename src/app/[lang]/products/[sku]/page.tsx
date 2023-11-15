import { ProductDetail } from "../product-detail";
import { getCategoryIndex, getProductIndex, searchClient } from "~/algolia";
import { filterIndex } from "~/algolia/filters";
import { CategoryIndexData, ProductIndexData } from "~/algolia/types";
import { PageLayout } from "~/components/layouts/page-layout";
import { getTranslations } from "~/i18n";

export interface ProductDetailProps {
  params: {
    sku: string;
    lang: string;
  };
  searchParams: {
    category: string;
  };
}

export default async function ProductDetailPage({
  params: { lang, sku },
  searchParams: { category: categoryCode },
}: ProductDetailProps) {
  const t = getTranslations(lang);

  const { hits } = await filterIndex<ProductIndexData>("sku", sku, getProductIndex(searchClient));
  const product = hits[0];

  const { hits: categoryHits } = await filterIndex<CategoryIndexData>(
    "code",
    categoryCode,
    getCategoryIndex(searchClient)
  );

  const category = categoryHits[0];

  return (
    <PageLayout>
      {!product ? (
        <h2>{t("products.productNotFound")}</h2>
      ) : (
        <ProductDetail lang={lang} product={product} category={category} />
      )}
    </PageLayout>
  );
}
