import { Dictionary, SupportedLanguages } from "./config";
import { getTranslations } from "./core";
import { NestedPath, SupportedCurrency, TFunction } from "./types";

export function formatPrice(
  amountInCents: number,
  currency: SupportedCurrency,
  lang: SupportedLanguages,
  tFunction?: TFunction
) {
  const t = tFunction
    ? (key: NestedPath<Dictionary>) => tFunction(lang, key)
    : getTranslations(lang);
  const amount = amountInCents / 100;

  const formattedCurrency = t(`common.currencies.${currency}`);
  return `${amount.toFixed(2)}${formattedCurrency}`; // we could also localize the order of [currency, amount]
}
