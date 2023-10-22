/* eslint-disable */

import { LabeledInput } from "@/sharers/form";
import { useForm } from "react-hook-form";
import { setRequired } from "@/validation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormWrapper } from "@/components/signin_up";
import { ContactoIcon, LoadingButton } from "@/sharers/other";
import { useToast } from "@/components/ui/use-toast";
import { useResetPassword } from "@/hooks/user.hooks";

interface FormValues {
  password: string;
  passwordConfirm: string;
}

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { toast } = useToast();
  const form = useForm<FormValues>();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isValid } = formState;

  const resetPasswordMutation = useResetPassword();

  const onSubmit = async (values: FormValues) => {
    await resetPasswordMutation.mutateAsync(
      { token: searchParams.get("token"), values },
      {
        onSuccess: (response) => {
          toast({
            title: "Successfully reset your password !",
            description: response.message,
          });
          navigate("/");
        },
        onError: (error: any) => {
          toast({
            title: "Failed to sign up.",
            description: error.response.data.message,
            variant: "destructive",
          });
        },
      }
    );
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
    <div className="w-full h-[100vh] md:py-0 py-[20px] sm:px-0 px-[10px]">
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ContactoIcon />
          <h1 className="text-[18px] font-extrabold pt-[10px]">
            Reset your password!
          </h1>
        </div>

        <LabeledInput
          id="password"
          type="password"
          required={true}
          placeholder="your password"
          label="New Password"
          isError={errors.password}
          error={errors.password?.message}
          {...register("password", {
            required: setRequired("Password is required."),
            minLength: {
              value: 8,
              message: "Password must be 8 length minium.",
            },
          })}
        />

        <LabeledInput
          id="passwordConfirm"
          type="password"
          required={true}
          placeholder="Confirm your new password"
          label="Confirm Password"
          isError={errors.passwordConfirm}
          error={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
            required: setRequired("Confirm Password is required."),
            minLength: {
              value: 8,
              message: "Password must be 8 length minium.",
            },
          })}
        />
        <LoadingButton
          loading={resetPasswordMutation.isLoading}
          disabled={isDirty && !isValid}
          type="submit"
          className="w-full py-[30px] rounded-[100px]"
        >
          Submit
        </LoadingButton>
        <p className="text-ink text-center text-[13px]">
          Already have an account ?{" "}
          <Link className="underline" to={"/login"}>
            Log in here.
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
};
