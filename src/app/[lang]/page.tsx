import { CategoryCard } from "~/components/cards/category-card";
import { getApolloClient } from "~/graphql/apollo-client";
import { AllCategoriesDocument, AllCategoriesQuery } from "~/graphql/generated/graphql";

export interface HomePageProps {
  params: {
    lang: string;
  };
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
  const apolloClient = getApolloClient();
  const {
    data: { categoryCollection },
  } = await apolloClient.query<AllCategoriesQuery>({ query: AllCategoriesDocument });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
      {categoryCollection?.items.map((category) =>
        category ? <CategoryCard lang={lang} category={category} key={category.slug} /> : null
      )}
    </div>
  );
}
