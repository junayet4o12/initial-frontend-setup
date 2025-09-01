"use client"

import React, { useState } from "react";
import ChatSidebarSingleUser from "./ChatSidebarSingleUser";
import { Input } from "../ui/input";
import { useGetAllConversationUsersQuery } from "@/redux/api/messageApi";

export default function ChatSidebar() {
  const { data, isLoading } = useGetAllConversationUsersQuery(undefined);
  const [search, setSearch] = useState("");

  if (isLoading) {
    return "";
  }

  const conversationUsers = data?.data || [];

  // ✅ filter based on firstName + lastName
  const filteredUsers = conversationUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className="w-full bg-white border-r border-gray-200 flex flex-col h-full ">
      {/* Header + Search */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        <div className="mt-3">
          <Input
            type="text"
            placeholder="Search Conversations"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((conversationUser) => (
            <ChatSidebarSingleUser
              key={conversationUser.id}
              conversationUser={conversationUser}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
}
