import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
const ImageUpload = ({
  value,
  disabled,
  onChange,
  label,
}: {
  value: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
  label: string;
}) => {
  const [base64, setBase64] = useState(value);
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange, value]
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange, setBase64, value]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  useEffect(() => {
    setBase64(value);
  }, [value]);

  return (
    <div
      {...getRootProps({
        className:
          "min-w-full max-w-full p-4 text-white text-center border-2 border-dotted rounded-md border-white transition-all focus:border-red-700 cursor-pointer",
      })}
    >
      <input
        {...getInputProps({
          disabled,
        })}
      />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
