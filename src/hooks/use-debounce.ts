import { useEffect, useState } from "react";

/**
 * Q5 — Delays propagating value updates until the user pauses typing,
 * reducing the number of search requests sent to the back-end.
 */
export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
