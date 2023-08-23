"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { AllProductsDocument } from "~/graphql/generated/graphql";

export default function Component() {
  const { data } = useSuspenseQuery(AllProductsDocument);
  return (
    <div>
      client side
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
