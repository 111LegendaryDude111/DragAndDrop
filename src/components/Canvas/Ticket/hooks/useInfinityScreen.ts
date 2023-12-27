import { useEffect, useState } from "react";

const rafThrottle = (cb) => {
  let rafId: number | null = null;
  let latestArgs = null;
  return (...args) => {
    latestArgs = args;
    if (rafId !== null) {
      return;
    }
    cb(...latestArgs);

    rafId = requestAnimationFrame(() => {
      rafId = null;
    });
  };
};

export const useInfinityScreen = (ref: HTMLDivElement | null) => {
  const [canvasDimensions, setCanvasDimensions] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref) {
      return;
    }

    let prevCoords: { x: number; y: number } | null = null;

    const handleMouseDown = (event: MouseEvent) => {
      prevCoords = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = rafThrottle((event: MouseEvent) => {
      if (!prevCoords) {
        return;
      }

      const diffX = event.clientX - prevCoords.x;
      const diffY = event.clientY - prevCoords.y;

      prevCoords = {
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
      prevCoords = null;
    };

    ref.addEventListener("mousedown", handleMouseDown);
    ref.addEventListener("mousemove", handleMouseMove);
    ref.addEventListener("mouseup", handleMouseUp);

    return () => {
      ref.removeEventListener("mouseup", handleMouseUp);
      ref.removeEventListener("mousemove", handleMouseMove);
      ref.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref]);

  return {
    translate: `translate(${canvasDimensions.x}px,${canvasDimensions.y}px)`,
    canvasDimensions,
    setCanvasDimensions,
  };
};
