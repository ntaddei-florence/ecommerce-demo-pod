import { Price as PriceType } from "@commercelayer/sdk";
import { FC } from "react";

export interface PriceProps {
  price: PriceType;
}

export const Price: FC<PriceProps> = async ({ price }) => {
  return (
    <div className="flex items-center gap-1">
      <p className="font-bold">{price.formatted_amount}</p>
      {price.formatted_compare_at_amount && (
        <p className="line-through">{price.formatted_compare_at_amount}</p>
      )}
    </div>
  );
};
