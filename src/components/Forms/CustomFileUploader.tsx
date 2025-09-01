"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone, Accept } from "react-dropzone";

type TCustomFileUploaderProps = {
  name: string;
  label?: string;
  multiple?: boolean;
  accept?: Accept;
  className?: string;
};

const CustomFileUploader = ({
  name,
  label,
  multiple = false,
  accept = {
    "image/*": [],
    "application/pdf": [],
    "video/*": [],
    "audio/*": [],
  },
  className,
}: TCustomFileUploaderProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(multiple ? acceptedFiles : [acceptedFiles[0]]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
  });

  // 🔄 Sync selected files with react-hook-form
  useEffect(() => {
    if (files.length > 0) {
      setValue(name, multiple ? files : files[0]);
      const previews = files.map((file) =>
        file.type.startsWith("image/") ? URL.createObjectURL(file) : ""
      );
      setFilePreviews(previews);
    } else {
      setValue(name, multiple ? [] : null);
      setFilePreviews([]);
    }

    // Cleanup previews on unmount
    return () => {
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, name, setValue, multiple]);

  const removeFiles = () => {
    filePreviews.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setFilePreviews([]);
  };

  return (
    <div className={`mb-4 ${className || ""}`}>
      {label && <p className="mb-2 font-medium text-lg">{label}</p>}

      <div
        {...getRootProps()}
        className={`border border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer transition ${
          isDragActive ? "bg-blue-100" : "bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Drop the files here ..."
            : "Click or drag & drop files here"}
        </p>
        <em className="text-sm text-gray-500">
          (Supports image, pdf, video, audio)
        </em>
      </div>

      {(files.length > 0 || filePreviews.length > 0) && (
        <div className="mt-4 space-y-4">
          {files.map((file, idx) => {
            const preview = filePreviews[idx];
            return file.type.startsWith("image/") && preview ? (
              <Image
                key={idx}
                src={preview}
                alt={`preview-${idx}`}
                width={200}
                height={200}
                className="rounded-md"
              />
            ) : (
              <div key={idx} className="p-2 bg-gray-100 border rounded text-sm">
                📄 {file.name}
              </div>
            );
          })}

          <button
            type="button"
            onClick={removeFiles}
            className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove File{multiple && "s"}
          </button>
        </div>
      )}

      {/* Optional: show validation error */}
      <Controller
        name={name}
        control={control}
        render={() => <></>} // Return a valid element
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-2">
          {(errors[name] as { message?: string })?.message}
        </p>
      )}
    </div>
  );
};

export default CustomFileUploader;
