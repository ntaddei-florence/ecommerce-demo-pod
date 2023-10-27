import { dictionaries, Dictionary, SupportedLanguages } from "./config";
import { NestedPath } from "./types";

type SubDictionary = string | { [key: string]: SubDictionary };

export function getDictionary(locale: SupportedLanguages) {
  return dictionaries[locale];
}

function getDictionaryKey(key: NestedPath<Dictionary>, dictionary: Dictionary) {
  const keyParts = key.split(".");
  let node: SubDictionary = dictionary;
  let keyPart: string | undefined;
  do {
    keyPart = keyParts.shift();
    if (typeof node === "string") {
      // reached a leaf node
      return node;
    } else if (keyPart !== undefined) {
      // we can keep navigating the subdictionary tree
      node = node[keyPart];
    } else break; // node is not a string, but we reached the end of key
  } while (node);

  return "";
}

export function getTranslations(lng: string) {
  const dict = getDictionary(lng as SupportedLanguages);
  return (key: NestedPath<Dictionary>) => getDictionaryKey(key, dict);
}
