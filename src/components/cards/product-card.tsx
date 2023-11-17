import Link from "next/link";
import { FC } from "react";

import { ProductImage } from "./product-image";
import { getLocalizedFieldValue } from "~/akeneo/utils";
import { CategoryIndexData, ProductIndexData } from "~/algolia/types";
import { localizedRoute, SupportedCurrency } from "~/i18n";
import { formatPrice } from "~/i18n/prices";

export interface ProductCardProps {
  product: ProductIndexData;
  category?: CategoryIndexData;
  lang: string;
}

export const ProductCard: FC<ProductCardProps> = ({ product, category, lang }) => {
  const productName = getLocalizedFieldValue(product.values.name, lang)?.data;
  const { amount, compareAmount, currency } = product.price ?? {};

  return (
    <Link
      href={localizedRoute(
        `/products/${product.sku}${category ? `?category=${category.slug}` : ""}`,
        lang
      )}
    >
      <div className="card card-compact shadow group w-128 h-full border border-gray-200 rounded-xl overflow-hidden">
        <ProductImage
          className="group-hover:scale-125 transition duration-500 "
          product={product}
          lang={lang}
        />
        <div className="card-body z-10 bg-white">
          <h2 className="card-title">{productName}</h2>
          <div className="text-xl mt-auto">
            {compareAmount && compareAmount !== amount && (
              <p className="line-through inline mr-2">
                {formatPrice(compareAmount, currency as SupportedCurrency, lang)}
              </p>
            )}
            {amount && (
              <p className="font-semibold text-2xl inline">
                {formatPrice(amount, currency as SupportedCurrency, lang)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
