import { getCategoryIndex, searchClient } from "~/algolia";
import { CategoryIndexData } from "~/algolia/types";
import { CategoryCard } from "~/components/cards/category-card";

export interface HomePageProps {
  params: {
    lang: string;
  };
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
  const { hits: categories } = await getCategoryIndex(searchClient).search<CategoryIndexData>("");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
      {categories.map((category) =>
        category ? <CategoryCard lang={lang} category={category} key={category.slug} /> : null
      )}
    </div>
  );
}
