"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCurrentToken, logout } from "@/redux/authSlice";
import { useGetMeQuery } from "@/redux/api/userApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AppConfig } from "@/config";
import defaultUser from "@/assets/user.png";

// icons
import { User, LayoutDashboard, LogOut } from "lucide-react";

export default function NavProfile() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading } = useGetMeQuery(undefined, { skip: !token });

  const profileUrl = data?.data?.profile
    ? `${AppConfig.backendUrl}${data.data.profile}`
    : undefined;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  return (
    <DropdownMenu >
      <DropdownMenuTrigger  asChild>
        {isLoading ? (
          <Skeleton className="h-11 w-11 rounded-full" />
        ) : (
          <Avatar className="w-11 h-11 bg-gray-300 cursor-pointer">
            <AvatarImage
              className="object-cover"
              src={profileUrl ? profileUrl : defaultUser.src}
              alt="Profile"
            />
            <AvatarFallback>
              {data?.data?.firstName?.slice(0, 1) || "N"}
              {data?.data?.lastName?.slice(0, 1) || "A"}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end"  className="w-44">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <User size={16} /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 cursor-pointer"
        >
          <LogOut size={16} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
