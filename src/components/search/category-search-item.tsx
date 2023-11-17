"use client";

import Link from "next/link";

import { CategoryImage } from "../cards/category-image";
import { getLocalizedFieldValue } from "~/akeneo/utils";
import { CategoryIndexData } from "~/algolia/types";
import { useClientI18n } from "~/i18n";

export function CategorySearchItem(category: CategoryIndexData) {
  const { objectID, values, image, slug } = category;
  const { lang, localizedRoute } = useClientI18n();

  return (
    <div
      className="border border-light rounded-lg shadow flex flex-col sm:flex-row gap-4 overflow-hidden"
      key={objectID}
    >
      <div>
        {/* TODO missing image placeholder */}
        {image && (
          <div className="w-48 h-48">
            <CategoryImage className="aspect-square object-cover" category={category} lang={lang} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-between p-4">
        <div>
          <Link
            href={localizedRoute(`/categories/${slug}`)}
            className="text-xl font-semibold pb-1 link link-primary"
          >
            {getLocalizedFieldValue(values.name, lang)?.data}
          </Link>
          <h4 className="mt-4">{getLocalizedFieldValue(values.description, lang)?.data}</h4>
        </div>
      </div>
    </div>
  );
}
