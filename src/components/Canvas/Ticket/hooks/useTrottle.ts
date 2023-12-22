import { useCallback } from "react";

type WheelEvent = (wheelEvent: WheelEvent) => void;

export const useTrottle = (callback: (wheelEvent: WheelEvent) => void) => {
  const wrapper = (event: WheelEvent) => {
    const cbWrap = () => {
      callback(event);
      console.log("cbWrap");
    };

    requestAnimationFrame(cbWrap);
  };

  return wrapper;
};
