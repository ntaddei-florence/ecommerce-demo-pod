import { FC } from "react";

import { getCommerceLayerClient } from "~/commerce-layer";
import { getPrice } from "~/commerce-layer/prices";
import { getStock } from "~/commerce-layer/stock";
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
      <Price price={price} />
      {/* <pre className="container">{JSON.stringify(price, null, 2)}</pre> */}
      <AddToCartButton skuCode={sku} disabled={!totalQuantity} />
    </div>
  );
};
