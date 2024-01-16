import { useCallback } from "react";

export const useRafThrottle = <T>() => {
  const rafThrottled = (callback: (event: T) => void) => {
    let id: number | null = null;
    let eventsArgs = null;

    return (args: T) => {
      eventsArgs = args;
      if (id !== null) {
        return;
      }

      callback(eventsArgs);

      id = requestAnimationFrame(() => {
        id = null;
      });
    };
  };

  return useCallback(rafThrottled, []);
};
