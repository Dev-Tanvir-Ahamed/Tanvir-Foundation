// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; // Get token from the Redux state
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo);

        return {
          url: "/register",
          method: "POST",
          body: userInfo,
          credentials: "include",
        };
      },
    }),
    login: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo);

        return {
          url: "/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    // Fetch all donation posts
    getDonationPosts: builder.query({
      query: () => {
        return {
          url: "/donation-posts",
          method: "GET",
        };
      },
    }),
    // Fetch specific donation post by ID
    getDonationPost: builder.query({
      query: (_id) => {
        return {
          url: `/donation-posts/${_id}`,
          method: "GET",
        };
      },
    }),
    // Initiate donation process
    initialDonation: builder.mutation({
      query: (donationData) => {
        console.log("inside data", donationData);

        return {
          url: "/donate",
          method: "POST",
          body: donationData,
        };
      },
    }),
    getDonationByTransactionId: builder.query({
      query: (tran_id) => `/success/${tran_id}`,
    }),
    // Get donation status by transaction ID
    getUserDonationStats: builder.query({
      query: (email) => `user-donation-stats?email=${email}`,
    }),
    createDonationPost: builder.mutation({
      query: (donationPostData) => {
        console.log("baseApi", donationPostData);

        return {
          url: "/create-donation",
          method: "POST",
          body: donationPostData,
        };
      },
    }),
    getAllCreateDonationPost: builder.query({
      query: () => {
        return {
          url: "/show-donation",
          method: "GET",
        };
      },
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
} = baseApi;
