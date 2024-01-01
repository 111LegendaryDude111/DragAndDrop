import React, { FC, useRef } from "react";
import { Ticket } from "./Ticket/Ticket";
import { StoreActions, TicketType, useStore } from "./store/useStore";
import { useZoom } from "./hooks/useZoom";
import { useInfinityScreen } from "./hooks/useInfinityScreen";
import "./styles.css";
export const Canvas: FC = () => {
  const { state, dispatch } = useStore();

  const ref = useRef<null | HTMLDivElement>(null);
  const { translate, canvasDimensions, setCanvasDimensions } =
    useInfinityScreen(ref.current);
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
        ref={ref}
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
          width: 0,
          height: 0,
          position: "absolute",
        }}
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
