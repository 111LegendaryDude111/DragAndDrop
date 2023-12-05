import React, { FC } from "react";
import { Ticket } from "./Ticket/Ticket";
import { StoreActions, TicketType, useStore } from "./store/useStore";
import { useZoom } from "./Ticket/hooks/useZoom";
import { useInfiniteScreen } from "./Ticket/hooks/useInfiniteScreen";

export const Canvas: FC = () => {
  const { state, dispatch } = useStore();

  const zoomStyles = useZoom();
  const canvasDimensions = useInfiniteScreen();

  return (
    <div
      style={{
        ...zoomStyles,
        width: `${canvasDimensions.width}vw`,
        height: `${canvasDimensions.height}vh`,
      }}
      className="canvas"
    >
      <button
        onClick={() => {
          dispatch({
            type: StoreActions.createTicket,
            text: "",
            id: new Date().toISOString(),
            position: { x: 116, y: 83 },
          });
        }}
      >
        + Create Elemet
      </button>
      <div>
        {state.map((el: TicketType) => {
          const { id, text, position } = el;

          return (
            <Ticket
              key={id}
              text={text}
              dispatch={dispatch}
              id={id}
              position={position}
            />
          );
        })}
      </div>
    </div>
  );
};
