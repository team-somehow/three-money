import AdminApproval from "../screens/Admin/AdminApproval";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home/Home";
import CreateAccount from "../screens/Accounts/CreateAccount";
import Admin from "../screens/Admin/Admin";
import DashboardDetails from "../screens/dashboard/DashboardDetails";
import DashboardLoan from "../screens/dashboard/DashboardLoan";
import Dashboard from "../screens/dashboard/Dashboard";
import DashboardApproveStatus from "../screens/dashboard/DashboardApproveStatus";
import DashboardLoanPayment from "../screens/dashboard/DashboardLoanPayment";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/admin",
        children: [
            {
                path: "/admin/approvals",
                element: <AdminApproval />,
            },
            {
                path: "/admin",
                element: <Admin />,
            },
        ],
    },
    {
        path: "/account",
        children: [
            {
                path: "/account/create",
                element: <CreateAccount />,
            },
        ],
    },
    {
        path: "/dashboard/approved-status",
        element: <DashboardApproveStatus />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard/details",
                element: <DashboardDetails />,
            },
            {
                path: "/dashboard/loan",
                element: <DashboardLoan />,
            },
            {
                path: "/dashboard/loan-payment",
                element: <DashboardLoanPayment />,
            },
        ],
    },
]);
