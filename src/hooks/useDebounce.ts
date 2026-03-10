import { useState, useEffect } from 'react';

/**
 * Hook to debounce a rapidly changing value (like a search input).
 * Returns a debounced version of the value that updates after a specified delay.
 * Helpful for preventing heavy renders or unnecessary API calls on every keystroke.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set debouncedValue to value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel timeout if value changes, or on unmount
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
