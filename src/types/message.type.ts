import { User } from ".";

export interface TMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content?: string | null;
  fileUrls: string[];
  isRead: boolean;
  createdAt: string;
  updatedAt: string;

  sender?: User;
  receiver?: User;
}

export type ConversationUser = {
  id: string;
  firstName: string;
  lastName: string;
  profile?: string;
  email: string;
  lastMessage?: string;
  lastMessageAt: string;
};
