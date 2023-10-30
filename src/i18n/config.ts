import enCart from "../../public/locales/en/cart.json";
import enCategories from "../../public/locales/en/categories.json";
import enCommon from "../../public/locales/en/common.json";
import enProducts from "../../public/locales/en/products.json";
import itCart from "../../public/locales/it/cart.json";
import itCategories from "../../public/locales/it/categories.json";
import itCommon from "../../public/locales/it/common.json";
import itProducts from "../../public/locales/it/products.json";

export enum SupportedLanguages {
  En = "en",
  It = "it",
}

export type Dictionary = {
  common: typeof enCommon;
  cart: typeof enCart;
  categories: typeof enCategories;
  products: typeof enProducts;
};

export const dictionaries: Record<SupportedLanguages, Dictionary> = {
  en: {
    common: enCommon,
    cart: enCart,
    categories: enCategories,
    products: enProducts,
  },
  it: {
    common: itCommon,
    cart: itCart,
    categories: itCategories,
    products: itProducts,
  },
};

export const i18nConfig = {
  i18n: {
    defaultLocale: SupportedLanguages.En,
    locales: Object.values(SupportedLanguages),
  },
};
