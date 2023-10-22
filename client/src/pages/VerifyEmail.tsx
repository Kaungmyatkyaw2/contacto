import { toast } from "@/components/ui/use-toast";
import { useVerifyEmail } from "@/hooks/user.hooks";
import { ContactoIcon, LoadingButton } from "@/sharers/other";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const verifyEmailMutation = useVerifyEmail();

  const handleVerify = async () => {
    await verifyEmailMutation.mutateAsync(searchParams.get("token"), {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error: any) => {
        toast({
          title: "Failed to verify your email.",
          description: error.response.data.message,
          variant: "destructive",
        });
      },
    });
  };

  if (!searchParams.get("token")) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <ContactoIcon />
        <h1 className="text-[18px] font-extrabold pt-[5px] pb-[5px]">
          Invalid Token
        </h1>
        <Link to={"/login"} className="text-sm underline">
          Go back to login page.
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[400px] sm:shadow-md border py-[20px] px-[10px] rounded-[10px]">
        <ContactoIcon className="mx-auto" />
        <h1 className="text-[18px] text-ink font-bold text-center pt-[15px]">
          Thanks for using contacto.
        </h1>
        <p className="text-[14px] text-center pt-[5px]">
          Please click the button below to verify email.
        </p>

        <div className="flex justify-center pt-[20px]">
          <LoadingButton
            onClick={handleVerify}
            loading={verifyEmailMutation.isLoading}
            className="bg-ink rounded-[100px] mx-auto"
          >
            Verify Email
          </LoadingButton>
        </div>

        <p className="text-[14px] text-gray-400 text-center pt-[20px]">
          If you have question about contacto , contact us via this email -
          contactozillion@gmail.com
        </p>
      </div>
    </div>
  );
};
