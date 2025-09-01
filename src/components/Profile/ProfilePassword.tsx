"use client"

import { useState } from "react"
import { Eye, EyeClosed, Edit3, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomForm from "../Forms/CustomForm"
import CustomInput from "../Forms/CustomInput"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { useChangePasswordMutation } from "@/redux/api/userApi"

const defaultValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
}

export default function ProfilePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const [isEditing, setIsEditing] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => setIsEditing(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (data: FieldValues, method: UseFormReturn<any>) => {
    const { oldPassword, newPassword, confirmPassword } = data

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!")
      return
    }



    const formData = {
      oldPassword,
      newPassword,
    }

    const toastId = toast.loading("Updating your password...")
    try {
      const result = await changePassword(formData).unwrap()
      toast.success(result?.message || "Password updated successfully", { id: toastId })
      setIsEditing(false)
      method.reset()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password", { id: toastId })
    }
  }

  return (
    <CustomForm
      onSubmit={handleSave}
      defaultValues={defaultValues}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Password</h3>

        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="text-primary border-primary hover:bg-primary/10"
            disabled={isLoading}
          >
            <Edit3 className="w-4 h-4 mr-2" /> Change Password
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
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : <><Check className="w-4 h-4 mr-2" /> Update Password</>}
            </Button>
          </div>
        )}
      </div>

      {/* Form Fields */}
      {!isEditing ? (
        <p className="text-sm text-gray-600"></p>
      ) : (
        <div className="space-y-6">
          {/* Current Password */}
          <CustomInput
            type={showCurrentPassword ? "text" : "password"}
            name="oldPassword"
            label="Current Password"
            RightIcon={showCurrentPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
            placeholder={showCurrentPassword ? "Enter Current Password" : "********"}
            onRightIconClick={() => setShowCurrentPassword(!showCurrentPassword)}
            required
            disabled={isLoading}
          />

          {/* New Password */}
          <CustomInput
            type={showPassword ? "text" : "password"}
            name="newPassword"
            label="New Password"
            RightIcon={showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
            placeholder={showPassword ? "Enter New Password" : "********"}
            onRightIconClick={() => setShowPassword(!showPassword)}
            required
            disabled={isLoading}
          />

          {/* Confirm Password */}
          <CustomInput
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            label="Confirm Password"
            RightIcon={showConfirm ? <Eye size={16} /> : <EyeClosed size={16} />}
            placeholder={showConfirm ? "Re-enter New Password" : "********"}
            onRightIconClick={() => setShowConfirm(!showConfirm)}
            required
            disabled={isLoading}
          />
        </div>
      )}
    </CustomForm>
  )
}
