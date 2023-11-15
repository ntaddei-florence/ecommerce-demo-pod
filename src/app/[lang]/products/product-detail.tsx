import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { AddToCart } from "./add-to-cart";
import { getLocalizedFieldValue } from "~/akeneo/utils";
import { CategoryIndexData, ProductIndexData } from "~/algolia/types";
import { localizedRoute } from "~/i18n";

export interface ProductDetailProps {
  product: ProductIndexData;
  category: CategoryIndexData;
  lang: string;
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, category, lang }) => {
  // const t = getTranslations(lang);

  // const allVariants = product.variantsCollection?.items;

  // const availableColors = uniqBy(
  //   (allVariants ?? []).map((v) => v?.color),
  //   "colorCode"
  // );
  // const availableSizes = uniqBy(
  //   (allVariants ?? []).map((v) => v?.size),
  //   "label"
  // );

  // const getLinkToVariantForColor = (colorCode: string) => {
  //   const variantsForColor = allVariants?.filter((v) => colorCode === v?.color?.colorCode);
  //   const variantSameSize = variantsForColor?.find((v) => {
  //     return v?.size?.label === variant?.size?.label;
  //   });
  //   const variantForColor = variantSameSize ?? variantsForColor?.[0];
  //   if (variantForColor) {
  //     return localizedRoute(getLinkToVariant(variantForColor, product), lang);
  //   }
  // };

  // const getLinkToVariantForSize = (size: string) => {
  //   const variantForSize = allVariants?.find(
  //     (v) => v?.color?.colorCode === variant.color?.colorCode && size === v?.size?.label
  //   );
  //   if (variantForSize) {
  //     return localizedRoute(getLinkToVariant(variantForSize, product), lang);
  //   }
  // };

  // const isSizeVariantAvailableForColor = (size: string) => {
  //   return (
  //     (
  //       allVariants?.filter((v) => {
  //         return v?.color?.colorCode === variant.color?.colorCode && size === v?.size?.label;
  //       }) ?? []
  //     ).length > 0
  //   );
  // };

  const productName = getLocalizedFieldValue(product.values.name, lang)?.data;
  const categoryName =
    category?.values.name && getLocalizedFieldValue(category.values.name, lang)?.data;

  return (
    <>
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link href={localizedRoute("/", lang)}>Home</Link>
          </li>
          {category && (
            <li>
              <Link href={localizedRoute(`/categories/${category.code}`, lang)}>
                {categoryName}
              </Link>
            </li>
          )}
          <li>
            <strong>{productName}</strong>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {product.image && <Image alt="" src={product.image} width={512} height={512} />}

        <div className="prose pb-4">
          <h2>{productName}</h2>
          <p>{getLocalizedFieldValue(product.values.description, lang)?.data}</p>

          {/*<div className="flex items-center justify-between w-[50%]">
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
                      "mx-1 border-2 w-[4ch] h-8 rounded-md",
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
          </div>*/}

          <AddToCart lang={lang} sku={product.sku} className="mt-6" />
        </div>
      </div>
    </>
  );
};
