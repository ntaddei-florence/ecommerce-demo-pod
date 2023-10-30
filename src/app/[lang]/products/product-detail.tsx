import clsx from "clsx";
import { uniqBy } from "lodash";
import Link from "next/link";
import { FC } from "react";

import { AddToCart } from "./add-to-cart";
import { MediaCarousel } from "~/components/media-carousel";
import { ProductDetailDataFragment, VariantDataFragment } from "~/graphql/generated/graphql";
import { getTranslations, localizedRoute } from "~/i18n";
import { getLinkToVariant } from "~/utils/paths";
import { renderRichText } from "~/utils/rich-text";

export interface ProductDetailProps {
  product: ProductDetailDataFragment;
  variant: VariantDataFragment;
  lang: string;
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, variant, lang }) => {
  const media = variant.media ?? product.defaultMedia;
  const t = getTranslations(lang);

  const allVariants = product.variantsCollection?.items;

  const availableColors = uniqBy(
    (allVariants ?? []).map((v) => v?.color),
    "colorCode"
  );
  const availableSizes = uniqBy(
    (allVariants ?? []).map((v) => v?.size),
    "label"
  );

  const getLinkToVariantForColor = (colorCode: string) => {
    const variantsForColor = allVariants?.filter((v) => colorCode === v?.color?.colorCode);
    const variantSameSize = variantsForColor?.find((v) => {
      return v?.size?.label === variant?.size?.label;
    });
    const variantForColor = variantSameSize ?? variantsForColor?.[0];
    if (variantForColor) {
      return localizedRoute(getLinkToVariant(variantForColor, product), lang);
    }
  };

  const getLinkToVariantForSize = (size: string) => {
    const variantForSize = allVariants?.find(
      (v) => v?.color?.colorCode === variant.color?.colorCode && size === v?.size?.label
    );
    if (variantForSize) {
      return localizedRoute(getLinkToVariant(variantForSize, product), lang);
    }
  };

  const isSizeVariantAvailableForColor = (size: string) => {
    return (
      (
        allVariants?.filter((v) => {
          return v?.color?.colorCode === variant.color?.colorCode && size === v?.size?.label;
        }) ?? []
      ).length > 0
    );
  };

  return (
    <>
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link href={localizedRoute("/", lang)}>Home</Link>
          </li>
          {product?.category?.slug && (
            <li>
              <Link href={localizedRoute(`/categories/${product.category.slug}`, lang)}>
                {product.category.categoryName}
              </Link>
            </li>
          )}
          <li>
            <strong>{product?.name}</strong>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {media && (
          <div className="max-w-sm">
            <MediaCarousel media={media} />
          </div>
        )}
        <div className="prose pb-4">
          <h2>{product?.name}</h2>
          {renderRichText(product?.description?.json)}

          <div className="flex items-center justify-between w-[50%]">
            <strong>{t("products.color")}</strong>
            <div>
              {availableColors.filter(Boolean).map((color) => (
                <Link
                  href={getLinkToVariantForColor(color!.colorCode!) ?? "#"}
                  key={color?.colorCode}
                >
                  <button
                    title={`select color ${color?.colorName}`}
                    style={{ backgroundColor: color?.colorCode ?? undefined }}
                    className={clsx(
                      "mx-1 border-4 w-[4ch] h-6",
                      variant?.color?.colorCode === color?.colorCode
                        ? "border-accent"
                        : "border-transparent"
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between w-[50%]">
            <strong>{t("products.size")}</strong>
            <div>
              {availableSizes.filter(Boolean).map((size) => {
                const isDisabled = !isSizeVariantAvailableForColor(size!.label!);
                return (
                  <Link key={size?.label} href={getLinkToVariantForSize(size!.label!) ?? "#"}>
                    <button
                      disabled={isDisabled}
                      title={isDisabled ? "Not available" : `Select size ${size?.label}`}
                      className={clsx(
                        "mx-1 border w-[4ch] rounded-md",
                        variant?.size?.label === size?.label
                          ? "border-accent border-2"
                          : "border-neutral",
                        { "opacity-40": isDisabled }
                      )}
                    >
                      {size?.label}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>

          {variant.sku && <AddToCart lang={lang} sku={variant.sku} className="mt-6" />}
        </div>
      </div>
    </>
  );
};
