import { ProductDetail } from "~/app/products/product-detail";
import { getClient } from "~/graphql/apollo-client";
import { ProductDetailDocument } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params: { slug } }: ProductDetailProps) {
  const client = getClient();

  const {
    data: { productCollection, variantCollection },
  } = await client.query({
    query: ProductDetailDocument,
    variables: { slug },
  });

  const variant = variantCollection?.items[0];
  const product = productCollection?.items[0];

  return (
    <div>
      {!variant ? (
        <h2>Product variant not found</h2>
      ) : !product ? (
        <h2>Product not found</h2>
      ) : (
        <ProductDetail product={product} variant={variant} />
      )}
    </div>
  );
}
