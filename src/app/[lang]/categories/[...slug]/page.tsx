import Link from "next/link";
import React from "react";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { getCategoryIndex, getProductIndex, searchClient } from "~/algolia";
import { filterIndex } from "~/algolia/filters";
import { CategoryIndexData, ProductIndexData } from "~/algolia/types";
import { ProductCard } from "~/components/cards/product-card";
import { PageLayout } from "~/components/layouts/page-layout";
import { getTranslations, localizedRoute } from "~/i18n";

export interface CategoryDetailProps {
  params: {
    slug: string[];
    lang: string;
  };
}

export default async function CategoryDetailPage({ params: { slug, lang } }: CategoryDetailProps) {
  const t = getTranslations(lang);

  const categorySlug = slug[0];

  const { hits: categoryHits } = await filterIndex<CategoryIndexData>(
    "slug",
    categorySlug,
    getCategoryIndex(searchClient)
  );

  const { hits: productsHits } = await getProductIndex(searchClient).search<ProductIndexData>(
    `|${categorySlug}|`,
    {
      restrictSearchableAttributes: ["categories"],
    }
  );

  const category = categoryHits[0];
  const categoryName =
    category?.values.name && getLocalizedFieldValue(category.values.name, lang)?.data;

  return (
    <PageLayout>
      {category ? (
        <>
          <div className="text-lg breadcrumbs mb-10">
            <ul>
              <li>
                <Link href={localizedRoute("/", lang)}>{t("common.home")}</Link>
              </li>
              <li>
                <strong>{categoryName}</strong>
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-2">{categoryName}</h2>
            <h3 className="text-xl">
              {getLocalizedFieldValue(category.values.description, lang)?.data}
            </h3>
          </div>

          <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {productsHits.map((product) =>
              product ? (
                <ProductCard key={product.sku} lang={lang} product={product} category={category} />
              ) : null
            )}
            {!productsHits?.length && <h2>{t("categories.noProductsFound")}</h2>}
          </div>
        </>
      ) : (
        // TODO: i18n
        <p>Category not found</p>
      )}
    </PageLayout>
  );
}
