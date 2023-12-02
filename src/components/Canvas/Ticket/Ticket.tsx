import React, { FC } from "react";
import { TextArea } from "../../windgets/TextArea/TextArea";
import { ActionType, StoreActions, TicketType } from "../store/useStore";
import { useChangeHeightBlock } from "./hooks/useChangeHeightBlock";
import styles from "./styles.module.css";
import { useDragAndDropLogic } from "./hooks/useDrapAndDropLogic";

type TicketProps = TicketType & { dispatch: React.Dispatch<ActionType> };

export const Ticket: FC<TicketProps> = ({ id, text, dispatch, position }) => {
  const { elementRef } = useDragAndDropLogic({ position, dispatch,id });
  useChangeHeightBlock({ ref: elementRef.current, text });
  return (
    <div
      ref={elementRef}
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
