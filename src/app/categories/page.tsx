import { CategoryCard } from "~/components/cards";
import { getClient } from "~/graphql/apollo-client";
import { AllCategoriesDocument } from "~/graphql/generated/graphql";

export default async function CategoriesPage() {
  const client = getClient();
  const {
    data: { categoryCollection },
  } = await client.query({ query: AllCategoriesDocument });

  return (
    <div>
      <div className="prose">
        <h2>Categories</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryCollection?.items.map((category) =>
          category ? <CategoryCard category={category} key={category.slug} /> : null
        )}
      </div>
    </div>
  );
}
