"use client";

import { AllProductsDocument } from "@/graphql/generated/graphql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export default function Component() {
  const { data } = useSuspenseQuery(AllProductsDocument);
  return (
    <div>
      client side
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
