import { ProductDetail } from "~/app/products/product-detail";
import { getClient } from "~/graphql/apollo-client";
import { ProductSkuDetailDocument } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  params: {
    slug: string;
    sku: string;
  };
}

export default async function ProductDetailPage({ params: { slug, sku } }: ProductDetailProps) {
  const client = getClient();

  const {
    data: { productCollection },
  } = await client.query({
    query: ProductSkuDetailDocument,
    variables: { slug },
  });

  const product = productCollection?.items[0];
  const variant = product?.variantsCollection?.items.find((v) => v?.sku === sku);

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
