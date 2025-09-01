/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";
import { TResponse, User } from "@/types";
import { toast } from "sonner";
import { logout } from "../authSlice";
import { AppConfig } from "@/config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${AppConfig.backendUrl}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = (await baseQuery(args, api, extraOptions)) as TResponse<User>;

  if (result.error?.data?.message === "Expired token") {
    toast.error("Login Expired");
    api.dispatch(logout());
     window.location.href = '/auth/sign-in';
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithToken,
  tagTypes: ["User", "Category", "Product", "Message", 'Payment', 'Support'],
  endpoints: () => ({}),
});
