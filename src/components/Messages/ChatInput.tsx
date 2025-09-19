import { ImageIcon, Loader2, Paperclip, Send, X } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { useSendMessageMutation } from '@/redux/api/messageApi';
import { useDeleteAssetMutation, useUploadMultipleAssetsMutation } from '@/redux/api/assestApi';
import { AppConfig } from '@/config';
import { Skeleton } from '../ui/skeleton';

export default function ChatInput() {
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
    const [newMessage, setNewMessage] = useState("");
    const searchParams = useSearchParams();
    const [totalLoading, setTotalLoading] = useState(0)
    const selectedFriend = searchParams.get("friend");
    // const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [addAssets, { isLoading: addAssetIsLoading }] = useUploadMultipleAssetsMutation();
    const [deleteAssets, { isLoading: deleteAssetIsLoading }] = useDeleteAssetMutation();

    // Check if any files are currently uploading
    const isProcessingFiles = addAssetIsLoading || deleteAssetIsLoading;

    const removeFile = async (url: string) => {
        try {
            await deleteAssets(url).unwrap();
            const newFileUrls = fileUrls.filter(item => item !== url);
            setFileUrls(newFileUrls)
        } catch {

        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!newMessage.trim() && fileUrls.length === 0) || !selectedFriend)
            return;

        const messageData = {
            content: newMessage.trim(),
            receiverId: selectedFriend,
            fileUrls: fileUrls
        };

        try {
            await sendMessage(messageData);
            setNewMessage("");

            // Clean up preview URLs
            setFileUrls([])

            setFileUrls([]);
            // setShouldScrollToBottom(true);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const formData = new FormData();
        for (const i of files) {
            formData.append('files', i)
        };
        setTotalLoading(files.length)
        try {
            const result = await addAssets(formData).unwrap();
            const urls: { name: string, url: string }[] = result?.data?.urls || [];
            setFileUrls([...fileUrls, ...urls.map(item => item.url)])
            e.target.value = ''
            setTotalLoading(0)
        } catch {
            setTotalLoading(0)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
    };

    return (
        <div className="p-4 border-t border-gray-200 bg-white">
            {/* File Preview Area */}
            {(fileUrls.length > 0 || totalLoading > 0) && (
                <div className="">
                    <div className="flex items-center mb-2">
                        <ImageIcon className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">
                            {fileUrls.length} image
                            {fileUrls.length > 1 ? "s" : ""} selected
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
                        {fileUrls.map((filePreview, idx) => (
                            <div key={idx} className="relative group">
                                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200">
                                    <Image
                                        src={`${AppConfig.backendUrl}${filePreview}` || "/placeholder.svg"}
                                        alt="Preview"
                                        width={64}
                                        height={64}
                                        className={`object-cover w-full h-full`}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(filePreview)}
                                    disabled={isProcessingFiles || isSending}
                                    className={`absolute -top-2 -right-2 w-6 h-6 ${isProcessingFiles || isSending
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-red-500 hover:bg-red-600'
                                        } text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}

                        {
                            totalLoading ? Array.from({ length: totalLoading }).map((_, idx) => (
                                <Skeleton key={idx} className="w-16 h-16 rounded-lg" />
                            )) : ''
                        }
                    </div>
                </div>
            )}


            <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
                <div className="flex-shrink-0">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessingFiles || isSending}
                        className={`w-10 h-10 ${isProcessingFiles || isSending
                            ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            } rounded-full flex items-center justify-center transition-colors`}
                    >
                        {isProcessingFiles ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Paperclip className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <Textarea
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Message..."
                    className="flex-1 !min-h-9 max-h-30"
                    rows={1}
                />

                <button
                    type="submit"
                    disabled={
                        (!newMessage.trim() && fileUrls.length === 0) ||
                        isSending ||
                        isProcessingFiles
                    }
                    className={`w-10 h-10 ${isSending || isProcessingFiles || (!newMessage.trim() && fileUrls.length === 0)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90"
                        } text-white rounded-sm flex items-center justify-center transition-colors flex-shrink-0`}
                >
                    {isSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                </button>
            </form>
        </div>
    );
}