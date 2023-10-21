import { Button, ButtonProps } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface Prop extends ButtonProps {
  styleType?: "update" | "delete" | "create";
}

export const CrudButton = ({ styleType = "create", ...props }: Prop) => {
  let styling =
    "space-x-[10px] text-white bg-green-700 hover:bg-green-700 hover:bg-opacity-75";

  if (styleType === "delete") {
    styling = styling + " bg-red-700  hover:bg-red-700";
  } else if (styleType === "update") {
    styling =styling +  " bg-blue-700  hover:bg-blue-700";
  }

  return (
    <Button variant={"secondary"} size={"sm"} {...props} className={styling}>
      <Trash size={17} />
      <span className="sm:block hidden">{props.children}</span>
    </Button>
  );
};
