"use client";

import Link from "next/link";

import { ProductImage } from "../cards/product-image";
import { getLocalizedFieldValue } from "~/akeneo/utils";
import { ProductIndexData } from "~/algolia/types";
import { SupportedCurrency, useClientI18n } from "~/i18n";

const MAX_DESCRIPTION_CHARS = 150;

export function ProductSearchItem(product: ProductIndexData) {
  const { objectID, values, price, sku } = product;
  const { t, lang, localizedRoute, formatPrice } = useClientI18n();
  const productDescription =
    getLocalizedFieldValue(values.description, lang)?.data?.replace(/\\n/g, "<br />") ?? "";

  const truncatedDescription =
    productDescription.length > MAX_DESCRIPTION_CHARS
      ? productDescription.substring(0, MAX_DESCRIPTION_CHARS)
      : productDescription;

  const productLink = localizedRoute(`/products/${sku}`);

  return (
    <div
      className="border border-light rounded-lg shadow flex flex-col sm:flex-row gap-4 overflow-hidden"
      key={objectID}
    >
      {/* TODO missing image placeholder */}
      {product && (
        <div className="w-48 h-48">
          <ProductImage className="aspect-square object-cover" product={product} lang={lang} />
        </div>
      )}
      <div className="flex flex-col gap-4 justify-between p-4">
        <div>
          <Link href={productLink} className="text-xl font-semibold pb-1 link link-primary">
            {getLocalizedFieldValue(values.name, lang)?.data}
          </Link>
          {truncatedDescription && (
            <div className="pt-2">
              <Link href={productLink}>
                <div
                  className="inline"
                  dangerouslySetInnerHTML={{
                    __html: truncatedDescription.trim(),
                  }}
                />
                {truncatedDescription !== productDescription && "..."}
                <span className="pl-1 inline link link-primary">{t("search.seeMore")}</span>
              </Link>
            </div>
          )}
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
