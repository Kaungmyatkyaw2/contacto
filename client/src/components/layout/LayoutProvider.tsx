import React from "react";
import { Navbar } from "./Navbar";
import { LoadingButton } from "@/sharers/other";
import { Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LayoutProvider = ({
  children,
}: React.HTMLProps<HTMLDivElement>) => {

  const navigate = useNavigate();

  return (
    <div className="relative">
      <Navbar />
      <div className="mt-[60px] pt-[20px] w-full flex">
        <div className="w-[25%] h-[100vh] pr-[20px] fixed left-0">
          <div className="pl-[30px]">
            <LoadingButton
              className="py-[24px] px-[20px] rounded-[100px]"
              onClick={() => navigate("create")}
            >
              <Plus />
              <span>
                Create contact
              </span>
            </LoadingButton>
          </div>

          <div className="w-full pt-[20px]">
            <button className=" w-full flex justify-start items-center pl-[40px] py-[15px] space-x-[10px] bg-white hover:bg-gray-100  rounded-tr-[100px] rounded-br-[100px]">
              <User size={20} />
              <span className="text-[14px] font-medium">
                Contacts
              </span>
            </button>
          </div>

        </div>
        <div className="w-[75%] ml-[25%]">
          <div className="relative h-[calc(100vh-80px)] overflow-scroll overflow-x-hidden pr-[30px]">
            {children}

          </div>
        </div>
      </div>
    </div>
  );
};
