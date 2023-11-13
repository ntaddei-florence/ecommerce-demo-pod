export interface LocalizedField<T = string> {
  "en-US": T;
}

export interface ProductIndexData {
  price?: number;
  objectID: string;
  fields?: {
    categoryName?: LocalizedField;
    internalName?: LocalizedField;
    slug: LocalizedField;
  };
}
