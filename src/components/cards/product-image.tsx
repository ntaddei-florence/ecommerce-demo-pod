import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { ProductIndexData } from "~/algolia/types";

export interface ProductImageProps {
  product: ProductIndexData;
  width?: number;
  height?: number;
  className?: string;
  lang: string;
}

export const ProductImage: FC<ProductImageProps> = ({
  product,
  width,
  height,
  className,
  lang,
}) => {
  const productName = getLocalizedFieldValue(product.values.name, lang)?.data;
  const placeholderImageUrl = `https://placehold.co/600x400?text=${encodeURIComponent(
    productName ?? ""
  )}`;
  return (
    <Image
      src={product.image ?? placeholderImageUrl}
      className={clsx(
        "aspect-square",
        className,
        product.image ? "object-contain" : "object-cover"
      )}
      alt={productName ?? ""}
      width={width ?? 512}
      height={height ?? 512}
    />
  );
};
