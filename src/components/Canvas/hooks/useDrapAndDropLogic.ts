import { useCallback, useLayoutEffect, useRef } from "react";
import { ActionType, StoreActions } from "../store/useStore";
import { Listener, removeEventListeners } from "../utils/utils";

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
  elementRef: (element: HTMLDivElement | null) => void;
  refForText: HTMLDivElement | null;
} => {
  const scaleValue = useRef(0);

  useLayoutEffect(() => {
    scaleValue.current = scale;
  });

  const elementFromCbRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const element = elementFormCbRef.current;
  //   if (!element) {
  //     return;
  //   }
  //   let prevMousePosition: { x: number; y: number } | null = null;
  //   const mouseDown = (e: MouseEvent) => {
  //     prevMousePosition = { x: e.clientX, y: e.clientY };
  //   };

  //   const mouseMove = (e: MouseEvent) => {
  //     if (!prevMousePosition) {
  //       return;
  //     }
  //     const diffX = (e.clientX - prevMousePosition.x) / scaleValue.current;
  //     const diffY = (e.clientY - prevMousePosition.y) / scaleValue.current;
  //     dispatch({
  //       type: StoreActions.changePosition,
  //       id,
  //       diffX,
  //       diffY,
  //     });

  //     prevMousePosition = { x: e.clientX, y: e.clientY };
  //   };

  //   const mouseUp = () => {
  //     prevMousePosition = null;
  //   };

  //   element.addEventListener("mousedown", mouseDown);
  //   document.addEventListener("mousemove", mouseMove);
  //   document.addEventListener("mouseup", mouseUp);

  //   return () => {
  //     element.removeEventListener("mousedown", mouseDown);
  //     document.removeEventListener("mousemove", mouseMove);
  //     document.removeEventListener("mouseup", mouseUp);
  //   };
  // }, [dispatch, id]);

  const cbRef = useCallback(
    (element: HTMLDivElement | null) => {
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

      if (element) {
        // addEventListeners(element, arrayOfListeners);
        element.addEventListener("mousedown", mouseDown);
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
        elementFromCbRef.current = element;
      }

      if (!element && elementFromCbRef.current) {
        removeEventListeners(elementFromCbRef.current, arrayOfListeners);
      }
    },
    [dispatch, id]
  );

  return {
    elementRef: cbRef,
    refForText: elementFromCbRef.current,
  };
};
