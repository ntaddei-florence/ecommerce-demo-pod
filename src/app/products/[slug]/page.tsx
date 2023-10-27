import { redirect } from "next/navigation";

import { getApolloClient } from "~/graphql/apollo-client";
import { ProductDetailDocument, ProductDetailQuery } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params: { slug } }: ProductDetailProps) {
  const apolloClient = getApolloClient();

  const {
    data: { productCollection, variantCollection },
  } = await apolloClient.query<ProductDetailQuery>({
    query: ProductDetailDocument,
    variables: { slug },
  });

  const variant = variantCollection?.items[0];
  const product = productCollection?.items[0];

  redirect(`/products/${product?.slug}/${variant?.sku}`);
}
