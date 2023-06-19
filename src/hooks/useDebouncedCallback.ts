import { useState } from 'react';

export default function useDebouncedCallback<A extends any[]>(
  callback: (...args: A) => void,
  delay: number
): (...args: A) => void {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  return (...args: A) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = window.setTimeout(() => callback(...args), delay);
    setTimeoutId(id);
  };
}
