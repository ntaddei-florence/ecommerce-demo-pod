import { dictionaries, Dictionary, SupportedLanguages } from "./config";
import { NestedPath } from "./types";

type SubDictionary = string | { [key: string]: SubDictionary };

function getDictionaryKey(key: NestedPath<Dictionary>, dictionary: Dictionary) {
  const keyParts = key.split(".");
  let node: SubDictionary = dictionary;
  let keyPart: string | undefined;
  do {
    keyPart = keyParts.shift();
    if (typeof node === "string") {
      // reached a leaf node
      return node;
    } else if (keyPart !== undefined && node !== undefined) {
      // we can keep navigating the subdictionary tree
      node = node[keyPart];
    } else break; // node is not a string, but we reached the end of key
  } while (node);

  return "";
}

export function formatTemplate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return Object.keys(params).reduce((acc, cur) => {
    const value = params[cur];
    const valueAsString = typeof value === "string" ? value : value.toString();
    return acc.replace(new RegExp(`{{${cur}}}`), valueAsString);
  }, template);
}

export function getTranslations(lng: string) {
  const dict = dictionaries[lng as SupportedLanguages];
  return (key: NestedPath<Dictionary>, params?: Record<string, string | number>) => {
    const template = getDictionaryKey(key, dict);
    return formatTemplate(template, params);
  };
}

export function localizedRoute(route: string, lang: string) {
  if (route.startsWith(`/${lang}`)) {
    return route;
  } else {
    return `/${lang}${route === "/" ? "" : route}`;
  }
}
