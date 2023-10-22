import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

interface LabeledInputProps extends InputProps {
  label: string;
  isError?: {} | boolean;
  error?: string | undefined;
}

export const LabeledInput = React.forwardRef<
  HTMLInputElement,
  LabeledInputProps
>(({ label, required, id, isError, error, ...props }, ref) => {
  const [type, setType] = useState(props.type || "text");

  return (
    <div className="w-full space-y-[5px]">
      <Label className="font-medium flex items-center" htmlFor={id}>
        {label}
        {required && (
          <span className="text-red-500 pl-[10px] text-[15px]">*</span>
        )}
        {isError && (
          <p className="text-red-700 text-[13px] pl-[5px]">{error}</p>
        )}
      </Label>
      <div className="w-full h-fit relative">
        <Input
          required={required}
          id={id}
          className={`py-[20px] border-[1.5px] ${props.className}`}
          placeholder={props.placeholder}
          ref={ref}
          {...props}
          type={type}
        />
        {type == "password" ? (
          <span className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer">
            {type == "text" ? (
              <EyeIcon
                onClick={() => {
                  setType("password");
                }}
              />
            ) : (
              <EyeOffIcon
                onClick={() => {
                  setType("text");
                }}
              />
            )}
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
});
