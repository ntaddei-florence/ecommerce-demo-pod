import Link from "next/link";
import { FC } from "react";

import { ProductImage } from "./product-image";
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
        `/products/${product.sku}${category ? `?category=${category.slug}` : ""}`,
        lang
      )}
    >
      <div className="card w-128 border border-gray-200 rounded-xl">
        <ProductImage product={product} lang={lang} />
        <div className="card-body">
          <h2 className="card-title">{productName}</h2>
        </div>
      </div>
    </Link>
  );
};
