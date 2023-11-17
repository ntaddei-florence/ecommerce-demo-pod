import { FC } from "react";

import { CategoryIndexData, ProductIndexData } from "~/algolia/types";
import { SupportedCurrency } from "~/i18n";
import { formatPrice } from "~/i18n/prices";

export interface ProductPriceTagProps {
  product: ProductIndexData;
  category?: CategoryIndexData;
  lang: string;
}

export const ProductPriceTag: FC<ProductPriceTagProps> = ({ product, lang }) => {
  const { amount, compareAmount, currency } = product.price ?? {};
  return (
    <>
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
    </>
  );
};
