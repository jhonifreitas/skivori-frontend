import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h4 className="text-6xl font-medium">404</h4>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-lg text-neutral-500">
        The page you are looking for does not exist.
      </p>
      <Button asChild size="lg">
        <Link href="/">Return to the home page</Link>
      </Button>
    </main>
  );
}
