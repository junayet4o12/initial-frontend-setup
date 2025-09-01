/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Edit3, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomForm from "../Forms/CustomForm"
import CustomInput from "../Forms/CustomInput"
import CustomTextarea from "../Forms/CustomTextarea"
import { FieldValues } from "react-hook-form"
import { useUpdateProfileMutation } from "@/redux/api/userApi"
import Spinner from "../Global/Spinner"

type DefaultValues = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bio: string;
}

export default function ProfileDetails({ userData }: { userData: DefaultValues }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editProfile, { isLoading }] = useUpdateProfileMutation()

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleSave = async (data: FieldValues) => {
        try {
            const { email, ...rest } = data
            await editProfile(rest).unwrap()
            setIsEditing(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CustomForm
            onSubmit={handleSave}
            defaultValues={userData}
            className="bg-white rounded-lg border border-gray-200 p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                {!isEditing ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                        className="text-primary border-primary hover:bg-primary/10"
                        disabled={isLoading}
                    >
                        <Edit3 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="text-gray-600"
                            disabled={isLoading}
                        >
                            <X className="w-4 h-4 mr-2" /> Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-white flex items-center"
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner /> : <Check className="w-4 h-4 mr-2" />}
                            Save
                        </Button>
                    </div>
                )}
            </div>

            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput required name="firstName" type="text" label="First name" disabled={!isEditing || isLoading} />
                    <CustomInput required name="lastName" type="text" label="Last name" disabled={!isEditing || isLoading} />
                    <CustomInput required name="email" type="email" label="Email" disabled={true} />
                    <CustomInput required name="phoneNumber" type="text" label="Phone" disabled={!isEditing || isLoading} />
                    <CustomTextarea
                        required={false}
                        className="col-span-2"
                        name="bio"
                        label="Bio"
                        disabled={!isEditing || isLoading}
                    />
                </div>
            </div>
        </CustomForm>
    )
}
