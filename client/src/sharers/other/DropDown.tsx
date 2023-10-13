import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Prop {
  children: React.ReactNode;
  btnClass?: string;
  content: { label?: string; menus: { name: string | any; onClick?: any, icon?: any }[] }[];
}

export const DropDown = ({ children, btnClass, content }: Prop) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`outline-none ${btnClass}`}
        >
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="pt-[5px]">
          {content.map((con, index) => (
            <React.Fragment key={index}>
              {con.label && (
                <>
                  <DropdownMenuLabel key={con.label}>
                    {con.label}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <div className="space-y-[5px]">
                {con.menus.map((mn) => (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={mn.onClick}
                    key={mn.name + con.label}
                  >
                    <mn.icon className="mr-2 h-4 w-4" />
                    {mn.name}
                  </DropdownMenuItem>
                ))}
              </div>
              {index + 1 !== content.length && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
