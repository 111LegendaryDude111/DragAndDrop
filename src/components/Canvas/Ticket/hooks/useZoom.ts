import { useEffect, useRef, useState } from "react";

export const useZoom = (): {
  scale: string;
} => {
  const [scale, setScale] = useState<number>(10);
  const zoomCornerFields = useRef<{ zoomIn: boolean; zoomOut: boolean }>({
    zoomIn: true,
    zoomOut: false,
  });
  useEffect(() => {
    const zoom = (e: WheelEvent) => {
      if (!e.ctrlKey) {
        return;
      }

      if (zoomCornerFields.current.zoomOut && e.deltaY > 0) {
        setScale((prevZoom) => prevZoom - 0.5);
      }

      if (zoomCornerFields.current.zoomIn && e.deltaY < 0) {
        setScale((prevZoom) => prevZoom + 0.5);
      }
    };

    document.addEventListener("wheel", zoom);

    return () => {
      document.removeEventListener("wheel", zoom);
    };
  }, []);

  zoomCornerFields.current.zoomIn = scale < 50 ? true : false;
  zoomCornerFields.current.zoomOut = scale > 10 ? true : false;

  return {
    scale: `scale(${scale * 0.1})`,
  };
};
