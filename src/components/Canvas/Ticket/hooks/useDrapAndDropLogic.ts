import { useEffect, useLayoutEffect, useRef } from "react";
import { ActionType, StoreActions } from "../../store/useStore";

export const useDragAndDropLogic = ({
  dispatch,
  id,
  scale,
}: {
  dispatch: React.Dispatch<ActionType>;
  id: string;
  scale: number;
}): {
  elementRef: React.MutableRefObject<HTMLDivElement | null>;
} => {
  const ref = useRef<HTMLDivElement | null>(null);
  const scaleValue = useRef(0);

  useLayoutEffect(() => {
    scaleValue.current = scale;
  });
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    let prevMousePosition: { x: number; y: number } | null = null;
    const mouseDown = (e: MouseEvent) => {
      prevMousePosition = { x: e.clientX, y: e.clientY };
    };

    const mouseMove = (e: MouseEvent) => {
      if (!prevMousePosition) {
        return;
      }
      const diffX = (e.clientX - prevMousePosition.x) / scaleValue.current;
      const diffY = (e.clientY - prevMousePosition.y) / scaleValue.current;
      dispatch({
        type: StoreActions.changePosition,
        id,
        diffX,
        diffY,
      });

      prevMousePosition = { x: e.clientX, y: e.clientY };
    };

    const mouseUp = () => {
      prevMousePosition = null;
    };

    element.addEventListener("mousedown", mouseDown);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    return () => {
      element.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [dispatch, id]);

  return {
    elementRef: ref,
  };
};
