import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';



const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
import { motion } from 'framer-motion'
import { DialogTitle } from '@radix-ui/react-dialog';
import { Dialog, DialogContent } from '../ui/dialog';
import { TMessage } from '@/types';
import { AppConfig } from '@/config';
interface ImageModalState {
    isOpen: boolean;
    images: string[];
    currentIndex: number;
}

export default function ChatBubble({ friend, message }: {
    friend: string | null,
    message: TMessage
}) {
    const isOwn = message.senderId !== friend;

    const handleImageClick = (images: string[], clickedImageIndex: number) => {
        setImageModal({
            isOpen: true,
            images,
            currentIndex: clickedImageIndex
        });
    };
    const [imageModal, setImageModal] = useState<ImageModalState>({
        isOpen: false,
        images: [],
        currentIndex: 0
    });

    const nextImage = () => {
        setImageModal(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.images.length
        }));
    };

    const prevImage = () => {
        setImageModal(prev => ({
            ...prev,
            currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
        }));
    };

    const closeModal = () => {
        setImageModal({
            isOpen: false,
            images: [],
            currentIndex: 0
        });
    };

    const fileUrls = message.fileUrls.map(item => `${AppConfig.backendUrl}${item}`)
    const renderMessageContent = (message: TMessage) => {
        return (
            <div>
                {/* Render images if message has files */}
                {fileUrls && fileUrls.length > 0 && (
                    <div className="mb-2">
                        {fileUrls.length === 1 ? (
                            // Single image view
                            <div className="relative rounded-lg overflow-hidden max-w-xs cursor-pointer">
                                <Image
                                    src={fileUrls[0]}
                                    alt="Shared image"
                                    width={300}
                                    height={200}
                                    className="object-cover"
                                    style={{ maxHeight: '200px', width: 'auto' }}
                                    onClick={() => handleImageClick(fileUrls!, 0)}
                                />
                            </div>
                        ) : (
                            // Multiple images view
                            <div
                                className={`grid gap-2 rounded-md overflow-hidden ${fileUrls.length === 4
                                    ? 'grid-cols-2'
                                    : 'grid-cols-2'
                                    }`}
                            >
                                {fileUrls.slice(0, 4).map((file, index) => (
                                    <div
                                        key={index}
                                        className={`relative overflow-hidden rounded-md w-[120px] aspect-square cursor-pointer`}
                                        onClick={() => handleImageClick(fileUrls!, index)}
                                    >
                                        <Image
                                            src={file}
                                            alt={`Shared image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        {index === 3 && fileUrls.length > 4 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold">
                                                +{fileUrls.length - 4}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Render text content */}
                {message.content && (
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                )}
            </div>
        );
    };
    return (
        <motion.div
            key={message.id}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'} transition-all duration-200`}
        >
            <div
                className={`max-w-xs lg:max-w-md  px-4 py-2 rounded-lg ${isOwn ? 'bg-primary text-white' : 'bg-gray-100 '
                    }`}
            >
                {renderMessageContent(message)}
                <p
                    className={`text-xs mt-1 ${!isOwn ? 'text-gray-500' : 'text-gray-300'}`}
                >
                    {formatTime(message?.createdAt)}
                </p>
            </div>
            <Dialog open={imageModal.isOpen} onOpenChange={closeModal}>
                <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 bg-black border-none">
                    <DialogTitle hidden />
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Navigation Buttons */}
                        {imageModal.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-all"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-all"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        {/* Current Image */}
                        {imageModal.images[imageModal.currentIndex] && (
                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                <Image
                                    src={imageModal.images[imageModal.currentIndex]}
                                    alt={`Image ${imageModal.currentIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>
                        )}

                        {/* Image Counter */}
                        {imageModal.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                                {imageModal.currentIndex + 1} of {imageModal.images.length}
                            </div>
                        )}

                        {/* Thumbnail Navigation */}
                        {imageModal.images.length > 1 && (
                            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[80%] overflow-x-auto p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                                {imageModal.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setImageModal(prev => ({ ...prev, currentIndex: index }))}
                                        className={`relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 ${index === imageModal.currentIndex ? 'ring-2 ring-orange-500' : 'opacity-60 hover:opacity-100'
                                            } transition-all`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}



