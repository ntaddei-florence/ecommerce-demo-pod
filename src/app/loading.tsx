export function Loader() {
  return <span className="loading loading-bars loading-lg my-auto" />;
}

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}
