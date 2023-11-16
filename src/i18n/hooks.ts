import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { i18nConfig } from "./config";
import { getTranslations, localizedRoute } from "./core";
import { formatPrice } from "./prices";
import { SupportedCurrency } from "./types";

export function useClientI18n() {
  const pathname = usePathname();
  const langFromPathName = pathname.split("/")[1];

  const lang =
    langFromPathName &&
    i18nConfig.i18n.locales.find((supportedLanguage) => supportedLanguage === langFromPathName)
      ? langFromPathName
      : i18nConfig.i18n.defaultLocale;

  return useMemo(
    () => ({
      lang,
      t: getTranslations(lang),
      formatPrice: (amountInCents: number, currency: SupportedCurrency) =>
        formatPrice(amountInCents, currency, lang),
      localizedRoute: (route: string) => localizedRoute(route, lang),
    }),
    [lang]
  );
}
