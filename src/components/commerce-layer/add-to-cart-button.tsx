import { revalidatePath } from "next/cache";
import { FC, ReactNode } from "react";

import { addToCommerceLayerCart, getCommerceLayerClient } from "~/commerce-layer";

export interface AddToCartButtonProps {
  skuCode: string;
  label?: ReactNode;
  disabled?: boolean;
}

export const AddToCartButton: FC<AddToCartButtonProps> = async ({ skuCode, label, disabled }) => {
  async function addToCart() {
    "use server";
    const clClient = await getCommerceLayerClient();
    await addToCommerceLayerCart(clClient, skuCode);
    revalidatePath("/");
  }

  return (
    <form action={addToCart}>
      <button disabled={disabled} className="btn btn-primary btn-large" type="submit">
        {label ?? "Add to cart"}
      </button>
    </form>
  );
};
