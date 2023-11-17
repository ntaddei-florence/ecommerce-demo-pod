"use client";

import Link from "next/link";

import { ProductImage } from "../cards/product-image";
import { getLocalizedFieldValue } from "~/akeneo/utils";
import { ProductIndexData } from "~/algolia/types";
import { SupportedCurrency, useClientI18n } from "~/i18n";
import { stripHtml } from "~/utils/html";

export function ProductSearchItem(product: ProductIndexData) {
  const { objectID, values, price, sku } = product;
  const { lang, localizedRoute, formatPrice } = useClientI18n();
  const productDescription = stripHtml(
    getLocalizedFieldValue(values.description, lang)?.data?.replace(/\\n/g, " ") ?? ""
  );

  const productLink = localizedRoute(`/products/${sku}`);

  return (
    <div
      className="border border-light rounded-lg shadow flex flex-col sm:flex-row gap-4 overflow-hidden"
      key={objectID}
    >
      {/* TODO missing image placeholder */}
      {product && (
        <ProductImage
          className="w-full h-auto sm:w-48 sm:h-48 aspect-square object-cover"
          product={product}
          lang={lang}
        />
      )}
      <div className="flex flex-col gap-4 justify-between p-4">
        <div>
          <Link href={productLink} className="text-xl font-semibold pb-1 link link-primary">
            {getLocalizedFieldValue(values.name, lang)?.data}
          </Link>
          {productDescription && <div className="pt-2 line-clamp-3">{productDescription}</div>}
        </div>
        <div className="w-full flex justify-between items-center gap-2">
          <div className="flex gap-2 items-center text-lg">
            {price?.compareAmount && (
              <p className="line-through">
                {formatPrice(price.compareAmount, price.currency as SupportedCurrency)}
              </p>
            )}
            {price?.amount && (
              <p className="font-bold">
                {formatPrice(price.amount, price.currency as SupportedCurrency)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
