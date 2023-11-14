import { useParams } from "next/navigation";
import { useMemo } from "react";

import { SupportedLanguages } from "./config";
import { getTranslations } from "./core";
import { formatPrice } from "./prices";
import { localizedRoute } from "./routes";
import { SupportedCurrency } from "./types";

export function useClientI18n() {
  const params = useParams();
  const lang = params.lang as SupportedLanguages;
  return useMemo(
    () => ({
      lang,
      formatPrice: (amountInCents: number, currency: SupportedCurrency) =>
        formatPrice(amountInCents, currency, lang),
      t: getTranslations(lang),
      localizedRoute: (route: string) => localizedRoute(route, lang),
    }),
    [lang]
  );
}
