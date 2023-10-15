import React, { useState } from "react";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

export const LayoutProvider = ({
  children,
}: React.HTMLProps<HTMLDivElement>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Navbar setOpen={setOpen} />
      <div className="mt-[60px] lg:pt-[20px] w-full flex">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="lg:w-[75%] w-full lg:ml-[25%] ml-0 lg:pt-0 pt-[20px]">
          <div className="relative h-[calc(100vh-80px)] overflow-scroll overflow-x-hidden lg:pr-[30px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
