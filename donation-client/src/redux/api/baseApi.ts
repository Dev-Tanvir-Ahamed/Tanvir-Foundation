import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://tanvir-foundation-server.vercel.app/api/v1"
    : "http://localhost:5000/api/v1"; // Localhost for development
export const baseApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include", // Set globally
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getDonationPosts: builder.query({
      query: () => ({
        url: "/donation-posts",
        method: "GET",
      }),
      // providesTags : ["donationPosts"]  // Cache tag for posts
    }),
    getDonationPost: builder.query({
      query: (_id) => ({
        url: `/donation-posts/${_id}`,
        method: "GET",
      }),
    }),
    initialDonation: builder.mutation({
      query: (donationData) => ({
        url: "/donate",
        method: "POST",
        body: donationData,
      }),
    }),
    getDonationByTransactionId: builder.query({
      query: (tran_id) => `/success/${tran_id}`,
    }),
    getUserDonationStats: builder.query({
      query: (email) =>
        `user-donation-stats?email=${encodeURIComponent(email)}`,
    }),
    createDonationPost: builder.mutation({
      query: (donationPostData) => {
        const formData = new FormData();
        for (const key in donationPostData) {
          formData.append(key, donationPostData[key]);
        }
        return {
          url: "/create-donation",
          method: "POST",
          body: formData, // Send formData with file
        };
      },
      // invalidatesTags: ['DonationPosts'],  // Invalidate posts cache
    }),
    getAllCreateDonationPost: builder.query({
      query: () => ({
        url: "/show-donation",
        method: "GET",
      }),
    }),
    getLeaderBoard: builder.query({
      query: ({ page, pageSize }) => ({
        url: "/leaderboard",
        method: "GET",
        params: { page, limit: pageSize },
      }),
    }),
    postGratitudeWall: builder.mutation({
      query: (message) => {
        return {
          url: "/community",
          method: "POST",
          body: message,
        };
      },
    }),
    getGratitudeWall: builder.query({
      query: () => ({
        url: "/community",
        method: "GET",
      }),
      // providesTags: ["Gratitude"], // Cache tag for posts
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetDonationPostsQuery,
  useGetDonationPostQuery,
  useInitialDonationMutation,
  useGetDonationByTransactionIdQuery,
  useGetUserDonationStatsQuery,
  useCreateDonationPostMutation,
  useGetAllCreateDonationPostQuery,
  useGetLeaderBoardQuery,
  usePostGratitudeWallMutation,
  useGetGratitudeWallQuery,
} = baseApi;
