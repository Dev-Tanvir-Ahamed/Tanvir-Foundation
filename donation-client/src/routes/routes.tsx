import DonationSuccess from "@/components/DonationSuccess";
import MainLayout from "@/components/layouts/MainLayout";
import UserLoggedLayout from "@/components/layouts/UserLoggedLayout"; // Ensure correct casing
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import AllDonationPosts from "@/pages/AllDonationPosts";

import CommunityGratitudeWall from "@/pages/CommunityGratitudeWall";
import CreateDonationPost from "@/pages/CreateDonationPost";
import DonateNow from "@/pages/DonateNow";
import DonationLeaderBoard from "@/pages/DonationLeaderBoard";
import DonationPost from "@/pages/DonationPost";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ShowCreateDonation from "@/pages/ShowCreateDonationPost";
import User from "@/pages/User";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

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
