import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  prepareHeaders: (headers, { endpoint }) => {
    // Add Authorization header only for 'tasks' related endpoints
    if (endpoint.includes("Task")) {
      const token = localStorage.getItem("access_token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

// Define the combined API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
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
          error: any; access_token: string; user: any 
},
      { email: string; password: string }
    >({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),

    // Task management endpoints
    fetchTasks: builder.query<any, void>({
      query: () => "/todos",
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
  useFetchTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;