import React, { FC } from "react";
import { Ticket } from "./Ticket/Ticket";
import { StoreActions, TicketType, useStore } from "./store/useStore";
import { useZoom } from "./Ticket/hooks/useZoom";
import { useInfinityScreen } from "./Ticket/hooks/useInfinityScreen";
import "./styles.css";
export const Canvas: FC = () => {
  const { state, dispatch } = useStore();

  const { translate, canvasDimensions, setCanvasDimensions } =
    useInfinityScreen();
  const { scale } = useZoom({
    canvasDimensions,
    setCanvasDimensions,
  });

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
            currentPosition: {
              x: 100 - canvasDimensions.x,
              y: 110 - canvasDimensions.y,
            },
          });
        }}
      >
        + Create Elemet
      </button>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div
        style={{
          transform: `${translate} scale(${scale})`,
          transformOrigin: "top left",
          border: "1px solid red",
          width: 0,
          height: 0,
          position: "absolute",
        }}
        // className="ticketsWrapper"
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
              scale={scale}
            />
          );
        })}
      </div>
    </div>
  );
};
