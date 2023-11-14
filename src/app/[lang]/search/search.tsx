"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { useSearchProducts } from "~/hooks/use-search-products";
import { SupportedCurrency, useClientI18n } from "~/i18n";

export function Search() {
  const { searchInput, setSearchInput, query, searchHits, isLoading } = useSearchProducts();
  const { t, lang, localizedRoute, formatPrice } = useClientI18n();

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="container max-w-2xl mx-auto">
        <label htmlFor="search-input" className="relative">
          <MagnifyingGlassIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

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
        {searchInput && !isLoading && (
          <div className="text-center text-xl mb-2">
            {t("search.resultsCount", { count: searchHits?.length ?? 0, query: query ?? "" })}
          </div>
        )}

        {searchHits && (
          <div className="flex flex-col gap-3">
            {searchHits.map(({ objectID, values, image, price }) => (
              <div
                className="p-4 border border-light rounded-lg shadow flex flex-col sm:flex-row gap-4 items-center"
                key={objectID}
              >
                <div>
                  {/* TODO missing image placeholder */}
                  {image?.url && (
                    <Image
                      src={image.url}
                      loader={({ src }) => src} // TODO: remove me
                      width={400}
                      height={300}
                      objectFit="cover"
                      alt=""
                    />
                  )}
                </div>
                <div className="flex flex-col gap-4 justify-between h-full">
                  <div>
                    <Link
                      href={localizedRoute(`/products/${objectID}`)}
                      className="text-xl font-semibold pb-1 link link-primary"
                    >
                      {getLocalizedFieldValue(values.name, lang)?.data}
                    </Link>
                    <h4 className="mt-4">
                      {getLocalizedFieldValue(values.description, lang)?.data}
                    </h4>
                  </div>
                  <div className="w-full flex justify-between items-center gap-2">
                    <div className="flex gap-2 items-center text-lg">
                      {price?.compareAmount && (
                        <p className="line-through">
                          {formatPrice(price.compareAmount, price.currency as SupportedCurrency)}
                        </p>
                      )}
                      {price?.amount && (
                        <p className="font-bold">
                          {formatPrice(price.amount, price.currency as SupportedCurrency)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
