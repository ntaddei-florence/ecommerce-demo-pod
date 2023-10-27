import enCart from "../../public/locales/en/cart.json";
import enCommon from "../../public/locales/en/common.json";
import itCart from "../../public/locales/it/cart.json";
import itCommon from "../../public/locales/it/common.json";

export enum SupportedLanguages {
  En = "en",
  It = "it",
}

export type Dictionary = {
  common: typeof enCommon;
  cart: typeof enCart;
};

export const dictionaries: Record<SupportedLanguages, Dictionary> = {
  en: {
    common: enCommon,
    cart: enCart,
  },
  it: {
    common: itCommon,
    cart: itCart,
  },
};

export const i18nConfig = {
  i18n: {
    defaultLocale: SupportedLanguages.En,
    locales: Object.values(SupportedLanguages),
  },
};
