import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import appReducer from "../store/index.js";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App.jsx";

import "./index.css";
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, appReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER],
      },
    });
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
