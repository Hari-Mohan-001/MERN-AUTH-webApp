import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/User";
import adminReducer from "./Admin/Admin"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer , admin:adminReducer });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools:true,
});

export const Persistor = persistStore(Store);
