import { Button, ButtonProps } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface Props extends ButtonProps {
  loading?: boolean;
}

export const LoadingButton = ({
  children,
  loading,
  className,
  ...rest
}: Props) => {
  return (
    <Button
      disabled={loading || rest.disabled}
      {...rest}
      className={`relative ${className}`}
    >
      <span
        className={`${
          loading ? "opacity-0" : "opacity-1"
        } flex items-center space-x-[10px]`}
      >
        {children}
      </span>
      {loading && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Loader className="animate-spin" />
        </div>
      )}
    </Button>
  );
};
