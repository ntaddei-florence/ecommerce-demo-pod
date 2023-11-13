import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getProductIndex, searchClient } from "~/algolia";
import { ProductIndexData } from "~/algolia/types";

export interface UseSearchProductsProps {
  searchString?: string;
}

const QUERYSTRING_KEY = "q";

export function useSearchProducts(params?: UseSearchProductsProps) {
  const [searchString, setSearchString] = useState(params?.searchString ?? "");
  const [searchHits, setSearchHits] = useState<ProductIndexData[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  const queryParams = useSearchParams();

  const search = useCallback(() => {
    const query = queryParams.get(QUERYSTRING_KEY);

    setLoading(true);
    if (!query) {
      setSearchHits(null);
    } else {
      getProductIndex(searchClient)
        .search<ProductIndexData>(query)
        .then(({ hits }) => {
          console.log("hits", hits); // TODO remove me
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
  }, [queryParams]);

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
    debouncedSetQueryString.current(searchString);
  }, [searchString]);

  useEffect(() => {
    search();
  }, [search]);

  return useMemo(
    () => ({
      isLoading,
      searchHits,
      searchString,
      setSearchString: (query: string) => setSearchString(query.trimStart()),
    }),
    [isLoading, searchHits, searchString]
  );
}
