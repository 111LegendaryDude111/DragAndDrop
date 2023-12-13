import { useReducer } from "react";

export enum StoreActions {
  createTicket = "createTicket",
  changeText = "changeText",
  changePosition = "changePosition",
  setInitialPosition = "setInitialPosition",
}

export type TicketType = {
  id: string;
  text: string;
  currentPosition: { x: number; y: number };
  initialPosition: { x: number; y: number };
};

export type ChangePositionType = {
  currentPosition: TicketType["currentPosition"];
  id: string;
} & {
  type: StoreActions.changePosition;
};

export type ChangeTextType = {
  text: TicketType["text"];
  id: string;
} & {
  type: StoreActions.changeText;
};

export type CreateTicketType = TicketType & {
  text: string;
} & {
  type: StoreActions.createTicket;
};

export type SetInitialPositionType = {
  id: string;
  initialPosition: TicketType["initialPosition"];
} & {
  type: StoreActions.setInitialPosition;
};

export type ActionType =
  | CreateTicketType
  | ChangeTextType
  | ChangePositionType
  | SetInitialPositionType;
  
function reducer(
  state: [] | TicketType[],
  action: ActionType
): [] | TicketType[] {
  switch (action.type) {
    case StoreActions.createTicket: {
      const { currentPosition, id, text, initialPosition } = action;
      return [
        ...state,
        {
          id: id,
          text: text,
          currentPosition: { x: currentPosition.x, y: currentPosition.y },
          initialPosition: { x: initialPosition.x, y: initialPosition.y },
        },
      ];
    }
    case StoreActions.changeText: {
      return state.map((el) => {
        if (el.id === action.id) {
          return {
            ...el,
            text: action.text,
          };
        }
        return el;
      });
    }
    case StoreActions.changePosition: {
      return state.map((el) => {
        if (el.id === action.id) {
          const { x, y } = action.currentPosition;
          // const { x: initialX, y: initialY } = el.initialPosition;

          // const x = diffX + el.initialPosition.x; // + initialPosition.x
          // const y = diffY + el.initialPosition.y; // + initialPosition.y

          // console.log("el.initialPosition", el.initialPosition);
          // const x = diffX + 116; // + initialPosition.x
          // const y = diffY + 83;
          return {
            ...el,
            currentPosition: { x, y },
            // initialPosition: action.currentPosition,
          };
        }
        return el;
      });
    }
    case StoreActions.setInitialPosition: {
      return state.map((el) => {
        if (el.id === action.id) {
          return {
            ...el,
            initialPosition: action.initialPosition,
          };
        }
        return el;
      });
    }

    default: {
      return state;
    }
  }
}

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, []);

  return {
    state,
    dispatch,
  };
};
