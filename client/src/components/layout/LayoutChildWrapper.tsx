import React, { Ref, forwardRef } from "react";

interface Prop extends React.HTMLProps<HTMLDivElement> {}

export const LayoutChildWrapper = forwardRef(
  ({ ...props }: Prop, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`h-[calc(100vh-80px)] overflow-scroll overflow-x-hidden lg:px-0 px-[30px] relative lg:pr-[30px] hide-scroll ${props.className}`}
      >
        {props.children}
      </div>
    );
  }
);
