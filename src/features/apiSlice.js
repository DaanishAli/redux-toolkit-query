import { IndeterminateCheckBox } from "@mui/icons-material";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
      }),
      providesTags: ["Post"],
    }),
    addNewPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: { ...post, comments: [] },
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ post, individualPost }) => ({
        url: `/posts/${individualPost.id}`,
        method: "PUT",
        body: { ...individualPost, post },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (individualPost) => ({
        url: `/posts/${individualPost.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    addNewComment: builder.mutation({
      query: ({ individualPost, comment, userName }) => ({
        url: `/comments/${individualPost.id}`,
        method: "PATCH",
        body: {
          ...individualPost,
          comments: [
            ...{
              userName: userName,
              comment: comment,
            },
          ],
        },
      }),
      invalidatesTags: ["Post"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Post"],
    }),
    addNewUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useGetUsersQuery,
  useAddNewUserMutation,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddNewCommentMutation,
  // useGetCommentQuery,
} = apiSlice;
