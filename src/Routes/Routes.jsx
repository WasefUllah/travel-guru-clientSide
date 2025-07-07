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
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Packages from "../Components/Packages/Packages";
import ViewBookings from "../Components/ViewBookings/ViewBookings";

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
        path: "/destinations",
        Component: Destinations,
      },
      {
        path: "/packages",
        Component: Packages,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <h1>hi this is dashboard</h1>,
      },
      {
        path: "/dashboard/addBookings",
        Component: AddBookings,
      },
      {
        path: "/dashboard/addDestinations",
        Component: AddDestinations,
      },
      {
        path: "/dashboard/addPackage",
        Component: AddPackage,
      },
      {
        path: "/dashboard/viewBookings",
        Component: ViewBookings,
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
