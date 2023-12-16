import { useEffect, useRef, useState } from "react";

export const useInfinityScreen = () => {
  const [canvasDimensions, setCanvasDimensions] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const currentCoodinates = useRef<{ x: number; y: number } | null>(null);
  const startPosition = useRef<null | { x: number; y: number }>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      //@ts-ignore
      if (event.target.id) {
        return;
      }

      startPosition.current = canvasDimensions;
      currentCoodinates.current = { x: event.clientX, y: event.clientY };
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
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [canvasDimensions]);

  return {
    translate: `translate(${canvasDimensions.x}px,${canvasDimensions.y}px)`,
    currentCoodinates: currentCoodinates.current,
    canvasDimensions,
  };
};
