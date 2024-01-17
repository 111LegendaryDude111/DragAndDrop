import React, { FC } from "react";
import { TextArea } from "../../shared/TextArea/TextArea";
import { ActionType, StoreActions, TicketType } from "../store/useStore";
import styles from "./styles.module.css";
import { useDragAndDropLogic } from "../hooks/useDrapAndDropLogic";
import { useChangeHeightBlock } from "../hooks/useChangeHeightBlock";

type TicketProps = Omit<TicketType, "initialPosition"> & {
  dispatch: React.Dispatch<ActionType>;
  scale: number;
};

export const Ticket: FC<TicketProps> = ({
  id,
  text,
  dispatch,
  currentPosition,
  scale,
}) => {
  const { elementRef, refForText } = useDragAndDropLogic({
    dispatch,
    id,
    scale,
    text,
  });

  useChangeHeightBlock({ ref: refForText, text });

  return (
    <div
      ref={elementRef}
      id={String(id)}
      style={{
        transform: `translate(${currentPosition.x}px,${currentPosition.y}px)`,
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
      <pre>{JSON.stringify({ a: { b: { c: 5 } } }, null, 2)}</pre>
    </div>
  );
};
