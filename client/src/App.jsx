import HomeView from "../views/HomeView.jsx";
import AllOrdersView from "../views/AllOrdersView.jsx";
import MakeOrderView from "../views/MakeOrderView.jsx";
import RegisterView from "../views/RegisterView.jsx";
import LoginView from "../views/LoginView.jsx";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const isAuth = useSelector((state) => state.token);
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
      element: !isAuth ? <RegisterView /> : <Navigate to="/"/>,
    },
    {
      path: "/login",
      element: !isAuth ? <LoginView /> : <Navigate to="/"/>,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
