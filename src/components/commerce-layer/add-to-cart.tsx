"use client";

import {
  AddToCartButton,
  AvailabilityContainer,
  AvailabilityTemplate,
  OrderContainer,
  OrderStorage,
  Price,
  PricesContainer,
} from "@commercelayer/react-components";
import { FC, useState } from "react";

import { CL_PERSIST_KEY } from "./constants";
import { CommerceLayerProvider } from "./context";

export interface AddToCartProps {
  sku: string;
}

export const AddToCart: FC<AddToCartProps> = ({ sku }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <CommerceLayerProvider>
      <div className="flex flex-col gap-4">
        <AvailabilityContainer skuCode={sku} getQuantity={setQuantity}>
          {quantity > 0 && <AvailabilityTemplate className="badge badge-success" />}
        </AvailabilityContainer>
        <div className="flex gap-2">
          <PricesContainer>
            <Price skuCode={sku} className="text-lg font-bold" compareClassName="line-through" />
          </PricesContainer>
        </div>
        <AddToCartButton
          quantity="1"
          skuCode={sku}
          className="btn btn-primary btn-wide"
          disabled={!quantity}
          label={quantity ? "Add to cart" : "Not available"}
        />
      </div>
    </CommerceLayerProvider>
  );
};
