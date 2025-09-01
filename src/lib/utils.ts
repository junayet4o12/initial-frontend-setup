import { clsx, type ClassValue } from "clsx"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const blurPlaceHolder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmZmZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiNmNWY1ZjUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPgo8L3N2Zz4K'


export const handleSetSearchParams = (
  values: Record<string, string>,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  endpoints?: string
) => {
  const params = new URLSearchParams(searchParams.toString());

  for (const [key, value] of Object.entries(values)) {
    if (value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }
  if (endpoints) {
    router.push(`${endpoints}/?${params.toString()}`, { scroll: false });
  } else {
    router.push(`?${params.toString()}`, { scroll: false });
  }

};