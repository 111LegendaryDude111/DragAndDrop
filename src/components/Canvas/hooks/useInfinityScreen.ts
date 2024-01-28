import { useEffect, useState } from "react";
import { useRafThrottle } from "./useRafThrottle";

export const useInfinityScreen = (ref: HTMLDivElement | null) => {
  const [canvasDimensions, setCanvasDimensions] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const rafThrottle = useRafThrottle<MouseEvent>();

  useEffect(() => {
    if (!ref) {
      return;
    }

    let prevPosition: { x: number; y: number } | null = null;

    const handleMouseDown = (event: MouseEvent) => {
      prevPosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = rafThrottle((event: MouseEvent) => {
      if (!prevPosition) {
        return;
      }

      const diffX = event.clientX - prevPosition.x;
      const diffY = event.clientY - prevPosition.y;

      prevPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      setCanvasDimensions((prev) => ({
        ...prev,
        x: prev.x + diffX,
        y: prev.y + diffY,
      }));
    });

    const handleMouseUp = () => {
      prevPosition = null;
    };

    ref.addEventListener("mousedown", handleMouseDown);
    ref.addEventListener("mousemove", handleMouseMove);
    ref.addEventListener("mouseup", handleMouseUp);

    return () => {
      ref.removeEventListener("mouseup", handleMouseUp);
      ref.removeEventListener("mouseup", handleMouseMove);
      ref.removeEventListener("mousedown", handleMouseDown);
    };
  }, [rafThrottle, ref]);

  return {
    translate: `translate(${canvasDimensions.x}px,${canvasDimensions.y}px)`,
    canvasDimensions,
    setCanvasDimensions,
  };
};
