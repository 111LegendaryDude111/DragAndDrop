import { useEffect, useRef, useState } from "react";

export const useInfiniteScreen = (): {
  width: number;
  height: number;
} => {
  const [isDragging, setIsDragging] = useState(false);

  const initialPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [canvasDimensions, setCanvasDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 90,
    height: 90,
  });

  useEffect(() => {
    const handleMouseDown = (event: any) => {
      if (event.target.id) {
        return;
      }

      setIsDragging(true);

      initialPos.current.x = event.screenX;
      initialPos.current.y = event.screenY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.screenX - initialPos.current.x;
      const deltaY = event.screenY - initialPos.current.y;

      setCanvasDimensions((prev) => ({
        ...prev,
        width: -deltaX,
        height: -deltaY,
      }));

      window.scrollBy(-deltaX, -deltaY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDragging]);

  return canvasDimensions;
};
