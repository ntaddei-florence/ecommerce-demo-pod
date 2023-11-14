import { LocalizedAkeneoField } from "~/akeneo";

export interface ProductIndexData {
  objectID: string;
  uuid: string;
  identifier: string;
  price?: { currency: string; amount: number; compareAmount?: number } | null;
  image?: { url: string } | null;
  family: string;
  categories: string[];
  values: Record<"name" | "description", LocalizedAkeneoField[]>;
  created: string;
  updated: string;
}
