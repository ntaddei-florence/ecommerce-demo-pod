import dynamicLoading from "next/dynamic";

export const dynamic = "force-dynamic";

const DynamicComponent = dynamicLoading(() => import("./component"), {
  loading: () => <p>Loading component...</p>,
});

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DynamicComponent />
    </main>
  );
}
