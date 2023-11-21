import React, { FC, useEffect, useRef, useState } from "react";
import { TextArea } from "../../windgets/TextArea/TextArea";
import { ActionType, StoreActions, TicketType } from "../store/useStore";
import { useChangeHeightBlock } from "./hooks/useChangeHeightBlock";
import { useChangePosition } from "./hooks/useChangePosition";
import { useStopDragKeyPress } from "./hooks/useStopDragKeyPress";
import styles from "./styles.module.css";

type TicketProps = TicketType & { dispatch: React.Dispatch<ActionType> };

export const Ticket: FC<TicketProps> = ({ id, text, dispatch, position }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDrag, setIsDrag] = useState(false);
  const prevPostion = useRef({
    prevX: 0,
    prevY: 0,
  });
  const handler = () => {
    setIsDrag((prev) => !prev);
  };

  // useChangePosition({ ref: ref.current, isDrag, position });
  useStopDragKeyPress(setIsDrag, ref.current);
  useChangeHeightBlock({ ref: ref.current, text });

  /*
  Берем ласт точку и берем предыдущие координаты

*/
  const cb = (e: MouseEvent) => {
    // const x = position!.x - e.offsetX;
    // const y = position!.y - e.offsetY;
    const x = e.clientX - prevPostion.current.prevX;
    const y = e.clientY - prevPostion.current.prevY;
    dispatch({
      type: StoreActions.changePosition,
      position: { x, y },
      text,
      id,
    });
  };

  const mouseDown = (e: MouseEvent) => {
    document.addEventListener("mousemove", cb);
  };
  const mouseUp = (e: MouseEvent) => {
    prevPostion.current.prevX = e.clientX;
    prevPostion.current.prevY = e.clientY;
    document.removeEventListener("mousemove", cb);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousedown", mouseDown);
      document.addEventListener("mouseup", mouseUp);

      return () => {
        document.removeEventListener("mouseup", mouseUp);
      };
    }
  }, []);

  return (
    <div
      ref={ref}
      id={String(id)}
      onMouseDown={handler}
      style={{
        transform: `translate(${position?.x}px,${position?.y}px)`,
      }}
      className={styles.ticket}>
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
