import { useCallback, useLayoutEffect, useRef } from "react";
import { ActionType, StoreActions } from "../store/useStore";
import {
  Listener,
  addEventListeners,
  removeEventListeners,
} from "../utils/utils";

export const useDragAndDropLogic = ({
  dispatch,
  id,
  scale,
}: {
  dispatch: React.Dispatch<ActionType>;
  id: string;
  scale: number;
  text: string;
}): {
  elementRef: (element: HTMLElement | null) => void;
  refForText: HTMLElement | null;
} => {
  const scaleValue = useRef(0);

  useLayoutEffect(() => {
    scaleValue.current = scale;
  });

  const elementFromCbRef = useRef<HTMLElement | null>(null);

  const cbRefCleanup = useRef(() => {});
  const cbRef = useCallback(
    (element: HTMLElement | null) => {
      elementFromCbRef.current = element;
      if (!element) {
        cbRefCleanup.current();
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
      const arrayOfListeners: Listener[] = [
        {
          onElement: true,
          type: "mousedown",
          callback: mouseDown,
        },
        {
          onElement: false,
          type: "mousemove",
          callback: mouseMove,
        },
        {
          onElement: false,
          type: "mouseup",
          callback: mouseUp,
        },
      ];
      addEventListeners(element, arrayOfListeners);

      cbRefCleanup.current = () => {
        removeEventListeners(element, arrayOfListeners);
      };
    },
    [id, dispatch]
  );

  return {
    elementRef: cbRef,
    refForText: elementFromCbRef.current,
  };
};
