import { createBrowserRouter } from "react-router-dom";
import Accounts from "../screens/DashboardDetails/Accounts";
import DashboardHome from "../screens/DashboardHome/DashboardHome";
import Enquiry from "../screens/DashboardDetails/Enquiry";
import Limit from "../screens/DashboardDetails/Limit";
import Payments from "../screens/DashboardDetails/Payments";
import Profile from "../screens/DashboardDetails/Profile";
import Home from "../screens/Home/Home";
import DashboardDetails from "../screens/DashboardDetails/DashboardDetails";
import Age from "../screens/DashboardDetails/Age";
import CreateAccount from "../screens/Account/CreateAccount";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },
  {
    path: "/dashboard/details",
    element: <DashboardDetails />,
    children: [
      {
        path: "/dashboard/details/payments",
        element: <Payments />,
      },
      {
        path: "/dashboard/details/age",
        element: <Age />,
      },
      {
        path: "/dashboard/details/limit",
        element: <Limit />,
      },
      {
        path: "/dashboard/details/accounts",
        element: <Accounts />,
      },
      {
        path: "/dashboard/details/enquiry",
        element: <Enquiry />,
      },
      {
        path: "/dashboard/details/profile",
        element: <Profile />,
      },
    ],
  },
]);
