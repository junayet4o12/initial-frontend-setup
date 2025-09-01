"use client";

import Container from "../Global/Container";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useSearchParams } from "next/navigation";

export default function ChatApp() {
  const searchParams = useSearchParams();
  const selectedFriend = searchParams.get("friend");

  return (
    <Container className="flex h-[80vh] pb-20">
      <div style={{ boxShadow: "0px 0px 16px 0px rgba(37, 99, 235, 0.1)" }} className="flex w-full h-full bg-white rounded-lg overflow-hidden">
        <div
          className={`h-full w-full md:w-105 bg-white ${selectedFriend && "hidden md:block"
            }`}
        >
          <ChatSidebar />
        </div>
        {
          !selectedFriend ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50 border-l border-gray-200">
              <div className="text-center px-6">
                <div className="mb-4">
                  <svg 
                    className="mx-auto h-16 w-16 text-gray-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1} 
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No conversation selected
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Choose a friend from the sidebar to start chatting and catch up on your conversations.
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`h-full w-full bg-white ${!selectedFriend && "hidden md:block"
                } `}
            >
              <ChatWindow />
            </div>
          )
        }
      </div>
    </Container>
  );
}