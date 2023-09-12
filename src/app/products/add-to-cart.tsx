import { FC } from "react";

import { getCommerceLayerClient, getPrice, getStock } from "~/commerce-layer";
import { AddToCartButton, Price } from "~/components/commerce-layer";

export interface AddToCartProps {
  sku: string;
}

export const AddToCart: FC<AddToCartProps> = async ({ sku }) => {
  const clClient = await getCommerceLayerClient();
  const { totalQuantity } = await getStock(clClient, sku);
  const price = (await getPrice(clClient, sku))[0];

  return (
    <div>
      {totalQuantity ? (
        <div className="badge badge-success">{totalQuantity} available</div>
      ) : (
        <div className="badge badge-error">Not available</div>
      )}
      {price && <Price price={price} />}
      <AddToCartButton skuCode={sku} disabled={!totalQuantity} />
    </div>
  );
};
