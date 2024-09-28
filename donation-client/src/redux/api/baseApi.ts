import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tanvir-foundation.onrender.com/api/v1",
    credentials: "include",  // Set globally
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
      query: (email) => `user-donation-stats?email=${encodeURIComponent(email)}`,
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
          body: formData,  // Send formData with file
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
