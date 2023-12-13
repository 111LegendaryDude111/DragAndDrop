import { useEffect, useRef } from "react";
import { ActionType, StoreActions, TicketType } from "../../store/useStore";

export const useDragAndDropLogic = ({
  position,
  dispatch,
  id,
}: {
  position: TicketType["currentPosition"];
  dispatch: React.Dispatch<ActionType>;
  id: string;
}): {
  elementRef: React.MutableRefObject<HTMLDivElement | null>;
} => {
  const ref = useRef<HTMLDivElement | null>(null);
  const currentPositionRef = useRef<{ x: number; y: number } | null>(null);
  const initialPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const mouseDown = (e: MouseEvent) => {
      // if (!position) {
      //   return;
      // }

      // initialPosition.current = { ...position };
      // console.log(position);
      // console.log("initialPosition:", { x: e.clientX, y: e.clientY });

      // dispatch({
      //   id,
      //   type: StoreActions.setInitialPosition,
      //   initialPosition: { x: e.offsetX, y: e.offsetY },
      // });
      initialPosition.current = position;

      currentPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const mouseMove = (e: MouseEvent) => {
      if (currentPositionRef.current && initialPosition.current) {
        const diffX = e.clientX - currentPositionRef.current.x;
        const diffY = e.clientY - currentPositionRef.current.y;
        // console.log(
        //   "diffX",
        //   diffX,
        //   "e.clientX",
        //   e.clientX,
        //   " currentPositionRef.current.x",
        //   currentPositionRef.current.x
        // );
        // console.log(
        //   "initialPosition.current",
        //   initialPosition.current?.x,
        //   initialPosition.current?.y
        // );
        const x = initialPosition.current.x + diffX;
        const y = initialPosition.current.y + diffY;

        dispatch({
          type: StoreActions.changePosition,
          currentPosition: { x, y },
          id,
        });
      }
    };

    const mouseUp = () => {
      currentPositionRef.current = null;
      initialPosition.current = null;
    };

    element.addEventListener("mousedown", mouseDown);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    return () => {
      element.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [dispatch, id, position]);

  return {
    elementRef: ref,
  };
};
