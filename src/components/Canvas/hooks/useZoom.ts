import { useEffect, useState } from "react";
import { rafThrottled } from "../utils/utils";

type Coordinates = { x: number; y: number };
type UseZoomProps = {
  canvasDimensions: Coordinates;
  setCanvasDimensions: React.Dispatch<React.SetStateAction<Coordinates>>;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

const calm = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const useZoom = ({
  canvasDimensions,
  setCanvasDimensions,
}: UseZoomProps) => {
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const zoom = rafThrottled((wheelEvent: WheelEvent) => {
      if (!wheelEvent.ctrlKey) {
        return;
      }

      const diff = wheelEvent.deltaY > 0 ? -0.02 : 0.02;
      const newScale = calm(diff + scale, MIN_ZOOM, MAX_ZOOM);

      const distanceX = wheelEvent.clientX - canvasDimensions.x;
      const distanceXAfterScaleUpdate = (distanceX / scale) * newScale;
      const diffX = distanceXAfterScaleUpdate - distanceX;

      const distanceY = wheelEvent.clientY - canvasDimensions.y;
      const distanceYAfterScaleUpdate = (distanceY / scale) * newScale;
      const diffY = distanceYAfterScaleUpdate - distanceY;

      setScale(newScale);
      setCanvasDimensions((prev) => ({
        ...prev,
        x: prev.x - diffX,
        y: prev.y - diffY,
      }));
    });

    document.addEventListener("wheel", zoom);

    return () => {
      document.removeEventListener("wheel", zoom);
    };
  }, [canvasDimensions, rafThrottled, scale, setCanvasDimensions]);

  return {
    scale,
  };
};
