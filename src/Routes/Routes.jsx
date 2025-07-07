import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import NotFound from "../Components/NotFound/NotFound";
import Home from "../Components/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import AddBookings from "../Components/AddBookings/AddBookings";
import Destinations from "../Components/Destinations/Destinations";
import AddDestinations from "../Components/AddDestinations/AddDestinations";
import AddPackage from "../Components/AddPackage/AddPackage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "destinations",
        Component: Destinations,
      },
      {
        path: "/addBookings",
        Component: AddBookings,
      },
      {
        path: "/addDestinations",
        Component: AddDestinations,
      },
      {
        path: "/addPackage",
        Component: AddPackage,
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
