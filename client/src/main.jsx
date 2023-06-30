import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomeView from "../views/HomeView.jsx";
import AllOrdersView from "../views/AllOrdersView.jsx";
import MakeOrderView from "../views/MakeOrderView.jsx";
import RegisterView from "../views/RegisterView.jsx";
import LoginView from "../views/LoginView.jsx";
import { configureStore } from "@reduxjs/toolkit";
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
import "./index.css";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, appReducer);
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/orders",
    element: <AllOrdersView />,
  },
  {
    path: "/makeorder",
    element: <MakeOrderView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
]);

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
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
