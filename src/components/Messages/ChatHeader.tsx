import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton"; // import Skeleton
import { useRouter, useSearchParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { AppConfig } from "@/config";

const ChatHeader = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('friend');

    const { data, isLoading } = useGetUserByIdQuery(id as string, {
        skip: !id,
    });

    const handleClearFriendId = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('friend');
        router.push(`${window.location.pathname}?${params.toString()}`);
    };

    if (isLoading) {
        // Skeleton loader
        return (
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col space-y-2">
                        <Skeleton className="w-32 h-4 rounded" />
                        <Skeleton className="w-24 h-3 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    const friendData = data?.data;
    console.log(friendData)
    console.log(`${AppConfig.backendUrl}${friendData?.profile}`)
    return (
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={handleClearFriendId}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="relative">
                    <Avatar className="w-10 h-10 shadow-md">
                        <AvatarImage src={`${AppConfig.backendUrl}${friendData?.profile}` || ''} alt="profile" />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-medium uppercase">
                            {friendData?.firstName?.[0]}{friendData?.lastName?.[0]}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h2 className="font-semibold text-foreground">
                        {friendData?.firstName} {friendData?.lastName}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
