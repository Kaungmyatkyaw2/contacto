import { Button, ButtonProps } from "@/components/ui/button";
import { Pen, Plus, Trash } from "lucide-react";

interface Prop extends ButtonProps {
  styleType?: "update" | "delete" | "create";
}

export const CrudButton = ({ styleType = "create", ...props }: Prop) => {
  let info = {
    styling : 
    "space-x-[10px] text-white bg-green-700 hover:bg-green-700 hover:bg-opacity-75",
    icon : Plus
  }


  if (styleType === "delete") {
    info.styling = info.styling + " bg-red-700  hover:bg-red-700";
    info.icon = Trash
  } else if (styleType === "update") {
    info.styling =info.styling +  " bg-blue-700  hover:bg-blue-700";
    info.icon = Pen
    
  }

  return (
    <Button variant={"secondary"} size={"sm"} {...props} className={info.styling}>
      <info.icon size={17} />
      <span className="sm:block hidden">{props.children}</span>
    </Button>
  );
};
