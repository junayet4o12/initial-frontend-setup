'use client'

import { useState } from "react"
import { Eye, EyeClosed, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomForm from "../Forms/CustomForm"
import CustomInput from "../Forms/CustomInput"
import Container from "../Global/Container"
import Title from "../Global/Title"
import Subtitle from "../Global/Subtitle"
import { FieldValues } from "react-hook-form"
import Link from "next/link"
import { toast } from "sonner"
import { useResetPasswordMutation } from "@/redux/api/userApi"
import { useRouter, useSearchParams } from "next/navigation"

const defaultValues = {
    newPassword: "",
    confirmPassword: "",
}

export default function ResetPassword() {
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (data: FieldValues) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (!token) {
            toast.error('Invalid reset token')
            return
        }

        const formData = {
            newPassword: data.newPassword,
            token: token,
        }

        const toastId = toast.loading('Resetting your password...')
        try {
            const result = await resetPassword(formData).unwrap()
            toast.success(result?.message || 'Password reset successfully', { id: toastId })
            router.push('/auth/sign-in')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || 'Password reset failed', { id: toastId })
        }
    }

    return (
        <Container className="max-w-md">
            <div className="text-center mb-10 space-y-1">
                <Title>Set new password</Title>
                <Subtitle>Your new password must be different to previously used passwords.</Subtitle>
            </div>

            <CustomForm 
                onSubmit={handleSubmit} 
                defaultValues={defaultValues} 
                className="rounded-lg border border-gray-200 p-6 space-y-6"
            >
                <div className="space-y-4">
                    {/* New Password Field */}
                    <CustomInput
                        required
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        label="New Password"
                        placeholder="Enter new password"
                        Icon={<LockKeyhole size={16} />}
                        RightIcon={showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                        onRightIconClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                    />

                    {/* Confirm Password Field */}
                    <CustomInput
                        required
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password"
                        placeholder="Confirm new password"
                        Icon={<LockKeyhole size={16} />}
                        RightIcon={showConfirmPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                        onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </Button>

                {/* Back to Sign In */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link href="/auth/sign-in">
                            <Button variant="link" className="px-0 text-sm text-primary" disabled={isLoading}>
                                Sign in
                            </Button>
                        </Link>
                    </p>
                </div>
            </CustomForm>
        </Container>
    )
}