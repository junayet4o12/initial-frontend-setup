"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type TSelectOption = {
  label: string;
  value: string;
};

type TCustomSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options: TSelectOption[];
  className?: string;
  labelClassName?: string;
  fieldClassName?: string; // renamed from triggerClassName
};

const CustomSelect = ({
  name,
  label,
  placeholder = "Select an option",
  required,
  disabled,
  options,
  className,
  labelClassName,
  fieldClassName,
}: TCustomSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => (
        <div className={cn("flex flex-col", className)}>
          {label && (
            <label
              htmlFor={name}
              className={cn("text-sm md:text-sm font-semibold pb-2", labelClassName)}
            >
              {label}
            </label>
          )}

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <SelectTrigger className={cn("w-full", fieldClassName)} id={name}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors?.[name] && (
            <small className="text-red-500 text-sm mt-1">
              {errors?.[name]?.message as string}
            </small>
          )}
        </div>
      )}
    />
  );
};

export default CustomSelect;
