import { revalidatePath } from "next/cache";
import { FC, ReactNode } from "react";

import { addToCommerceLayerCart, getCommerceLayerClient } from "~/commerce-layer";
import { getTranslations, localizedRoute, SupportedLanguages } from "~/i18n";

export interface AddToCartButtonProps {
  skuCode: string;
  label?: ReactNode;
  disabled?: boolean;
  lang: string;
}

export const AddToCartButton: FC<AddToCartButtonProps> = async ({
  skuCode,
  label,
  disabled,
  lang,
}) => {
  const t = getTranslations(lang as SupportedLanguages);
  async function addToCart() {
    "use server";
    const clClient = await getCommerceLayerClient();
    await addToCommerceLayerCart(clClient, skuCode);
    revalidatePath(localizedRoute("/", lang as SupportedLanguages));
  }

  return (
    <form action={addToCart}>
      <button disabled={disabled} className="btn btn-primary btn-large" type="submit">
        {label ?? t("cart.addToCart")}
      </button>
    </form>
  );
};
