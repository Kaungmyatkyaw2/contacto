import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface LabeledInputProps extends InputProps {
  label: string;
  isError?: {} | boolean;
  error?: string | undefined;
}

export const LabeledInput = React.forwardRef<
  HTMLInputElement,
  LabeledInputProps
>(({ label, required, type, id, isError, error, ...props }, ref) => {
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
      <Input
        required={required}
        type={type}
        id={id}
        className="py-[20px] border-[1.5px]"
        placeholder={props.placeholder}
        {...props}
        ref={ref}
      />
    </div>
  );
});
