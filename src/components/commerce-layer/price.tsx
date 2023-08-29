"use client";

import { Price, PricesContainer } from "@commercelayer/react-components";
import { FC } from "react";

import { CommerceLayerProvider } from "./context";

export interface CLPriceProps {
  sku: string;
}

export const CLPrice: FC<CLPriceProps> = ({ sku }) => {
  return (
    <CommerceLayerProvider>
      <PricesContainer>
        <Price skuCode={sku} />
      </PricesContainer>
    </CommerceLayerProvider>
  );
};
