import { useEffect, useRef } from "react";

export const useMouseMoveOnDocument = () => {
  const ref = useRef({ documentX: 0, documentY: 0 });
  useEffect(() => {
    const cb = (e) => {
      console.log("document", e);
      ref.current.documentX = e.pageX;
      ref.current.documentY = e.pageY;
    };
    document.addEventListener("mousemove", cb);

    return () => {
      document.removeEventListener("mousemove", cb);
    };
  }, []);

  return ref;
};
