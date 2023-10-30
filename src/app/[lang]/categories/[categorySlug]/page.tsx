import Link from "next/link";

import { ProductCard } from "~/components/cards/product-card";
import { PageLayout } from "~/components/layouts/page-layout";
import { getApolloClient } from "~/graphql/apollo-client";
import { CategoryDetailDocument, CategoryDetailQuery } from "~/graphql/generated/graphql";
import { getTranslations, localizedRoute } from "~/i18n";

export interface CategoryDetailProps {
  params: {
    categorySlug: string;
    lang: string;
  };
}

export default async function CategoryDetailPage({
  params: { categorySlug, lang },
}: CategoryDetailProps) {
  const apolloClient = getApolloClient();
  const t = getTranslations(lang);

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
            <Link href={localizedRoute("/", lang)}>{t("common.home")}</Link>
          </li>
          <li>
            <strong>{category?.categoryName}</strong>
          </li>
        </ul>
      </div>
      <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productCollection?.items.map((product) =>
          product ? <ProductCard lang={lang} product={product} key={product.slug} /> : null
        )}
        {!productCollection?.items?.length && <h2>{t("categories.noProductsFound")}</h2>}
      </div>
    </PageLayout>
  );
}
