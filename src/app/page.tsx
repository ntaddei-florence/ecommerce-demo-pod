import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="prose">
      <Link href="/categories">Explore categories</Link>
    </div>
  );
}
