import DonationSuccess from "@/components/DonationSuccess";
import MainLayout from "@/components/layouts/MainLayout";
import UserLoggedLayout from "@/components/layouts/UserLoggedLayout"; // Ensure correct casing
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import AllDonationPosts from "@/pages/AllDonationPosts";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import CampaignsPage from "@/pages/CampaignsPage";
import CommunityGratitudeWall from "@/pages/CommunityGratitudeWall";
import Contact from "@/pages/Contact";
import CreateDonationPost from "@/pages/CreateDonationPost";
import DashboardPage from "@/pages/DashboardPage";
import DonateNow from "@/pages/DonateNow";
import DonationLeaderBoard from "@/pages/DonationLeaderBoard";
import DonationPost from "@/pages/DonationPost";
import DonationsPage from "@/pages/DonationsPage";
import DonorsPage from "@/pages/DonorsPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import SettingsPage from "@/pages/SettingsPage";
import ShowCreateDonation from "@/pages/ShowCreateDonationPost";
import User from "@/pages/User";
import VolunteerRegistration from "@/pages/VolunteerRegistration";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

// Import Admin Dashboard Components

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home", // Explicitly specify the home route
        element: <Home />,
      },
      {
        path: "/", // Redirect "/" to "/home" if desired
        element: <Home />, // You could also use a Navigate component here to redirect
      },
      {
        path: "/donations/:_id", // Dynamic path for individual donations
        element: <DonationPost />,
      },
      {
        path: "/donations",
        element: <AllDonationPosts />,
      },
      {
        path: "/leaderboard",
        element: <DonationLeaderBoard />,
      },
      {
        path: "/community",
        element: <CommunityGratitudeWall />,
      },
      {
        path: "/volunteer-registration",
        element: <VolunteerRegistration />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserLoggedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <User />,
      },
      {
        path: "create-donation",
        element: <CreateDonationPost />,
      },
      {
        path: "show-createDonationPosts",
        element: <ShowCreateDonation />,
      },
    ],
  },
  // Admin Dashboard Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // Default route redirects to dashboard
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "donations",
        element: <DonationsPage />,
      },
      {
        path: "donors",
        element: <DonorsPage />,
      },
      {
        path: "campaigns",
        element: <CampaignsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/donate",
    element: <DonateNow />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/donation-success/:tran_id",
    element: <DonationSuccess />,
  },
]);
