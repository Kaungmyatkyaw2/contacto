import { LabeledInput } from "@/sharers/form";
import { useForm } from "react-hook-form";
import { emailPattern, setRequired } from "@/utils";
import { Link } from "react-router-dom";
import { FormWrapper } from "@/components/signin_up";
import { ContactoIcon, LoadingButton } from "@/sharers/other";
import axiosClient from "@/lib/axiosClient";
import { useToast } from "@/components/ui/use-toast";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const Signup = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (values: FormValues) => {
    try {
      const data = new FormData();

      Object.keys(values).forEach(key => {
        data.append(key, values[key])
      })
      const response = await axiosClient.post("/users/signup", data);
      toast({
        title: "Verification email send !",
        description: response.data.message,
      })
    } catch (error: any) {
      toast({
        title: "Failed to sign up.",
        description: error.response.data.message,
        variant: "destructive",
      })
    }

  };

  return (
    <div className="w-full h-[100vh] md:py-0 py-[20px] sm:px-0 px-[10px]">
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ContactoIcon />
          <h1 className="text-[18px] font-extrabold pt-[10px]">
            Sign up and start explore!
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
          id="name"
          type="text"
          required={true}
          placeholder="Jhon Doe"
          label="Name"
          isError={errors.name}
          error={errors.name?.message}
          {...register("name", {
            required: setRequired("Name is required."),
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
              value: 4,
              message: "Password must be 4 length minium.",
            },
          })}
        />

        <LabeledInput
          id="passwordConfirm"
          type="password"
          required={true}
          placeholder="Confirm your password"
          label="Confirm Password"
          isError={errors.passwordConfirm}
          error={errors.passwordConfirm?.message}
          {...register("passwordConfirm", {
            required: setRequired("Confirm Password is required."),
            minLength: {
              value: 8,
              message: "Password must be 4 length minium.",
            },
          })}
        />
        <LoadingButton
          disabled={isDirty && !isValid}
          type="submit"
          className="w-full py-[30px] rounded-[100px]"
        >
          Create Account
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
