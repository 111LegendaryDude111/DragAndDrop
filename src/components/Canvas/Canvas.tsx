import React, { FC } from "react";
import { Ticket } from "./Ticket/Ticket";
import { StoreActions, TicketType, useStore } from "./store/useStore";
import { useZoom } from "./Ticket/hooks/useZoom";
import { useInfinityScreen } from "./Ticket/hooks/useInfinityScreen";
import "./styles.css";
export const Canvas: FC = () => {
  const { state, dispatch } = useStore();

  const { scale } = useZoom();
  const { translate, currentCoodinates } = useInfinityScreen();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <button
        className="createButton"
        onClick={() => {
          dispatch({
            type: StoreActions.createTicket,
            text: "",
            id: new Date().toISOString(),
            currentPosition: currentCoodinates ?? { x: 0, y: 110 },
            initialPosition: { x: 0, y: 110 },
          });
        }}
      >
        + Create Elemet
      </button>

      <div
        style={{
          transform: `${translate} ${scale}`,
          transformOrigin: "top left",
        }}
        className="ticketsWrapper"
      >
        {state.map((el: TicketType) => {
          const { id, text, currentPosition } = el;

          return (
            <Ticket
              key={id}
              text={text}
              dispatch={dispatch}
              id={id}
              currentPosition={currentPosition}
            />
          );
        })}
      </div>
    </div>
  );
};
