import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomeView from "../views/HomeView.jsx";
import AllOrdersView from "../views/AllOrdersView.jsx";
import MakeOrderView from "../views/MakeOrderView.jsx";
import RegisterView from "../views/RegisterView.jsx";
import LoginView from "../views/LoginView.jsx";
import "./index.css";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
