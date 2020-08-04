import * as ActionTypes from "./ActionType";
import { baseURL } from "../shared/baseUrl";

// Comments
export const fetchComments = () => (dispatch) => {
  return fetch(`${baseURL}comments`)
    .then(
      (response) => {
        if (!response.ok) {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
        return response;
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((err) => dispatch(commentsFailed(err.message)));
};

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  type: ActionTypes.COMMENTS_ADD,
  payload: comments,
});

export const postComment = ({ author, comment, date, rating, dishId }) => (
  dispatch
) => {
  setTimeout(() => {
    dispatch(addComment({ author, comment, date, rating, dishId }));
  }, 2000);
};

export const addComment = (comment) => {
  return { type: ActionTypes.COMMENT_ADD, payload: comment };
};

// Dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());
  return fetch(`${baseURL}dishes`)
    .then(
      (response) => {
        if (!response.ok) {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
        return response;
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((err) => dispatch(dishesFailed(err.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errMess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.DISHES_ADD,
  payload: dishes,
});

// Promos
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(`${baseURL}promotions`)
    .then(
      (response) => {
        if (!response.ok) {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
        return response;
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((err) => dispatch(promosFailed(err.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errMess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.PROMOS_ADD,
  payload: promos,
});

// Leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(`${baseURL}leaders`)
    .then(
      (response) => {
        if (!response.ok) {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
        return response;
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((err) => dispatch(leadersFailed(err.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errMess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.LEADERS_ADD,
  payload: leaders,
});

// Favorites
export const postFavorite = (dishID) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(dishID));
  }, 2000);
};

export const addFavorite = (dishID) => ({
  type: ActionTypes.FAVORITE_ADD,
  payload: dishID,
});

export const deleteFavorite = (dishID) => {
  return {
    type: ActionTypes.FAVORITE_DELETE,
    payload: dishID,
  };
};
