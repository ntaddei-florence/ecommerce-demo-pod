"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useSearchProducts } from "~/hooks/useSearchProducts";
import { useClientI18n } from "~/i18n/hooks";

export function Search() {
  const { searchString, setSearchString, searchHits, isLoading } = useSearchProducts();
  const { t } = useClientI18n();

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

      <div className="">
        {!searchHits.length && searchString && !isLoading && (
          <div className="text-center text-xl">{t("search.noResults", { searchString })}</div>
        )}

        {searchHits.map((hit) => (
          <div className="p-4" key={hit.objectID}>
            <h3>{hit.fields?.internalName?.["en-US"]}</h3>
            <p>{hit?.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
