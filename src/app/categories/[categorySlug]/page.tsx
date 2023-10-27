import Link from "next/link";

import { ProductCard } from "~/components/cards/product-card";
import { PageLayout } from "~/components/layouts/page-layout";
import { getApolloClient } from "~/graphql/apollo-client";
import { CategoryDetailDocument, CategoryDetailQuery } from "~/graphql/generated/graphql";

export interface CategoryDetailProps {
  params: {
    categorySlug: string;
  };
}

export default async function CategoryDetailPage({
  params: { categorySlug },
}: CategoryDetailProps) {
  const apolloClient = getApolloClient();

  const {
    data: { productCollection, categoryCollection },
  } = await apolloClient.query<CategoryDetailQuery>({
    query: CategoryDetailDocument,
    variables: { slug: categorySlug },
  });

  const category = categoryCollection?.items[0];

  return (
    <PageLayout>
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <strong>{category?.categoryName}</strong>
          </li>
        </ul>
      </div>
      <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productCollection?.items.map((product) =>
          product ? <ProductCard product={product} key={product.slug} /> : null
        )}
        {!productCollection?.items?.length && <h2>No products found for this category</h2>}
      </div>
    </PageLayout>
  );
}
