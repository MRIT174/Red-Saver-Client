import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import VolunteerDashboardLayout from "../layouts/VolunteerDashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import SearchDonors from "../pages/SearchDonors";
import DonationRequests from "../pages/DonationRequests";
import Funding from "../pages/FundingPage";
import Profile from "../pages/Profile";
import GiveFund from "../pages/GiveFund";
import AboutUs from "../pages/AboutUs";

import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";

import AdminDashboardHome from "../pages/AdminDashboard/AdminDashboardHome";
import AllUsers from "../pages/AdminDashboard/AllUsers";
import AllDonationRequests from "../pages/AdminDashboard/AllDonationRequests";

import DashboardHomePage from "../pages/VolunteerDashboard/DashboardHomePage";
import AllBloodDonationRequestPage from "../pages/VolunteerDashboard/AllBloodDonationRequestPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search-donors", element: <SearchDonors />, loader: () => fetch("/serviceCenters.json").then(res => res.json())},
      { path: "/donation-requests", element: <DonationRequests /> },
      { path: "/funding", element: <Funding /> },
      { path: "profile", element: <Profile />, loader: () => fetch("/serviceCenters.json").then(res => res.json()) },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register />, loader: () => fetch("/serviceCenters.json").then(res => res.json())},
      { path: "/give-fund", element: <GiveFund /> },
      {path: "/about-us", element: <AboutUs />},

    ],
  },

  // Donor Dashboard
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={["donor"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "", element: <DashboardHome /> },
          { path: "my-donation-requests", element: <MyDonationRequests /> },
          { path: "create-donation-request", element: <CreateDonationRequest />, loader: () => fetch("/serviceCenters.json").then(res => res.json())},
          { path: "profile", element: <Profile />, loader: () => fetch("/serviceCenters.json").then(res => res.json()) },
        ],
      },
    ],
  },

  // Admin Dashboard
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          { path: "", element: <AdminDashboardHome /> },
          { path: "all-users", element: <AllUsers /> },
          { path: "all-blood-donation-request", element: <AllDonationRequests /> },
          { path: "profile", element: <Profile />, loader: () => fetch("/serviceCenters.json").then(res => res.json()) },
        ],
      },
    ],
  },

  // Volunteer Dashboard
  {
    path: "/volunteer",
    element: <ProtectedRoute allowedRoles={["volunteer"]} />,
    children: [
      {
        element: <VolunteerDashboardLayout />,
        children: [
          { path: "", element: <DashboardHomePage /> },
          { path: "all-blood-donation-request", element: <AllBloodDonationRequestPage /> },
          { path: "profile", element: <Profile />, loader: () => fetch("/serviceCenters.json").then(res => res.json()) },
        ],
      },
    ],
  },
]);
