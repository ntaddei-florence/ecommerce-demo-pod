import enCommon from "../../public/locales/en/common.json";
import itCommon from "../../public/locales/it/common.json";

export enum SupportedLanguages {
  En = "en",
  It = "it",
}

export type Dictionary = {
  common: typeof enCommon;
};

export const dictionaries: Record<SupportedLanguages, Dictionary> = {
  en: {
    common: enCommon,
  },
  it: {
    common: itCommon,
  },
};

export const i18nConfig = {
  i18n: {
    defaultLocale: SupportedLanguages.En,
    locales: Object.values(SupportedLanguages),
  },
};
