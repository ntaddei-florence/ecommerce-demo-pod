type Primitive = string | number | bigint | boolean | undefined | symbol;

export type NestedPath<T, Prefix = ""> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends Primitive | Array<any>
    ? `${string & Prefix}${string & K}`
    : `${string & Prefix}${string & K}` | NestedPath<T[K], `${string & Prefix}${string & K}.`>;
}[keyof T];
