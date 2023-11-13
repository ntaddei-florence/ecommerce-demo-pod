import { match as matchLocale } from "@formatjs/intl-localematcher";

import { LocalizedAkeneoField } from "./types";
import { i18nConfig } from "~/i18n";

const { i18n } = i18nConfig;
export function getLocalizedFieldValue(fields: LocalizedAkeneoField[], lang: string) {
  const localizedItem = fields.find((f) => f.locale === lang);
  if (localizedItem) return localizedItem;

  const nullLocaleItem = fields.find((f) => f.locale === null);
  if (nullLocaleItem) return nullLocaleItem;

  // locales should be in form "xx-XX" not "xx_XX"
  // until they're not sanitized server-side, we must keep this map to allow for matching and
  // retrieval of the correct value
  const sanitizedLocalesMap: Record<string, string> = {};
  const availableLocales = fields
    .map((f) => {
      if (!f.locale) return null;
      const sanitizedValue = f.locale?.replace(/_/g, "-");
      sanitizedLocalesMap[sanitizedValue] = f.locale;
      return sanitizedValue;
    })
    .filter(Boolean) as string[];

  const matchedLocale = matchLocale(i18n.locales, availableLocales, i18n.defaultLocale);
  const matchedLocaleItem = fields.find((f) => f.locale === sanitizedLocalesMap[matchedLocale]);

  if (matchedLocaleItem) return matchedLocaleItem;

  return null;
}
