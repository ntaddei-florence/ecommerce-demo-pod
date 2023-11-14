import { dictionaries, Dictionary, SupportedLanguages } from "./config";
import { getBestMatchTemplate } from "./context";
import { getPlugins } from "./context-plugins";
import { ContextParams, ContextPlugin, NestedPath, TFunction } from "./types";
import { isDevelopment } from "~/utils/development";

export const getDictionary = (lang: SupportedLanguages) => dictionaries[lang];

export function getTranslationTemplate(
  key: string,
  dictionary: any,
  plugins: ContextPlugin[],
  params?: ContextParams
) {
  const path = key.split(".");

  let node = dictionary;
  do {
    const nextKey = path.shift();
    if (!nextKey) break;
    const nextNode = (node as any)[nextKey];
    if (typeof nextNode === "string") return nextNode;
    else node = nextNode;
  } while (node);

  if (node === undefined) return "";

  return getBestMatchTemplate(params ?? {}, node as unknown as Record<string, string>, plugins);
}

export function format(
  template: string,
  params?: ContextParams,
  removeEmpty = true,
  warnMissing = true
) {
  let formattedTemplate = template;
  Object.entries(params ?? {}).forEach(([key, value]) => {
    formattedTemplate = formattedTemplate.replace(
      new RegExp(`{{${key}}}`, "g"),
      value?.toString() ?? ""
    );
  });

  const missingParams = formattedTemplate
    .match(/\{\{([^}]+)\}\}/g)
    ?.map((mp) => mp.replace(/\{/g, "").replace(/}/g, ""));

  if (missingParams) {
    if (warnMissing) console.warn(`Missing params on ${template}: ${missingParams.join(", ")}`);
    if (removeEmpty) {
      formattedTemplate = format(
        formattedTemplate,
        missingParams.reduce(
          (acc, cur) => {
            return {
              ...acc,
              [cur]: "",
            };
          },
          {} as Record<string, string>
        )
      );
    }
  }

  return formattedTemplate;
}

export const t: TFunction = (
  lang: SupportedLanguages,
  key: NestedPath<Dictionary>,
  params: ContextParams = {},
  removeEmpty = true
) => {
  const template = getTranslationTemplate(key, getDictionary(lang), getPlugins(lang), params);
  const formattedTemplate = format(template, params, removeEmpty, isDevelopment());

  return formattedTemplate;
};

export function getTranslations(lang: SupportedLanguages) {
  return (key: NestedPath<Dictionary>, params: ContextParams = {}, removeEmpty = true) =>
    t(lang, key, params, removeEmpty);
}
