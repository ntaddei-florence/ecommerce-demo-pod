import { CategoryCard } from "~/components/cards/category-card";
import { getApolloClient } from "~/graphql/apollo-client";
import { AllCategoriesDocument, AllCategoriesQuery } from "~/graphql/generated/graphql";

export default async function HomePage() {
  const apolloClient = getApolloClient();
  const {
    data: { categoryCollection },
  } = await apolloClient.query<AllCategoriesQuery>({ query: AllCategoriesDocument });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
      {categoryCollection?.items.map((category) =>
        category ? <CategoryCard category={category} key={category.slug} /> : null
      )}
    </div>
  );
}
