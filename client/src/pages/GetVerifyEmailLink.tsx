/* eslint-disable */

import { LabeledInput } from "@/sharers/form";
import { useForm } from "react-hook-form";
import { emailPattern, setRequired } from "@/validation";
import { Link } from "react-router-dom";
import { FormWrapper } from "@/components/signin_up";
import { ContactoIcon, LoadingButton } from "@/sharers/other";
import { useToast } from "@/components/ui/use-toast";
import { useGetVerifyEmailLink } from "@/hooks/user.hooks";

interface FormValues {
  email: string;
}

export const GetVerifyEmailLink = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isValid } = formState;

  const getVerifyEmailLink = useGetVerifyEmailLink();

  const onSubmit = async (values: FormValues) => {
    //@ts-ignore
    await getVerifyEmailLink.mutateAsync(values, {
      onSuccess: (response) => {
        toast({
          title: "Verification email send !",
          description: response.message,
        });
      },
      onError: (error: any) => {
        toast({
          title: "Failed to get vierfy email link.",
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
            Verify your email!
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
          loading={getVerifyEmailLink.isLoading}
          disabled={isDirty && !isValid}
          type="submit"
          className="w-full py-[30px] rounded-[100px]"
        >
          Verify
        </LoadingButton>
        <p className="text-ink text-center text-[13px]">
          Already have an verified account ?{" "}
          <Link className="underline" to={"/login"}>
            Log in here.
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
};
