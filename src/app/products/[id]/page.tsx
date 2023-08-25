import { getClient } from "~/graphql/apollo-client";
import { ProductDetailDocument } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params: { id } }: ProductDetailProps) {
  const client = getClient();

  const {
    data: { product },
  } = await client.query({
    query: ProductDetailDocument,
    variables: { id: (id ?? "") as string },
  });

  return (
    <div>
      <div className="prose">
        <h2>{product?.name}</h2>
      </div>
      <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {product?.variantsCollection?.items.map((variant) =>
          variant ? <pre key={variant.sys.id}>{JSON.stringify(variant, null, 2)}</pre> : null
        )}
      </div>
    </div>
  );
}
