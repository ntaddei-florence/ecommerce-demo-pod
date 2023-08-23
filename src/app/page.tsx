import { getClient } from "@/graphql/apollo-client";
import { AllProductsDocument } from "@/graphql/generated/graphql";

export default async function Page() {
  const { data } = await getClient().query({ query: AllProductsDocument });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      server side
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}

