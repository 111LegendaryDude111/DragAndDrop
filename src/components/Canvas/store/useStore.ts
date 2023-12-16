import { useReducer } from "react";

export enum StoreActions {
  createTicket = "createTicket",
  changeText = "changeText",
  changePosition = "changePosition",
}

export type TicketType = {
  id: string;
  text: string;
  currentPosition: { x: number; y: number };
};

export type ChangePositionType = {
  // currentPosition: TicketType["currentPosition"];
  diffX: number,
  diffY:number,
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

export type ActionType = CreateTicketType | ChangeTextType | ChangePositionType;

function reducer(
  state: [] | TicketType[],
  action: ActionType
): [] | TicketType[] {
  switch (action.type) {
    case StoreActions.createTicket: {
      const { currentPosition, id, text } = action;
      return [
        ...state,
        {
          id: id,
          text: text,
          currentPosition: { x: currentPosition.x, y: currentPosition.y },
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
          const { diffX, diffY } = action
          //Тут принимать дифф
          return {
            ...el,
            currentPosition: { x: el.currentPosition.x + diffX, y: el.currentPosition.y + diffY },
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
