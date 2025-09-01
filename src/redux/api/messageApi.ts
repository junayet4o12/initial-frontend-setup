import { baseApi } from "./baseApi";
import { ConversationUser, TMessage, TResponseRedux } from "@/types";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Send message
    sendMessage: builder.mutation({
      query: (formData) => ({
        url: "/messages/send",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Message"],
    }),

    // Get conversation between two users
    getConversation: builder.query({
      query: (id: string) => ({
        url: `/messages/conversation/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TMessage[]>) => ({
        data: response.data,
      }),
      providesTags: ["Message"],
    }),

    // Get all conversation users
    getAllConversationUsers: builder.query({
      query: () => ({
        url: "/messages/conversation-list",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<ConversationUser[]>) => ({
        data: response.data,
      }),
      providesTags: ["Message"],
    }),

    // Mark message as read
    markMessageAsRead: builder.mutation({
      query: (messageId: string) => ({
        url: `/messages/mark-read/${messageId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),

    // Delete message
    deleteMessage: builder.mutation({
      query: (messageId: string) => ({
        url: `/messages/delete/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useGetAllConversationUsersQuery,
  useMarkMessageAsReadMutation,
  useDeleteMessageMutation,
} = messageApi;
