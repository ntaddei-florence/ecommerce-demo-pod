import { FC, ReactNode } from "react";

import { addToCommerceLayerCart, getCommerceLayerClient } from "~/commerce-layer";

export interface AddToCartButtonProps {
  skuCode: string;
  label?: ReactNode;
  disabled?: boolean;
}

export const AddToCartButton: FC<AddToCartButtonProps> = async ({ skuCode, label, disabled }) => {
  const defaultLabel = disabled ? "Not available" : "Add to cart";

  async function addToCart() {
    "use server";
    const clClient = await getCommerceLayerClient();
    await addToCommerceLayerCart(clClient, skuCode);
  }

  return (
    <form action={addToCart}>
      <button className="btn btn-primary btn-large" type="submit">
        {label ?? defaultLabel}
      </button>
    </form>
  );
};
