import { useEffect, useRef, useState } from "react";

export const useZoom = (): {
  transform: string;
  transformOrigin: string;
} => {
  const [scale, setScale] = useState<number>(10);
  const zoomCornerFields = useRef<{ zoomIn: boolean; zoomOut: boolean }>({
    zoomIn: true,
    zoomOut: false,
  });

  useEffect(() => {
    const zoom = (e: WheelEvent) => {
      if (zoomCornerFields.current.zoomOut && e.deltaY > 0) {
        setScale((prevZoom) => prevZoom - 2);
      }

      if (zoomCornerFields.current.zoomIn && e.deltaY < 0) {
        setScale((prevZoom) => prevZoom + 2);
      }
    };

    const addScroll = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "control".toLowerCase()) {
        document.addEventListener("wheel", zoom);
      }
    };

    const deleteScroll = () => {
      document.removeEventListener("wheel", zoom);
    };

    document.addEventListener("keydown", addScroll);
    document.addEventListener("keyup", deleteScroll);
    return () => {
      document.removeEventListener("keydown", addScroll);
      document.removeEventListener("keyup", deleteScroll);
    };
  }, []);

  zoomCornerFields.current.zoomIn = scale < 100 ? true : false;
  zoomCornerFields.current.zoomOut = scale > 10 ? true : false;

  const zoomStyles = {
    transform: `scale(${scale * 0.1})`,
    transformOrigin: "top left",
  };

  return zoomStyles;
};
