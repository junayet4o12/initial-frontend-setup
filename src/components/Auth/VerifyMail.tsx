'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Title from '../Global/Title';
import Subtitle from '../Global/Subtitle';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { useVerifyEmailMutation } from '@/redux/api/userApi';

export default function VerifyMail() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [verify, { isLoading }] = useVerifyEmailMutation();
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState(false);

    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatusMessage('Token not found.');
            setError(true);
            return;
        }

        const verifyEmail = async () => {
            try {
                await verify({ token }).unwrap();
                toast.success('Your email has been successfully verified.');
                router.push('/');
            } catch {
                setStatusMessage('Email verification failed.');
                setError(true);
            }
        };

        verifyEmail();
    }, [token, verify, router]);

    return (
        <div className="w-full max-w-md text-center">
            <div className="pb-5">
                <Title>Email Verification</Title>
                {statusMessage && <Subtitle>{statusMessage}</Subtitle>}
            </div>

            {isLoading && (
                <div className="flex flex-col items-center mt-6 space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">Verifying your email...</span>
                    </div>
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                        <Skeleton className="h-4 w-2/3 mx-auto" />
                    </div>
                </div>
            )}

            {error && (
                <Link href="/">
                    <Button className="mt-6">Go to Home Page</Button>
                </Link>
            )}
        </div>
    );
}