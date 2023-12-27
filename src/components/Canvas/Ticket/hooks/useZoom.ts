import { useEffect, useState } from "react";

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
    const zoom = (wheelEvent: WheelEvent) => {
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
    };

    const wrapper = (wheelEvent: WheelEvent) => {
      const callbackWrapper = () => {
        zoom(wheelEvent);
      };

      requestAnimationFrame(callbackWrapper);
    };

    document.addEventListener("wheel", wrapper);

    return () => {
      document.removeEventListener("wheel", wrapper);
    };
  }, [canvasDimensions, scale, setCanvasDimensions]);

  return {
    scale,
  };
};
