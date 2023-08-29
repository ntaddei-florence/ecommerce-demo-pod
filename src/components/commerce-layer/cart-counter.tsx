"use client";

import {
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components";
import React from "react";

import { CL_PERSIST_KEY } from "./constants";
import { CommerceLayerProvider } from "./context";

export const CartCounter = () => {
  return (
    <CommerceLayerProvider>
      <LineItemsContainer>
        <LineItemsCount />
      </LineItemsContainer>
    </CommerceLayerProvider>
  );
};
