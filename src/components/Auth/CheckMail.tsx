'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Subtitle from '../Global/Subtitle';
import Title from '../Global/Title';
import { useSearchParams } from 'next/navigation';
import { useResendVerificationEmailMutation } from '@/redux/api/userApi';
import { toast } from 'sonner';

export default function CheckMail() {
    const params = useSearchParams();
    const email = params.get('email');
    const [resend, { isLoading }] = useResendVerificationEmailMutation()
    const handleRedirect = () => {
        // Gmail search URL for emails between the user and muhammadjunayetmaruf@gmail.com
        const gmailSearchUrl =
            'https://mail.google.com/mail/u/0/#search/from%3Amuhammadjunayetmaruf%40gmail.com';
        window.open(gmailSearchUrl, '_blank');
    };

    const resendVerificationMail = async () => {

        if (email) {
            const toastId = toast.loading('Resending Email...')
            try {
                const result = await resend({ email }).unwrap();
                toast.success(result?.message || 'Resent Successfully', { id: toastId })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error?.data?.message || 'something went wrong!', { id: toastId })
            }
        } else {
            toast.error('User Email not found..')
        }
    }

    return (
        <div className="w-full max-w-md mx-auto text-center py-10">
            <Title>Check your email</Title>
            <Subtitle>
                We’ve sent a password reset link to <span className="font-semibold">{email}</span>.
            </Subtitle>
            <div className="mt-6 w-full">
                <Button onClick={handleRedirect} size="lg" className="flex items-center justify-center gap-2 w-full">
                    <Mail className="w-5 h-5" /> Open Gmail
                </Button>
            </div>
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Didn’t receive the email? {" "}
                    <Button disabled={isLoading} onClick={resendVerificationMail} variant="link" className="px-0 text-sm">
                        Click to resend
                    </Button>
                </p>
            </div>
        </div>
    );
}
