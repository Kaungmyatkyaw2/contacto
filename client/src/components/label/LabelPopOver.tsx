import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LabelType } from "@/types/label.types";
import { Button } from "../ui/button";
import { Check, Pen, Plus } from "lucide-react";

interface Prop {
  onOpenChange: (e: boolean) => void;
  selectedLabels: LabelType[];
  labels: LabelType[];
  onChoose: (el: LabelType) => void;
  tempLabelIds: string[];
  onApply: () => void;
}
export const LabelPopOver = ({
  onOpenChange,
  selectedLabels,
  labels,
  onChoose,
  tempLabelIds,
  onApply,
}: Prop) => {
  return (
    <>
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          {selectedLabels.length ? (
            <Button variant={"outline"} size={"icon"} className="rounded-full">
              <Pen className="h-3 w-3" />
            </Button>
          ) : (
            <Button variant={"outline"} className="space-x-[10px]">
              <Plus size={17} />
              <span>Add Label</span>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0">
          <div className="">
            {labels.map((el) => (
              <div
                onClick={() => onChoose(el)}
                className="w-full px-[15px] py-[10px] cursor-pointer text-sm hover:bg-gray-50 flex items-center space-x-[10px]"
              >
                {tempLabelIds.includes(el._id) && (
                  <Check size={17} color="blue" />
                )}
                <span>{el.name}</span>
              </div>
            ))}
            <div
              onClick={onApply}
              className="w-full px-[15px] py-[10px] cursor-pointer text-sm hover:bg-gray-50 text-center"
            >
              <span className="text-[blue] font-medium">Apply</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
