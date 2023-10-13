import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface LabeledInputProps extends InputProps {
    isError?: {} | boolean;
    icon: any;
    error?: string | undefined;
}

export const IconInput = React.forwardRef<
    HTMLInputElement,
    LabeledInputProps
>(({ required, type, id, isError, error, ...props }, ref) => {


    return (
        <div className="w-full">
            <p className="flex items-center justify-between pb-[10px] pl-[43px]">

                {
                    isError && (
                        <p className="text-red-700 text-[13px] pl-[5px]">{error}</p>
                    )
                }
            </p>
            <div className="w-full  flex space-x-[20px]">
                <Label className="font-medium flex items-center" htmlFor={id}>
                    <props.icon className="text-gray-500" size={23} />
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

        </div>
    );
});
