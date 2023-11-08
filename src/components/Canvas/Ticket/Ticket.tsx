import React, { FC, useEffect, useRef, useState } from "react";
import { ActionType, StoreActions, TicketType } from "../store/useStore";
import styles from "./styles.module.css";

type TicketProps = TicketType & { dispatch: React.Dispatch<ActionType> };

export const Ticket: FC<TicketProps> = ({ id, text, dispatch, position }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [flag, setFlag] = useState(false);

  const handler = () => {
    setFlag((prev) => !prev);
  };

  useEffect(() => {
    if (ref.current && position && flag) {
      //Изменение позиции элемента
      const { offsetLeft, offsetTop } = ref.current;
      const style = ref.current.style;
      style.transform = `translate(${position.x - offsetLeft - 75}px,${
        position.y - offsetTop - 20
      }px)`;
      style.boxShadow = `0px 0px 15px 5px red`;
    }
  }, [flag, position, text.length]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const cb = (e) => {
      console.log(e);
      if (e.key === "s") {
        setFlag(false);
        if (ref.current) ref.current.style.boxShadow = "none";
      }
    };

    window.addEventListener("keypress", cb);

    return () => {
      window.removeEventListener("keypress", cb);
    };
  }, []);

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
