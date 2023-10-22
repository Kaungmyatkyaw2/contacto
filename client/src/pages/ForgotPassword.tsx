/* eslint-disable */

import { LabeledInput } from "@/sharers/form";
import { useForm } from "react-hook-form";
import { emailPattern, setRequired } from "@/validation";
import { Link } from "react-router-dom";
import { FormWrapper } from "@/components/signin_up";
import { ContactoIcon, LoadingButton } from "@/sharers/other";
import { useToast } from "@/components/ui/use-toast";
import { useForgotPassword } from "@/hooks/user.hooks";

interface FormValues {
  email: string;
}

export const ForgotPassword = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isValid } = formState;

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = async (values: FormValues) => {
    //@ts-ignore
    await forgotPasswordMutation.mutateAsync(values, {
      onSuccess: (response) => {
        toast({
          title: "Password reset link have sent !",
          description: response.message,
        });
      },
      onError: (error: any) => {
        toast({
          title: "Failed to reset your password.",
          description: error.response.data.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="w-full h-[100vh] md:py-0 py-[20px] sm:px-0 px-[10px]">
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ContactoIcon />
          <h1 className="text-[18px] font-extrabold pt-[10px]">
            Enter your email to reset password!
          </h1>
        </div>
        <LabeledInput
          id="email"
          type="email"
          placeholder="jhondoe@email.com"
          label="Email"
          isError={errors.email}
          error={errors.email?.message}
          required={true}
          {...register("email", {
            pattern: emailPattern,
            required: setRequired("Email is required."),
          })}
        />

        <LoadingButton
          loading={forgotPasswordMutation.isLoading}
          disabled={isDirty && !isValid}
          type="submit"
          className="w-full py-[30px] rounded-[100px]"
        >
          Submit
        </LoadingButton>
        <p className="text-ink text-center text-[13px]">
          Already have an verified account ?
          <Link className="underline" to={"/login"}>
            Log in here.
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
};
