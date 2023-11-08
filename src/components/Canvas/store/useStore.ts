import { useReducer } from "react";

export enum StoreActions {
  createTicket = "createTicket",
  changeText = "changeText",
  changePosition = "changePosition",
}

export type ActionType = {
  type: StoreActions;
  text: string;
  id: string | number;
  position?: { x: number; y: number };
};

export type TicketType = {
  id: string | number;
  text: string;
  position?: { x: number; y: number };
};

function reducer(state: [] | TicketType[], action: ActionType) {
  switch (action.type) {
    case StoreActions.createTicket: {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
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
