"use client";

import { LineItemsContainer, LineItemsCount } from "@commercelayer/react-components";
import React from "react";

import { CommerceLayerProvider } from "../commerce-layer";

export const CartCounter = () => {
  return (
    <CommerceLayerProvider>
      <LineItemsContainer>
        <LineItemsCount />
      </LineItemsContainer>
    </CommerceLayerProvider>
  );
};
