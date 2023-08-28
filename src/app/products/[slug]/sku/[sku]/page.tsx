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
      <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {!variant && <h2>Product variant not found</h2>}
      </div>
    </div>
  );
}
