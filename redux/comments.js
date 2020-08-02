import * as ActionTypes from "./ActionType";

const initialState = {
  isLoading: false,
  errMess: null,
  comments: [],
};

export const comments = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        comments: [],
      };
    case ActionTypes.COMMENTS_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
      };
    case ActionTypes.COMMENT_ADD:
      let comment = {
        id: state.comments.length + 1,
        ...action.payload,
      };
      return {
        ...state,
        comments: [...state.comments, comment],
      };
    default:
      return state;
  }
};
