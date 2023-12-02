import { useReducer } from "react";

export enum StoreActions {
  createTicket = "createTicket",
  changeText = "changeText",
  changePosition = "changePosition",
}

export type TicketType = {
  id: string;
  text: string;
  position: { x: number; y: number };
};

export type ChangePositionType = {
  position: TicketType["position"];
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
      const { position, id, text } = action;
      return [
        ...state,
        {
          id: id,
          text: text,
          position: { x: position.x, y: position.y },
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
        if (el.id === action.id && action.position) {
          const { x, y } = action.position;
          return {
            ...el,
            position: { x, y },
          };
        }
        return el;
      });
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
