import { LocalizedAkeneoField } from "~/akeneo";

export interface ProductIndexData {
  objectID: string;
  uuid: string;
  sku: string;
  slug: string;
  price?: { currency: string; amount: number; compareAmount?: number } | null;
  image?: string | null;
  family: string;
  categories: string[];
  values: Record<"name" | "description", LocalizedAkeneoField[]>;
  created: string;
  updated: string;
}

export interface CategoryIndexData {
  objectID: string;
  uuid: string;
  slug: string;
  image?: string | null;
  values: Record<"name" | "description", LocalizedAkeneoField[]>;
}
