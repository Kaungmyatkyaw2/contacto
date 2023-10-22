import { LabeledInput } from "@/sharers/form";
import { useForm } from "react-hook-form";
import { emailPattern, setRequired } from "@/validation";
import { Link } from "react-router-dom";
import { FormWrapper } from "@/components/signin_up";
import axiosClient from "@/lib/axiosClient";
import { ContactoIcon, LoadingButton } from "@/sharers/other";
import { useToast } from "@/components/ui/use-toast";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/provider/AuthContextProvider";

interface FormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isValid } = formState;
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await axiosClient().post("/users/login", values);
      dispatch({ type: "setToken", token: response.data.token });
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Failed to login.",
        description: error.response.data.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] md:py-0 py-[20px] sm:px-0 px-[10px]">
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ContactoIcon />
          <h1 className="text-[18px] font-extrabold pt-[10px]">
            Log in here and start manage.
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

        <LabeledInput
          id="password"
          type="password"
          required={true}
          placeholder="your password"
          label="Password"
          isError={errors.password}
          error={errors.password?.message}
          {...register("password", {
            required: setRequired("Password is required."),
            minLength: {
              value: 8,
              message: "Password must be 4 length minium.",
            },
          })}
        />

        <LoadingButton
          loading={loading}
          disabled={isDirty && !isValid}
          type="submit"
          className="w-full py-[30px] rounded-[100px]"
        >
          Log in
        </LoadingButton>
        <p className="text-ink text-center text-[13px]">
          Haven't had an account yet ?{" "}
          <Link className="underline" to={"/signup"}>
            Create here.
          </Link>
        </p>
        <Link
          className="text-ink block w-full text-center text-[13px] underline"
          to={"/getVerifyEmailLink"}
        >
          Verify Your Email
        </Link>
      </FormWrapper>
    </div>
  );
};
