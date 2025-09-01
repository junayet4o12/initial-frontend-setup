import { baseApi } from "./baseApi";

const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Upload single asset
    uploadAsset: builder.mutation({
      query: (formData: FormData) => ({
        url: "/assets/upload",
        method: "POST",
        body: formData,
      }),
    }),

    // Upload multiple assets
    uploadMultipleAssets: builder.mutation({
      query: (formData: FormData) => ({
        url: "/assets/upload-multiple",
        method: "POST",
        body: formData,
      }),
    }),

    // Delete single asset
    deleteAsset: builder.mutation({
      query: (path: string) => ({
        url: "/assets/delete",
        method: "DELETE",
        body: { path: path },
      }),
    }),

    // Delete multiple assets
    deleteMultipleAssets: builder.mutation({
      query: (assetIds: string[]) => ({
        url: "/assets/delete-multiple",
        method: "DELETE",
        body: { ids: assetIds },
      }),
    }),

    // Update single asset
    updateAsset: builder.mutation({
      query: (formData: FormData) => ({
        url: "/assets/update",
        method: "PUT",
        body: formData,
      }),
    }),

    // Update multiple assets
    updateMultipleAssets: builder.mutation({
      query: (formData: FormData) => ({
        url: "/assets/update-multiple",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadAssetMutation,
  useUploadMultipleAssetsMutation,
  useDeleteAssetMutation,
  useDeleteMultipleAssetsMutation,
  useUpdateAssetMutation,
  useUpdateMultipleAssetsMutation,
} = assetApi;
