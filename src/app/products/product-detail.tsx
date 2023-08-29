"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

import { MediaCarousel } from "~/components/media-carousel";
import { ProductDetailDataFragment, VariantDataFragment } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  product: ProductDetailDataFragment;
  variant: VariantDataFragment;
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, variant }) => {
  const media = variant.media ?? product.defaultMedia;

  const allVariants = product.variantsCollection?.items;
  const availableColors = useMemo(() => {
    return Array.from(new Set(allVariants?.map((v) => v?.color)));
  }, [allVariants]);
  const availableSizes = useMemo(() => {
    return Array.from(new Set(allVariants?.map((v) => v?.size?.label)));
  }, [allVariants]);

  const router = useRouter();

  const redirectToVariant = useCallback(
    (v: VariantDataFragment) => {
      if (v.slug) router.push(`/products/${v.slug}`);
      else router.push(`/products/${product.slug}/sku/${v.sku}`);
    },
    [product, router]
  );

  const selectVariantForColor = useCallback(
    (color: string) => {
      const variantsForColor = allVariants?.filter((v) => color === v?.color);
      const variantSameSize = variantsForColor?.find(
        (v) => v?.size?.label === variant?.size?.label
      );
      const variantForColor = variantSameSize ?? variantsForColor?.[0];
      if (variantForColor) {
        redirectToVariant(variantForColor);
      }
    },
    [variant, allVariants, redirectToVariant]
  );

  const selectVariantForSize = useCallback(
    (size: string) => {
      const variantForSize = allVariants?.find(
        (v) => v?.color === variant.color && size === v?.size?.label
      );
      if (variantForSize) {
        redirectToVariant(variantForSize);
      }
    },
    [allVariants, redirectToVariant, variant]
  );

  const isSizeVariantAvailableForColor = useCallback(
    (size: string) => {
      return (
        (allVariants?.filter((v) => v?.color === variant.color && size === v?.size?.label) ?? [])
          .length > 0
      );
    },
    [allVariants, variant]
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-column gap-2">
        {media && (
          <div className="max-w-sm">
            <MediaCarousel media={media} />
          </div>
        )}
        <div className="prose pb-4">
          <h2>{product?.name}</h2>
          <h3>
            Colors:{" "}
            {availableColors.map((color) => (
              <button
                key={color}
                title={color ?? undefined}
                onClick={() => color && selectVariantForColor(color)}
                style={{ backgroundColor: color ?? undefined }}
                className={`mx-1 rounded-md border border-4 w-6 h-6 ${
                  variant?.color === color ? "border-accent" : ""
                }`}
              />
            ))}
          </h3>
          <h3>
            Size:
            <select
              className="select select-accent inline ml-4 max-w-xs"
              onChange={(e) => selectVariantForSize(e.target.value)}
            >
              {availableSizes.filter(Boolean).map((size) => {
                const isDisabled = !isSizeVariantAvailableForColor(size!);
                return (
                  <option key={size} disabled={isDisabled} selected={variant.size?.label === size}>
                    {size} {isDisabled && "(n/a)"}
                  </option>
                );
              })}
            </select>
          </h3>
          <p>
            SKU: <strong>{variant.sku}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
