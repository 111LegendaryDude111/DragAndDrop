import React, { FC, useCallback, useEffect, useRef } from "react";
import { TextArea } from "../../windgets/TextArea/TextArea";
import { ActionType, StoreActions, TicketType } from "../store/useStore";
import { useChangeHeightBlock } from "./hooks/useChangeHeightBlock";
import styles from "./styles.module.css";

type TicketProps = TicketType & { dispatch: React.Dispatch<ActionType> };

export const Ticket: FC<TicketProps> = ({ id, text, dispatch, position }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useChangeHeightBlock({ ref: ref.current, text });

  const cb = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX - positionRef.current.x
      const y = e.clientY - positionRef.current.y
      dispatch({
        type: StoreActions.changePosition,
        position: { x, y },
        text,
        id,
      });
    },
    [dispatch, id, text]
  );

  const mouseDown = useCallback(() => {
    document.addEventListener("mousemove", cb);
  }, [cb]);

  const mouseUp = useCallback(() => {
    document.removeEventListener("mousemove", cb);
  }, [cb]);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.getBoundingClientRect());
      positionRef.current.x = ref.current.getBoundingClientRect().left;
      positionRef.current.y = ref.current.getBoundingClientRect().top;

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
