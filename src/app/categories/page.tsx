import { getClient } from "~/graphql/apollo-client";
import { AllCategoriesDocument } from "~/graphql/generated/graphql";

export default async function Page() {
  const client = getClient();
  const { data } = await client.query({ query: AllCategoriesDocument });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
