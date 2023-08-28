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
      <div className="prose pb-4">
        <h2>{product?.name}</h2>
        <h3>{variant?.name}</h3>
      </div>
      <div className="not-prose">
        {!(variant && product) ? (
          <h2>Product variant not found</h2>
        ) : (
          <ProductDetail product={product} variant={variant} />
        )}
      </div>
    </div>
  );
}
