import { useRef } from "react";

export const useThrottle = () => {
  const throttleSeed = useRef<null | number>(null);

  const throttleFunction = useRef(
    (
      func: (event: MouseEvent | WheelEvent) => void,
      event: MouseEvent | WheelEvent
    ) => {
      if (!throttleSeed.current) {
        // Call the callback immediately for the first time
        func(event);
        throttleSeed.current = requestAnimationFrame(() => {
          throttleSeed.current = null;
        });
      }
    }
  );

  return throttleFunction.current;
};
