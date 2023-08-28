import { getClient } from "~/graphql/apollo-client";
import { ProductDetailDocument } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  params: {
    productSlug: string;
  };
}

export default async function ProductDetailPage({ params: { productSlug } }: ProductDetailProps) {
  const client = getClient();

  const {
    data: { productCollection },
  } = await client.query({
    query: ProductDetailDocument,
    variables: { slug: productSlug },
  });

  const product = productCollection?.items[0];
  // TODO handle missing product

  return (
    <div>
      <div className="prose pb-4">
        <h2>{product?.name}</h2>
      </div>
      <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {product?.variantsCollection?.items.map((variant) =>
          variant ? <pre key={variant.sku}>{JSON.stringify(variant, null, 2)}</pre> : null
        )}
      </div>
    </div>
  );
}
