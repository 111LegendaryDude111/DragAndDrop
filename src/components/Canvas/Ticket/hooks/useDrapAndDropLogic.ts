import { useEffect, useRef } from "react";
import { ActionType, StoreActions, TicketType } from "../../store/useStore";

export const useDragAndDropLogic = ({
  position,
  dispatch,
  id,
}: {
  position: TicketType["position"];
  dispatch: React.Dispatch<ActionType>;
  id: string;
}): {
  elementRef: React.MutableRefObject<HTMLDivElement | null>;
} => {
  const ref = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<{ x: number; y: number } | null>(null);
  const initialPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (ref.current) {
      const cb = (e: MouseEvent) => {
        if (positionRef.current && initialPosition.current) {
          const diffX = e.clientX - positionRef.current.x;
          const diffY = e.clientY - positionRef.current.y;

          const x = initialPosition.current.x + diffX;
          const y = initialPosition.current.y + diffY;

          dispatch({
            type: StoreActions.changePosition,
            position: { x, y },
            id,
          });
        }
      };

      const mouseDown = (e: MouseEvent) => {
        if (position) {
          initialPosition.current = { ...position! };
          positionRef.current = { x: e.clientX, y: e.clientY };
        }

        document.addEventListener("mousemove", cb);
      };

      const mouseUp = () => {
        positionRef.current = null;
        initialPosition.current = null;
        document.removeEventListener("mousemove", cb);
        if (ref.current) {
          ref.current.removeEventListener("mousedown", mouseDown);
        }
      };

      ref.current.addEventListener("mousedown", mouseDown);
      document.addEventListener("mouseup", mouseUp);

      return () => {
        document.removeEventListener("mouseup", mouseUp);
      };
    }
  }, [dispatch, id, position]);

  return {
    elementRef: ref,
  };
};
