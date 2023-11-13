import { useParams } from "next/navigation";
import { useMemo } from "react";

import { getTranslations, localizedRoute } from "./core";

export function useClientI18n() {
  const params = useParams();
  const lang = params.lang as string;
  return useMemo(
    () => ({
      lang,
      t: getTranslations(lang),
      localizedRoute: (route: string) => localizedRoute(route, lang),
    }),
    [lang]
  );
}
