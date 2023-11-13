import { LocalizedAkeneoField } from "~/akeneo";

export interface ProductIndexData {
  objectID: string;
  uuid: string;
  identifier: string;
  family: string;
  categories: string[];
  values: Record<"name" | "description", LocalizedAkeneoField[]>;
  created: string;
  updated: string;
}
