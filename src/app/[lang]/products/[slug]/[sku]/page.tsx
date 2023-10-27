import { ProductDetail } from "../../product-detail";
import { PageLayout } from "~/components/layouts/page-layout";
import { getApolloClient } from "~/graphql/apollo-client";
import { ProductSkuDetailDocument, ProductSkuDetailQuery } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  params: {
    slug: string;
    sku: string;
    lang: string;
  };
}

export default async function ProductDetailPage({
  params: { slug, sku, lang },
}: ProductDetailProps) {
  const apolloClient = getApolloClient();

  const {
    data: { productCollection },
  } = await apolloClient.query<ProductSkuDetailQuery>({
    query: ProductSkuDetailDocument,
    variables: { slug },
  });

  const product = productCollection?.items[0];
  const variant = product?.variantsCollection?.items.find((v) => v?.sku === sku);

  return (
    <PageLayout>
      {!variant ? (
        <h2>Product variant not found</h2>
      ) : !product ? (
        <h2>Product not found</h2>
      ) : (
        <ProductDetail lang={lang} product={product} variant={variant} />
      )}
    </PageLayout>
  );
}
