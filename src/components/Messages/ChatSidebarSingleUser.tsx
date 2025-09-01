"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { ConversationUser } from "@/types";
import { AppConfig } from "@/config";
export default function ChatSidebarSingleUser({ conversationUser }: { conversationUser: ConversationUser }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedFriend = searchParams.get("friend");

  // Navigate with friend in URL
  const onUserSelect = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("friend", conversationUser.id);
    router.push(url.pathname + "?" + url.searchParams.toString());
  };

  const isSelected = selectedFriend === conversationUser.id;

  return (
    <div
      key={conversationUser.id}
      onClick={onUserSelect}
      className={`flex pr-10 items-center relative p-4 hover:bg-secondary/5 cursor-pointer transition-colors ${isSelected ? "bg-secondary/10 border-r-3 border-secondary " : ""
        }`}
    >
     
      <div className="relative">
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative">
          {conversationUser?.profile ? (
            <Image
              src={`${AppConfig.backendUrl}${conversationUser?.profile}`}
              alt={`${conversationUser.firstName} ${conversationUser?.lastName}`}
              fill
              className="object-cover"
              sizes="40px"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-white font-medium absolute inset-0 ${conversationUser?.profile ? "hidden" : "flex"
              }`}
          >
            {conversationUser?.firstName[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">
            {conversationUser?.firstName} {conversationUser?.lastName}
          </p>
          <p className="text-xs">{new Date(conversationUser?.lastMessageAt).toLocaleDateString()}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
          {conversationUser?.lastMessage}
        </p>
      </div>
    </div>
  );
}
