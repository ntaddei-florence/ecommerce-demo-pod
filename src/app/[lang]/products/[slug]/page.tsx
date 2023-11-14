import { redirect } from "next/navigation";

import { getApolloClient } from "~/graphql/apollo-client";
import { ProductDetailDocument, ProductDetailQuery } from "~/graphql/generated/graphql";
import { localizedRoute, SupportedLanguages } from "~/i18n";

export interface ProductDetailProps {
  params: {
    slug: string;
    lang: string;
  };
}

export default async function ProductDetailPage({ params: { slug, lang } }: ProductDetailProps) {
  const apolloClient = getApolloClient();

  const {
    data: { productCollection, variantCollection },
  } = await apolloClient.query<ProductDetailQuery>({
    query: ProductDetailDocument,
    variables: { slug },
  });

  const variant = variantCollection?.items[0];
  const product = productCollection?.items[0];

  redirect(
    localizedRoute(`/products/${product?.slug}/${variant?.sku}`, lang as SupportedLanguages)
  );
}
