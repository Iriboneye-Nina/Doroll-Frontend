import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  prepareHeaders: (headers, { endpoint }) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    // Auth endpoints
    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<
      {
        statusCode: number;
        message: string;
        error: any;
        access_token: string;
        user: any;
      },
      { email: string; password: string }
    >({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    forgetPassword: builder.mutation<any, { email: string }>({
      query: (emailData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),
    fetchUserProfile: builder.query<any, void>({
      query: () => "/auth/me", // Adjust this endpoint as necessary
    }),
    // Task management endpoints
    fetchTasks: builder.query<any, void>({
      query: () => "/todos/my-todos",
    }),
    addTask: builder.mutation<any, any>({
      query: (taskData) => ({
        url: "/todos",
        method: "POST",
        body: taskData,
      }),
    }),
    updateTask: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation<any, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation, 
  useFetchTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
