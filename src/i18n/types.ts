type Primitive = string | number | bigint | boolean | undefined | symbol;

export type NestedPath<T, Prefix = ""> = {
  [K in keyof T]: T[K] extends Primitive
    ? `${string & Prefix}${string & K}`
    : `${string & Prefix}${string & K}` | NestedPath<T[K], `${string & Prefix}${string & K}.`>;
}[keyof T];
