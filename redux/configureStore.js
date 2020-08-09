import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { dishes } from "./dishes";
import { comments } from "./comments";
import { promos } from "./promotions";
import { leaders } from "./leaders";
import { favorites } from "./favorites";

export const ConfigureStore = () => {
  const config = {
    key: "root",
    storage,
    debug: true,
  };

  const store = createStore(
    persistCombineReducers(config, {
      dishes,
      comments,
      promos,
      leaders,
      favorites,
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
