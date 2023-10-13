import React from "react";

export const ContactoIcon = ({
  onClick,
  className,
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={`flex items-center space-x-[2px] w-fit ${className}`}
      onClick={onClick}
    >
      <h1 className="font-bold text-[25px]">
        <span  className="text-blue-600">C</span>
        <span  className="text-red-600">o</span>
        <span  className="text-yellow-600">n</span>
        <span  className="text-blue-600">t</span>
        <span  className="text-green-600">a</span>
        <span  className="text-red-600">c</span>
        <span  className="text-yellow-600">t</span>
        <span  className="text-green-600">o</span>
      </h1>
    </div>
  );
};
