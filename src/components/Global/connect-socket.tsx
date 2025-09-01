'use client'

import { useAppSelector } from '@/redux/store';
import { connectSocket, registerSocket } from '@/lib/socket';
import { useCurrentUser } from '@/redux/authSlice';
import { useEffect } from 'react';
export default function ConnectSocket() {
    const userData = useAppSelector(useCurrentUser);
    const userId = userData?.id
    useEffect(() => {
        connectSocket();
        if (userId) {
            registerSocket(userId);
        }
    }, [userId]);
    return ''
}