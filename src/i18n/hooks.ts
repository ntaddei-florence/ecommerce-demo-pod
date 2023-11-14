import { useParams } from "next/navigation";
import { useMemo } from "react";

import { getTranslations, localizedRoute } from "./core";
import { formatPrice } from "./prices";
import { SupportedCurrency } from "./types";

export function useClientI18n() {
  const params = useParams();
  const lang = params.lang as string;
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
