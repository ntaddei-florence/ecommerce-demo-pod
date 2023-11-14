import { FC } from "react";

import { getCommerceLayerClient, getPrice, getStock } from "~/commerce-layer";
import { AddToCartButton, Price } from "~/components/commerce-layer";
import { getTranslations, SupportedLanguages } from "~/i18n";

export interface AddToCartProps {
  sku: string;
  className?: string;
  lang: string;
}

export const AddToCart: FC<AddToCartProps> = async ({ sku, className, lang }) => {
  const clClient = await getCommerceLayerClient();
  const { totalQuantity } = await getStock(clClient, sku);
  const price = (await getPrice(clClient, sku))[0];
  const t = getTranslations(lang as SupportedLanguages);

  return (
    <div className={className}>
      {totalQuantity ? (
        <div className="badge badge-success">{t("products.available")}</div>
      ) : (
        <div className="badge badge-error">{t("products.notAvailable")}</div>
      )}
      {price && <Price price={price} />}
      <AddToCartButton lang={lang} skuCode={sku} disabled={!totalQuantity} />
    </div>
  );
};
