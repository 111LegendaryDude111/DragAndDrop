import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ActionType, StoreActions } from "../store/useStore";
import { useChangeHeightBlock } from "./useChangeHeightBlock";

export const useDragAndDropLogic = ({
  dispatch,
  id,
  scale,
  text,
}: {
  dispatch: React.Dispatch<ActionType>;
  id: string;
  scale: number;
  text: string;
}): {
  elementRef: (element: HTMLDivElement | null) => void;
} => {
  const scaleValue = useRef(0);

  useLayoutEffect(() => {
    scaleValue.current = scale;
  });

  const elementFormCbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementFormCbRef.current;
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

  const cbRef = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;

    elementFormCbRef.current = element;
  }, []);

  useChangeHeightBlock({ ref: elementFormCbRef.current, text });

  return {
    elementRef: cbRef,
  };
};
