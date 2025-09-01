'use client';

import React, { FormEvent, useState } from 'react';
import { Eye, Mail, LockKeyhole, EyeClosed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Subtitle from '../Global/Subtitle';
import Link from 'next/link';
import Title from '../Global/Title';
import { useLoginMutation } from '@/redux/api/userApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [login, { isLoading }] = useLoginMutation();
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) return;
        const toastId = toast.loading('Logging in...');
        try {

            const result = await login({ email, password }).unwrap();
           
            form.reset();
           
            if(result?.data){
                 router.push('/')
                  toast.success('Login successful!', { id: toastId });
            } else {
                router.push(`/auth/check-email?email=${email}`)
                 toast.warning('Please Verify Email first!', { id: toastId });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || 'Login failed', { id: toastId });
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-10">
                <Title>Welcome back</Title>
                <Subtitle>Sign in to your account</Subtitle>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="pl-10 md:h-11"
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="pl-10 pr-12 md:h-11"
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            disabled={isLoading}
                        >
                            {!showPassword ? <EyeClosed /> : <Eye />}
                        </Button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-end">
                    <Link href={'/auth/forget-password'}>
                        <Button variant="link" className="px-0 text-sm" disabled={isLoading}>
                            Forgot password?
                        </Button>
                    </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/sign-up">
                        <Button variant="link" className="px-0 text-sm" disabled={isLoading}>
                            Sign up
                        </Button>
                    </Link>
                </p>
            </div>
        </div>
    );
}
