import { useReducer } from "react";

export enum StoreActions {
  createTicket = "createTicket",
  changeText = "changeText",
}

export type ActionType = {
  type: StoreActions;
  text: string;
  id: string | number;
};

export type TicketType = {
  id: string | number;
  text: string;
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
  }
}

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, []);

  return {
    state,
    dispatch,
  };
};
