import Link from "next/link";
import { FC } from "react";

import { AddToCart } from "~/app/products/add-to-cart";
import { MediaCarousel } from "~/components/media-carousel";
import { ProductDetailDataFragment, VariantDataFragment } from "~/graphql/generated/graphql";
import { renderRichText } from "~/utils/rich-text";

export interface ProductDetailProps {
  product: ProductDetailDataFragment;
  variant: VariantDataFragment;
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, variant }) => {
  const media = variant.media ?? product.defaultMedia;

  const allVariants = product.variantsCollection?.items;

  const availableColors = Array.from(new Set(allVariants?.map((v) => v?.color)));
  const availableSizes = Array.from(new Set(allVariants?.map((v) => v?.size?.label)));

  const getLinkToVariant = (v: VariantDataFragment) => {
    return v.slug ? `/products/${v.slug}` : `/products/${product.slug}/sku/${v.sku}`;
  };

  const getLinkToVariantForColor = (color: string) => {
    const variantsForColor = allVariants?.filter((v) => color === v?.color);
    const variantSameSize = variantsForColor?.find((v) => {
      return v?.size?.label === variant?.size?.label;
    });
    const variantForColor = variantSameSize ?? variantsForColor?.[0];
    if (variantForColor) {
      return getLinkToVariant(variantForColor);
    }
  };

  const getLinkToVariantForSize = (size: string) => {
    const variantForSize = allVariants?.find(
      (v) => v?.color === variant.color && size === v?.size?.label
    );
    if (variantForSize) {
      return getLinkToVariant(variantForSize);
    }
  };

  const isSizeVariantAvailableForColor = (size: string) => {
    return (
      (
        allVariants?.filter((v) => {
          return v?.color === variant.color && size === v?.size?.label;
        }) ?? []
      ).length > 0
    );
  };

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
          {renderRichText(product?.description?.json)}

          <h3>
            Colors:{" "}
            {availableColors.filter(Boolean).map((color) => (
              <Link
                href={getLinkToVariantForColor(color?.colorCode!) ?? "#"}
                key={color?.colorCode}
              >
                <button
                  style={{ backgroundColor: color?.colorCode ?? undefined }}
                  className={`mx-1 rounded-md border border-4 w-6 h-6 ${
                    variant?.color === color ? "border-accent" : ""
                  }`}
                />
              </Link>
            ))}
          </h3>
          <h3>
            Size:{" "}
            {availableSizes.filter(Boolean).map((size) => {
              const isDisabled = !isSizeVariantAvailableForColor(size!);
              return (
                <Link key={size} href={getLinkToVariantForSize(size!) ?? "#"}>
                  <button
                    disabled={isDisabled}
                    title={isDisabled ? "not available" : `select ${size}`}
                    className={`mx-1 rounded-md border w-[4ch] ${
                      variant?.size?.label === size ? "border-accent border-4" : "border-neutral"
                    } ${isDisabled ? "opacity-40" : ""}`}
                  >
                    {size}
                  </button>
                </Link>
              );
            })}
          </h3>
          {variant.sku && <AddToCart sku={variant.sku} />}
        </div>
      </div>
    </div>
  );
};
