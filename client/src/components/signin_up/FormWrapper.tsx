import React from "react";

export const FormWrapper = ({
  children,
  onSubmit,
}: React.HTMLProps<HTMLFormElement>) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        noValidate
        className="h-fit px-[20px] py-[30px] rounded-[15px] border sm:w-fit w-full"
      >
        <div className="sm:w-[400px] w-full space-y-[25px]">
          {children}
        </div>
      </form>
    </div>
  );
};
