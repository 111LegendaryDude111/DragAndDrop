import { useLayoutEffect, useRef } from "react";

export const useLatest = <T>(value: T) => {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
