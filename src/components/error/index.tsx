import { TPageErrorProps } from "./types";

export default function PageError({ error }: TPageErrorProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h4 className="text-6xl font-medium">500</h4>
      <h1 className="text-4xl font-bold">Internal server error</h1>
      <p className="text-lg text-neutral-500">
        An error occurred while loading the page.
      </p>
      <p className="text-lg text-neutral-500">
        {error?.error?.message || "Unknown error"}
      </p>
    </main>
  );
}
