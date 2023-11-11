import React, { FC, useRef, useState } from "react";
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

  const handler = () => {
    setIsDrag((prev) => !prev);
  };

  useChangePosition({ ref: ref.current, isDrag, position });
  useStopDragKeyPress(setIsDrag, ref.current);
  useChangeHeightBlock({ ref: ref.current, text });

  return (
    <div
      ref={ref}
      id={String(id)}
      onMouseDown={handler}
      onMouseMove={(e) => {
        dispatch({
          type: StoreActions.changePosition,
          position: { x: e.pageX, y: e.pageY },
          text,
          id,
        });
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = `none`;
        handler();
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
