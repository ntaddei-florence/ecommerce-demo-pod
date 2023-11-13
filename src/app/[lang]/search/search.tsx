"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { useSearchProducts } from "~/hooks/use-search-products";
import { useClientI18n } from "~/i18n";

export function Search() {
  const { searchString, setSearchString, searchHits, isLoading } = useSearchProducts();
  const { t, lang, localizedRoute } = useClientI18n();

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="container max-w-2xl mx-auto">
        <label htmlFor="search-input" className="relative">
          <MagnifyingGlassIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder={`i.e. "smartphone"`}
            id="search-input"
            className="form-input w-full input input-bordered rounded-lg"
          />
        </label>
      </div>

      <div>
        {!searchHits?.length && searchString && !isLoading && (
          <div className="text-center text-xl">{t("search.noResults", { searchString })}</div>
        )}

        {searchHits?.length && (
          <p className="mb-4 text-lg">{t("search.resultsCount", { count: searchHits.length })}</p>
        )}

        {searchHits && (
          <div className="flex flex-col gap-3">
            {searchHits.map(({ objectID, values }) => (
              <div className="p-4 border border-light rounded-lg shadow" key={objectID}>
                <Link
                  href={localizedRoute(`/products/${objectID}`)}
                  className="text-xl font-semibold pb-1 link link-primary"
                >
                  {getLocalizedFieldValue(values.name, lang)?.data}
                </Link>
                <h4 className="mt-4">{getLocalizedFieldValue(values.description, lang)?.data}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
