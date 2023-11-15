import Link from "next/link";
import React from "react";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { getCategoryIndex, searchClient } from "~/algolia";
import { CategoryIndexData } from "~/algolia/types";
import { PageLayout } from "~/components/layouts/page-layout";
import { getTranslations, localizedRoute } from "~/i18n";

export interface CategoryDetailProps {
  params: {
    categoryId: string;
    lang: string;
  };
}

export default async function CategoryDetailPage({
  params: { categoryId, lang },
}: CategoryDetailProps) {
  const t = getTranslations(lang);

  const { hits } = await getCategoryIndex(searchClient).search<CategoryIndexData>(categoryId);
  const category = hits[0];

  return (
    <PageLayout>
      {category ? (
        <>
          <div className="text-sm breadcrumbs mb-4">
            <ul>
              <li>
                <Link href={localizedRoute("/", lang)}>{t("common.home")}</Link>
              </li>
              <li>
                <strong>{getLocalizedFieldValue(category.values.name, lang)?.data}</strong>
              </li>
            </ul>
          </div>
          {/* <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
         {productCollection?.items.map((product) =>
           product ? <ProductCard lang={lang} product={product} key={product.slug} /> : null
         )}
         {!productCollection?.items?.length && <h2>{t("categories.noProductsFound")}</h2>}
       </div> */}
        </>
      ) : (
        // TODO: i18n
        <p>Category not found</p>
      )}
    </PageLayout>
  );
}
