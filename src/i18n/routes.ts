import { i18nConfig, SupportedLanguages } from "./config";

export function localizedRoute(route: string, _lang: SupportedLanguages) {
  const lang = _lang || i18nConfig.i18n.defaultLocale;
  // prevent double localization :)
  if (route.startsWith(`/${lang}`)) return route;
  else return `/${lang}${route}`;
}
