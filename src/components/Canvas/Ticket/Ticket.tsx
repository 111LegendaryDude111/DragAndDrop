import React, { FC, useCallback, useEffect, useRef } from "react";
import { TextArea } from "../../windgets/TextArea/TextArea";
import { ActionType, StoreActions, TicketType } from "../store/useStore";
import { useChangeHeightBlock } from "./hooks/useChangeHeightBlock";
import styles from "./styles.module.css";

type TicketProps = TicketType & { dispatch: React.Dispatch<ActionType> };

export const Ticket: FC<TicketProps> = ({ id, text, dispatch, position }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<{ x: number; y: number } | null>(null);
  const initialPosition = useRef<{ x: number; y: number } | null>(null);
  useChangeHeightBlock({ ref: ref.current, text });

  const cb = useCallback(
    (e: MouseEvent) => {
      if (positionRef.current && initialPosition.current) {
        const diffX = e.clientX - positionRef.current.x;
        const diffY = e.clientY - positionRef.current.y;

        const x = initialPosition.current.x + diffX;
        const y = initialPosition.current.y + diffY;

        dispatch({
          type: StoreActions.changePosition,
          position: { x, y },
          text,
          id,
        });
      }
    },
    [dispatch, id, text]
  );

  const mouseDown = useCallback(
    (e: MouseEvent) => {
      if (position) {
        initialPosition.current = { ...position! };
        positionRef.current = { x: e.clientX, y: e.clientY };
      }

      document.addEventListener("mousemove", cb);
    },
    [cb, position]
  );

  const mouseUp = useCallback(() => {
    positionRef.current = null;
    initialPosition.current = null;
    document.removeEventListener("mousemove", cb);
  }, [cb]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousedown", mouseDown);
      document.addEventListener("mouseup", mouseUp);

      return () => {
        document.removeEventListener("mouseup", mouseUp);
      };
    }
  }, [mouseDown, mouseUp]);

  return (
    <div
      ref={ref}
      id={String(id)}
      style={{
        transform: `translate(${position?.x}px,${position?.y}px)`,
      }}
      className={styles.ticket}
    >
      <TextArea
        id={id}
        text={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          dispatch({
            id: id,
            text: e.target.value,
            type: StoreActions.changeText,
          });
        }}
      />
    </div>
  );
};
