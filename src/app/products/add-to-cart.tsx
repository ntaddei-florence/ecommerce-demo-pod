"use client";

// import {
//   AddToCartButton,
//   AvailabilityContainer,
//   AvailabilityTemplate,
//   LineItemsContainer,
//   LineItemsCount,
//   Price,
//   PricesContainer,
// } from "@commercelayer/react-components";
import { FC } from "react";

// import { CommerceLayerProvider } from "../../components/commerce-layer";

export interface AddToCartProps {
  sku: string;
}

export const AddToCart: FC<AddToCartProps> = ({}) => {
  // const [quantity, setQuantity] = useState(0);

  return null;
  // <CommerceLayerProvider>
  //   <div className="flex flex-col gap-4">
  //     <AvailabilityContainer skuCode={sku} getQuantity={setQuantity}>
  //       {quantity > 0 && <AvailabilityTemplate className="badge badge-success" />}
  //     </AvailabilityContainer>
  //     <div className="flex gap-2">
  //       <PricesContainer>
  //         <Price skuCode={sku} className="text-lg font-bold" compareClassName="line-through" />
  //       </PricesContainer>
  //     </div>
  //     <AddToCartButton
  //       quantity="1"
  //       skuCode={sku}
  //       className="btn btn-primary btn-wide"
  //       disabled={!quantity}
  //       label={quantity ? "Add to cart" : "Not available"}
  //     />
  //     <div className="text-red">
  //       <LineItemsContainer>
  //         <LineItemsCount />
  //       </LineItemsContainer>
  //     </div>
  //   </div>
  // </CommerceLayerProvider>
};
