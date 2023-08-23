import Component from "./component";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Component />
    </main>
  );
}
