import { Button, ButtonProps } from "../ui/button";
import { Tag } from "lucide-react";

export const LabelTagButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="space-x-[10px]"
      size={"sm"}
      {...props}
    >
      <Tag size={17} />
      <span>{children}</span>
    </Button>
  );
};
