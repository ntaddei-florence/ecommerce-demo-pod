"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

import { Loader } from "~/app/loading";
import { CategorySearchItem } from "~/components/search/category-search-item";
import { ProductSearchItem } from "~/components/search/product-search-item";
import { useSearch } from "~/hooks/use-search";
import { Dictionary, NestedPath, useClientI18n } from "~/i18n";

export function Search() {
  const { searchInput, setSearchInput, query, productHits, categoryHits, isLoading } = useSearch();
  const { t } = useClientI18n();

  const hitsCount = (productHits?.length ?? 0) + (categoryHits?.length ?? 0);
  const resultsCountKey = useMemo<NestedPath<Dictionary>>(() => {
    switch (hitsCount) {
      case 0:
        return "search.noResults";
      case 1:
        return "search.resultsCount";
      default:
        return "search.resultsCount_many";
    }
  }, [hitsCount]);

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="container max-w-2xl mx-auto">
        <label htmlFor="search-input" className="relative">
          <MagnifyingGlassIcon className="text-gray-400 pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={`i.e. "smartphone"`}
            id="search-input"
            className="form-input w-full input input-bordered rounded-lg"
          />
        </label>
      </div>

      <div>
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
        {query && !isLoading && (
          <div className="text-center text-xl mb-2">
            {t(resultsCountKey, { count: hitsCount ?? 0, query: query ?? "" })}
          </div>
        )}

        {(productHits ?? []).length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">{t("search.productsSectionTitle")}</h2>
            {productHits?.map((productItem) => (
              <ProductSearchItem {...productItem} key={productItem.objectID} />
            ))}
          </div>
        )}

        {(categoryHits ?? []).length > 0 && (
          <div className="flex flex-col gap-6 mt-8">
            <h2 className="text-2xl font-semibold">{t("search.categoriesSectionTitle")}</h2>
            {categoryHits?.map((categoryItem) => (
              <CategorySearchItem {...categoryItem} key={categoryItem.objectID} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
