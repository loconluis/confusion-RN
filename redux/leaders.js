import * as ActionTypes from "./ActionType";

const initialState = {
  isLoading: false,
  errMess: null,
  leaders: [],
};

export const promotions = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LEADERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        leaders: [],
      };
    case ActionTypes.LEADERS_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaders: action.payload,
      };
    case ActionTypes.LEADERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        leaders: [],
      };
    default:
      return state;
  }
};
