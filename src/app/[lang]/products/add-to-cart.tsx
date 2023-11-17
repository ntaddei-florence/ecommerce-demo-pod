import { Price } from "@commercelayer/sdk";
import { FC } from "react";

import { getCommerceLayerClient, getPrice, getStock } from "~/commerce-layer";
import { AddToCartButton, Price as PriceTag } from "~/components/commerce-layer";
import { getTranslations } from "~/i18n";

export interface AddToCartProps {
  sku: string;
  className?: string;
  lang: string;
}

export const AddToCart: FC<AddToCartProps> = async ({ sku: skuCode, className, lang }) => {
  const clClient = await getCommerceLayerClient();
  const skuList = await clClient.skus.list({ filters: { code_eq: skuCode } });
  let totalQuantity = 0;
  let price: Price | undefined = undefined;

  if (skuList.length) {
    const sku = skuList[0];
    totalQuantity = (await getStock(clClient, sku))?.totalQuantity ?? 0;
    price = (await getPrice(clClient, sku))?.[0];
  }

  const t = getTranslations(lang);

  return (
    <div className={className}>
      {totalQuantity ? (
        <div className="badge badge-success">{t("products.available")}</div>
      ) : (
        <div className="badge badge-error">{t("products.notAvailable")}</div>
      )}
      {price && <PriceTag price={price} />}
      <AddToCartButton lang={lang} skuCode={skuCode} disabled={!totalQuantity} />
    </div>
  );
};
