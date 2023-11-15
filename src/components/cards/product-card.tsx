import Link from "next/link";
import { FC } from "react";

import { BasicCard } from "./basic-card";
import { getLocalizedFieldValue } from "~/akeneo/utils";
import { CategoryIndexData, ProductIndexData } from "~/algolia/types";
import { localizedRoute } from "~/i18n";

export interface ProductCardProps {
  product: ProductIndexData;
  category?: CategoryIndexData;
  lang: string;
}

export const ProductCard: FC<ProductCardProps> = ({ product, category, lang }) => {
  const productName = getLocalizedFieldValue(product.values.name, lang)?.data;
  return (
    <Link
      href={localizedRoute(
        `/products/${product.sku}${category ? `?category=${category.code}` : ""}`,
        lang
      )}
    >
      <BasicCard image={product.image} title={productName} />
    </Link>
  );
};
