import { getClient } from "~/graphql/apollo-client";
import { AllProductsDocument } from "~/graphql/generated/graphql";

export default async function Page() {
  const client = getClient();
  const { data } = await client.query({ query: AllProductsDocument });

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
