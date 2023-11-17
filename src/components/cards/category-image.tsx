import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { CategoryIndexData } from "~/algolia/types";

export interface CategoryImageProps {
  category: CategoryIndexData;
  width?: number;
  height?: number;
  className?: string;
  lang: string;
}

export const CategoryImage: FC<CategoryImageProps> = ({
  category,
  width,
  height,
  className,
  lang,
}) => {
  const categoryName = getLocalizedFieldValue(category.values.name, lang)?.data;
  const placeholderImageUrl = `https://placehold.co/600x400?text=${encodeURIComponent(
    categoryName ?? ""
  )}`;
  return (
    <Image
      src={category.image ?? placeholderImageUrl}
      className={clsx(
        "aspect-square",
        className,
        category.image ? "object-contain" : "object-cover"
      )}
      alt={categoryName ?? ""}
      width={width ?? 512}
      height={height ?? 512}
    />
  );
};
