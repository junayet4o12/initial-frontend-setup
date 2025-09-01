'use client'
import Container from "../Global/Container"
import ProfilePicture from "./ProfilePicture"
import ProfileDetails from "./ProfileDetails"
import ProfilePassword from "./ProfilePassword"
import { useGetMeQuery } from "@/redux/api/userApi"
import { Skeleton } from "../ui/skeleton"

export default function Profile() {
    const { data, isLoading } = useGetMeQuery(undefined);
    if (isLoading) {
        return (
            <Container className="pb-20">
                <div className="bg-white rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-8 p-5">
                    {/* Profile Picture Skeleton */}
                    <div className="flex flex-col items-center border-2 max-w-max lg:max-w-full max-h-max py-5 lg:py-10 px-16 rounded-sm">
                        <Skeleton className="w-32 h-32 rounded-full" />
                        <Skeleton className="h-6 w-40 mt-4" />
                    </div>

                    {/* Profile Details and Password Skeleton */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Details Skeleton */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <Skeleton className="h-7 w-48" />
                                <Skeleton className="h-9 w-20" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-24 w-full" />
                                </div>
                            </div>
                        </div>

                        {/* Password Skeleton */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <Skeleton className="h-7 w-20" />
                                <Skeleton className="h-9 w-32" />
                            </div>
                            <Skeleton className="h-4 w-full max-w-md" />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
    const profileData = data?.data;
    const fullName = (profileData?.firstName || 'N') + ' ' + (profileData?.lastName || 'A');

    return (
        <Container className="pb-20 ">
            <div className="bg-white rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-8 p-5">
                <ProfilePicture profileImg={profileData?.profile} fullName={fullName} />
                <div className="lg:col-span-2 space-y-8">
                    <ProfileDetails userData={{
                        bio: profileData?.bio || '',
                        email: profileData?.email || '',
                        firstName: profileData?.firstName || '',
                        lastName: profileData?.lastName || '',
                        phoneNumber: profileData?.phoneNumber || ''
                    }} />
                    <ProfilePassword />
                </div>
            </div>
        </Container>
    )
}
