import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { getCategoryIndex, getProductIndex, searchClient } from "~/algolia";
import { CategoryIndexData, ProductIndexData } from "~/algolia/types";

const QUERYSTRING_KEY = "q";

export function useSearch() {
  const queryParams = useSearchParams();

  const query = queryParams.get(QUERYSTRING_KEY);
  const [searchInput, setSearchInput] = useState(query ?? "");
  const [productHits, setProductHits] = useState<ProductIndexData[] | null>(null);
  const [categoryHits, setCategoryHits] = useState<CategoryIndexData[] | null>(null);
  const [isLoading, setLoading] = useState(!!query);

  const router = useRouter();
  const pathname = usePathname();

  const debouncedSetQueryString = useRef(
    debounce((query: string) => {
      const current = new URLSearchParams(Array.from(queryParams.entries()));
      if (query) {
        current.set(QUERYSTRING_KEY, query);
      } else {
        current.delete(QUERYSTRING_KEY);
      }
      const search = current.toString();
      router.push(`${pathname}${search ? `?${search}` : ""}`);
    }, 500)
  );

  useEffect(() => {
    debouncedSetQueryString.current(searchInput);
  }, [searchInput]);

  useEffect(() => {
    if (!query) {
      setProductHits(null);
      setCategoryHits(null);
    } else {
      setLoading(true);

      Promise.all([
        getProductIndex(searchClient).search<ProductIndexData>(query),
        getCategoryIndex(searchClient).search<CategoryIndexData>(query),
      ])
        .then(([productIndexResult, categoryIndexResult]) => {
          setProductHits(productIndexResult?.hits ?? []);
          setCategoryHits(categoryIndexResult?.hits ?? []);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  return useMemo(
    () => ({
      query,
      isLoading,
      productHits,
      categoryHits,
      searchInput,
      setSearchInput: (query: string) => setSearchInput(query.trimStart()),
    }),
    [isLoading, productHits, categoryHits, query, searchInput]
  );
}
