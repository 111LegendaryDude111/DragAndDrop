import React, { FC } from "react";
import { ActionType, StoreActions } from "../store/useStore";
import styles from "./styles.module.css";
import { onDragEnd, onDragStart } from "./utils";

type TicketProps = {
  dispatch: React.Dispatch<ActionType>;
  text: string;
  id: string | number;
};

export const Ticket: FC<TicketProps> = ({ id, text, dispatch }) => {
  return (
    <div
      id={String(id)}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={styles.ticket}>
      <textarea
        value={text}
        onChange={(e) => {
          dispatch({
            id: id,
            text: e.target.value,
            type: StoreActions.changeText,
          });
        }}
        placeholder="Write something ..."
        className={styles.textarea}
        autoFocus={true}
      />
    </div>
  );
};
