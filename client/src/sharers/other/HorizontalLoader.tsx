import { Loader } from "lucide-react";

export const HorizontalLoader = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};
