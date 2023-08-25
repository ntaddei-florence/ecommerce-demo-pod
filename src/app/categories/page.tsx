import { CategoryCard } from "~/components/cards";
import { getClient } from "~/graphql/apollo-client";
import { AllCategoriesDocument, AllCategoriesQuery } from "~/graphql/generated/graphql";

export default async function Page() {
  const client = getClient();
  const {
    data: { categoryCollection },
  } = await client.query<AllCategoriesQuery>({ query: AllCategoriesDocument });

  return (
    <div className="grid grid-cols-4 gap-4">
      {categoryCollection?.items.map((category) =>
        category ? <CategoryCard category={category} key={category.sys.id} /> : null
      )}
    </div>
  );
}
