import * as ActionTypes from "./ActionType";

const initialState = [];

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FAVORITE_ADD:
      if (state.some((el) => el === action.payload)) {
        return state;
      } else {
        return state.concat(action.payload);
      }

    // case ActionTypes.FAVORITE_POST:
    //   return;
    default:
      return state;
  }
};
