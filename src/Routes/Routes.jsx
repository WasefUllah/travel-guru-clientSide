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
import PackageOfSpecificDestination from "../Components/PackageOfSpecificDestination/PackageOfSpecificDestination";
import { baseUrl } from "../URL/baseUrl";
import Loader from "../Components/Loader/Loader";
import DestinationList from "../Components/DestinationList/DestinationList";
import PackageList from "../Components/PackageList/PackageList";
import PackageDetails from "../Components/PackageDetails/PackageDetails";
import Success from "../Components/Success/Success";
import Failed from "../Components/Failed/Failed";
import MyBookings from "../Components/MyBookings/MyBookings";
import PaymentHistory from "../Components/PaymentHistory/PaymentHistory";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ApprovePackage from "../Components/ApprovePackage/ApprovePackage";
import AllPackages from "../Components/AllPackages/AllPackages";

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
      {
        path: "/addBookings/:id",
        Component: AddBookings,
        loader: ({ params }) => fetch(`${baseUrl}/package/${params.id}`),
        hydrateFallbackElement: <Loader></Loader>,
      },
      {
        path: "/packageDetails/:id",
        Component: PackageDetails,
        loader: ({ params }) => fetch(`${baseUrl}/package/${params.id}`),
        hydrateFallbackElement: <Loader></Loader>,
      },
      {
        path: "/viewPackages/:id",
        Component: PackageOfSpecificDestination,
        loader: ({ params }) => fetch(`${baseUrl}/viewPackages/${params.id}`),
        hydrateFallbackElement: <Loader></Loader>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h1>hi this is dashboard</h1>,
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
      {
        path: "/dashboard/destinationList",
        Component: DestinationList,
      },
      {
        path: "/dashboard/packageList",
        Component: PackageList,
      },
      {
        path: "/dashboard/myBookings",
        Component: MyBookings,
      },
      {
        path: "/dashboard/paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/approvePackage",
        Component: ApprovePackage,
      },
      {
        path: "/dashboard/allPackages",
        Component: AllPackages,
      },
    ],
  },
  {
    path: "/success/:tranId",
    Component: Success,
  },
  {
    path: "/failed",
    Component: Failed,
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
