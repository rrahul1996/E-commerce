import { compose, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// import { cartReducer, authReducer } from "./reducers/CartReducer";
import persistStore from "redux-persist/es/persistStore";
import { cartReducer } from "./reducers/CartReducer";
import { authReducer } from "./reducers/authReducer";
import { shippingAddressReducer } from "./reducers/shippingAddressReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};


const reducer = combineReducers({
  cart: cartReducer,
  user: authReducer,
  shippingAddress: shippingAddressReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: persistedReducer,
  composeEnhancers,
});

const Persistor = persistStore(store);

export { Persistor };
export default store;
