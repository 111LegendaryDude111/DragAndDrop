import React, { FC } from "react";
import { Ticket } from "../Ticket/Ticket";
import { StoreActions, TicketType, useStore } from "./store/useStore";

export const Canvas: FC = () => {
  const { state, dispatch } = useStore();

  return (
    <>
      <button
        onClick={() => {
          dispatch({
            type: StoreActions.createTicket,
            text: "",
            id: new Date().toISOString(),
          });
        }}>
        + Create Elemet
      </button>
      <div style={{ width: "100vw", height: "100vh" }}>
        {state.map((el: TicketType) => {
          const { id, text } = el;

          return <Ticket key={id} text={text} dispatch={dispatch} id={id} />;
        })}
      </div>
    </>
  );
};
