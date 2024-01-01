import { useEffect, useState } from "react";

export const useInfinityScreen = (ref: HTMLDivElement | null) => {
  const [canvasDimensions, setCanvasDimensions] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref) {
      return;
    }

    const rafThrottle = (callback: (event: MouseEvent) => void) => {
      let timerId: number | null = null;
      let latestArgs: MouseEvent | null = null;

      return <T extends MouseEvent>(args: T) => {
        latestArgs = args;
        if (timerId !== null) {
          return;
        }
        callback(latestArgs);
        timerId = requestAnimationFrame(() => {
          timerId = null;
        });
      };
    };

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
  }, [ref]);

  return {
    translate: `translate(${canvasDimensions.x}px,${canvasDimensions.y}px)`,
    canvasDimensions,
    setCanvasDimensions,
  };
};
