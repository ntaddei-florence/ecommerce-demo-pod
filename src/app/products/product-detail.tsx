"use client";

import { redirect } from "next/navigation";
import { FC, useMemo, useState } from "react";

import { MediaCarousel } from "~/components/media-carousel";
import { ProductDetailDataFragment, VariantDataFragment } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  product: ProductDetailDataFragment;
  variant: VariantDataFragment;
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, variant }) => {
  const media = variant.media ?? product.defaultMedia;

  const redirectToVariant = (v: VariantDataFragment) => {
    if (v.slug) redirect(`/products/${v.slug}`);
    else redirect(`/products/${product.slug}/sku/${v.sku}`);
  };

  const allVariants = product.variantsCollection?.items;
  const availableColors = useMemo(() => {
    return Array.from(new Set(allVariants?.map((v) => v?.color)));
  }, [allVariants]);
  const availableSizes = useMemo(() => {
    return Array.from(new Set(allVariants?.map((v) => v?.size?.label)));
  }, [allVariants]);

  const [selectedColor, setSelectedColor] = useState(variant.color);
  const [selectedSize, setSelectedSize] = useState(variant.size?.label);

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
          <h3>Size: {variant?.size?.label}</h3>
          <h3>
            Colors:{" "}
            {availableColors.map((color) => (
              <button
                key={variant.sku}
                title={variant.sku ?? ""}
                // onClick={() => v && redirectToVariant(v)}
                style={{ backgroundColor: color ?? undefined }}
                className={`mx-1 rounded-md border border-4 w-6 h-6 ${
                  variant?.color === color ? "border-accent" : ""
                }`}
              />
            ))}
          </h3>
          <p>
            SKU: <strong>{variant.sku}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
