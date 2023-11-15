import { SearchIndex } from "algoliasearch";

export async function filterIndex<T>(key: keyof T, value: string, index: SearchIndex) {
  const result = await index.search<T>("", {
    filters: `${String(key)}:${value}`,
  });

  return result;
}
