import { CategoryCard } from "~/components/cards";
import { getApolloClient } from "~/graphql/apollo-client";
import { AllCategoriesDocument, AllCategoriesQuery } from "~/graphql/generated/graphql";

export default async function CategoriesPage() {
  const apolloClient = getApolloClient();
  const {
    data: { categoryCollection },
  } = await apolloClient.query<AllCategoriesQuery>({ query: AllCategoriesDocument });

  return (
    <div className="pt-8">
      <div className="prose pb-4">
        <h2>Categories</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryCollection?.items.map((category) =>
          category ? <CategoryCard category={category} key={category.slug} /> : null
        )}
        {!categoryCollection?.items?.length && <h2>No categories found</h2>}
      </div>
    </div>
  );
}
