import { useEffect, useRef, useState } from "react";
import { useThrottle } from "./useTrottle";

export const useInfinityScreen = (ref: HTMLDivElement | null) => {
  const [canvasDimensions, setCanvasDimensions] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const currentCoodinates = useRef<{ x: number; y: number } | null>(null);
  const startPosition = useRef<null | { x: number; y: number }>(null);

  const throttle = useThrottle();

  useEffect(() => {
    // if (!ref) {
    //   return;
    // }

    const handleMouseDown = (event: MouseEvent) => {
      if (event.target instanceof HTMLDivElement && event.target.id) {
        return;
      }

      startPosition.current = canvasDimensions;
      currentCoodinates.current = { x: event.clientX, y: event.clientY };
      // ref.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!startPosition.current || !currentCoodinates.current) {
        return;
      }

      const diffX =
        event.clientX - currentCoodinates.current.x + startPosition.current.x;
      const diffY =
        event.clientY - currentCoodinates.current.y + startPosition.current.y;

      setCanvasDimensions((prev) => ({
        ...prev,
        x: diffX,
        y: diffY,
      }));
    };

    const handleMouseUp = () => {
      startPosition.current = null;
      currentCoodinates.current = null;
      // ref.removeEventListener("mousemove", handleMouseMove);
    };

    const throttled = (event: MouseEvent) => {
      let shouldWait = false;

      if (shouldWait) {
        return;
      }

      handleMouseMove(event);
      console.log("throttle ");
      shouldWait = true;

      requestAnimationFrame(() => {
        shouldWait = false;
      });
    };

    document.addEventListener("mousedown", handleMouseDown);
    // document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", throttled);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      // document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousemove", throttled);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [canvasDimensions, ref, throttle]);

  return {
    translate: `translate(${canvasDimensions.x}px,${canvasDimensions.y}px)`,
    canvasDimensions,
    setCanvasDimensions,
  };
};
