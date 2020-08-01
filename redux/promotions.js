import * as ActionTypes from "./ActionType";

const initialState = {
  isLoading: false,
  errMess: null,
  promos: [],
};

export const promos = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PROMOS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        promos: [],
      };
    case ActionTypes.PROMOS_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        promos: action.payload,
      };
    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        promos: [],
      };
    default:
      return state;
  }
};
