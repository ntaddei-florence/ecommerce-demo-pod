import { Dictionary, SupportedLanguages } from "./config";

type Primitive = string | number | bigint | boolean | undefined | symbol;

export type NestedPath<T, Prefix = ""> = {
  [K in keyof T]: T[K] extends Primitive
    ? `${string & Prefix}${string & K}`
    : `${string & Prefix}${string & K}` | NestedPath<T[K], `${string & Prefix}${string & K}.`>;
}[keyof T];

export type TFunction = (
  lang: SupportedLanguages,
  key: NestedPath<Dictionary>,
  params?: ContextParams,
  removeEmpty?: boolean
) => string;

export enum SupportedCurrency {
  Eur = "EUR",
  Usd = "USD",
}

export type ContextParams = Partial<{
  count: number;
  currency: SupportedCurrency;
}> &
  // other params, not used in plugins
  Record<string, string | number | undefined>;

export type ContextPlugin = (params: ContextParams) => string | null | Array<string | null>;
