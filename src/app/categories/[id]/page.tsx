import { ProductCard } from "~/components/cards/product-card";
import { getClient } from "~/graphql/apollo-client";
import { CategoryDetailDocument } from "~/graphql/generated/graphql";

export interface CategoryDetailProps {
  params: {
    id: string;
  };
}

export default async function CategoryDetailPage({ params: { id } }: CategoryDetailProps) {
  const client = getClient();

  const {
    data: { productCollection, category },
  } = await client.query({
    query: CategoryDetailDocument,
    variables: { id: (id ?? "") as string },
  });

  return (
    <div>
      <div className="prose">
        <h2>{category?.categoryName}</h2>
      </div>
      <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productCollection?.items.map((product) =>
          product ? <ProductCard product={product} key={product.sys.id} /> : null
        )}
      </div>
    </div>
  );
}
