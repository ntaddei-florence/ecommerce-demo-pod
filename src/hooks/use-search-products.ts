import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getProductIndex, searchClient } from "~/algolia";
import { ProductIndexData } from "~/algolia/types";

const QUERYSTRING_KEY = "q";

export function useSearchProducts() {
  const queryParams = useSearchParams();

  const query = queryParams.get(QUERYSTRING_KEY);
  const [searchInput, setSearchInput] = useState(query ?? "");
  const [searchHits, setSearchHits] = useState<ProductIndexData[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  const search = useCallback(() => {
    setLoading(true);
    if (!query) {
      setSearchHits(null);
    } else {
      getProductIndex(searchClient)
        .search<ProductIndexData>(query)
        .then(({ hits }) => {
          setSearchHits(hits);
        })
        .catch((e) => {
          console.error(e);
          setSearchHits([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  const router = useRouter();
  const pathname = usePathname();

  const debouncedSetQueryString = useRef(
    debounce((query: string) => {
      const current = new URLSearchParams(Array.from(queryParams.entries()));
      if (query) {
        current.set(QUERYSTRING_KEY, query);
      }
      const search = current.toString();
      router.push(`${pathname}${search ? `?${search}` : ""}`);
    }, 500)
  );

  useEffect(() => {
    debouncedSetQueryString.current(searchInput);
  }, [searchInput]);

  useEffect(() => {
    search();
  }, [search]);

  return useMemo(
    () => ({
      query,
      isLoading,
      searchHits,
      searchInput,
      setSearchInput: (query: string) => setSearchInput(query.trimStart()),
    }),
    [isLoading, searchHits, query, searchInput]
  );
}
