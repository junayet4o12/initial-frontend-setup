"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { socket } from "@/lib/socket";
import { useGetConversationQuery } from "@/redux/api/messageApi";
import { TMessage } from "@/types";
import { Skeleton } from "../ui/skeleton"; // import ShadCN skeleton

export default function ChatWindow() {
  const searchParams = useSearchParams();
  const [localMessages, setLocalMessages] = useState<TMessage[]>([]);
  const friendId = searchParams.get("friend");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetConversationQuery(friendId as string, {
    skip: !friendId,
  });

  useEffect(() => {
    const handleMessage = (message: TMessage) => {
      setLocalMessages((prev) => [...prev, message]);
    };

    if (socket) {
      socket.on("message", handleMessage);
    }

    return () => {
      if (socket) {
        socket.off("message", handleMessage);
      }
    };
  }, []);

  useEffect(() => {
    const conversation: TMessage[] = data?.data || [];
    if (conversation) {
      setLocalMessages(conversation);
    }
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  return (
    <div className="flex flex-col h-full relative">
      <ChatHeader />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading
          ? // Render 5 skeletons as placeholders
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex justify-start"
              >
                <Skeleton className="w-full max-w-md h-12 rounded-lg" />
              </div>
            ))
          : localMessages?.map((message) => (
              <ChatBubble key={message.id} message={message} friend={friendId} />
            ))}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
}
