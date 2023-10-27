import { FC } from "react";

import { getCommerceLayerClient, getPrice, getStock } from "~/commerce-layer";
import { AddToCartButton, Price } from "~/components/commerce-layer";

export interface AddToCartProps {
  sku: string;
  className?: string;
}

export const AddToCart: FC<AddToCartProps> = async ({ sku, className }) => {
  const clClient = await getCommerceLayerClient();
  const { totalQuantity } = await getStock(clClient, sku);
  const price = (await getPrice(clClient, sku))[0];

  return (
    <div className={className}>
      {totalQuantity ? (
        <div className="badge badge-success">Available</div>
      ) : (
        <div className="badge badge-error">Not available</div>
      )}
      {price && <Price price={price} />}
      <AddToCartButton skuCode={sku} disabled={!totalQuantity} />
    </div>
  );
};
