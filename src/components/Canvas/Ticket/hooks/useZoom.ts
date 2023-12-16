import { useEffect, useRef, useState } from "react";

type Coordinates = { x: number; y: number };
type UseZoomProps = {
  canvasDimensions: Coordinates;
  setCanvasDimensions: React.Dispatch<React.SetStateAction<Coordinates>>;
};

export const useZoom = ({
  canvasDimensions,
  setCanvasDimensions,
}: UseZoomProps) => {
  const [scale, setScale] = useState<number>(1);
  const zoomCornerFields = useRef<{ zoomIn: boolean; zoomOut: boolean }>({
    zoomIn: true,
    zoomOut: false,
  });

  useEffect(() => {
    const zoom = (e: WheelEvent) => {
      if (!e.ctrlKey) {
        return;
      }

      let newScale = scale;

      if (zoomCornerFields.current.zoomOut && e.deltaY > 0) {
        newScale = scale - 0.02;
      }

      if (zoomCornerFields.current.zoomIn && e.deltaY < 0) {
        newScale = scale + 0.02;
      }

      const distanceX = e.clientX - canvasDimensions.x;
      const distanceXAfterScaleUpdate = (distanceX / scale) * newScale;
      const diffX = distanceXAfterScaleUpdate - distanceX;

      const distanceY = e.clientY - canvasDimensions.y;
      const distanceYAfterScaleUpdate = (distanceY / scale) * newScale;
      const diffY = distanceYAfterScaleUpdate - distanceY;

      setScale(newScale);
      setCanvasDimensions((prev) => ({
        ...prev,
        x: prev.x - diffX,
        y: prev.y - diffY,
      }));
    };

    document.addEventListener("wheel", zoom);

    return () => {
      document.removeEventListener("wheel", zoom);
    };
  }, [canvasDimensions, scale, setCanvasDimensions]);

  zoomCornerFields.current.zoomIn = scale < 5 ? true : false;
  zoomCornerFields.current.zoomOut = scale > 1 ? true : false;

  return {
    scale: `scale(${scale})`,
  };
};
