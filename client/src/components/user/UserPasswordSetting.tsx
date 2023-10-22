import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUpdatePassword } from "@/hooks/user.hooks";
import { LabeledInput } from "@/sharers/form";
import { LoadingButton } from "@/sharers/other";
import { setRequired } from "@/validation";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

export const UserPasswordSetting = () => {
  const [edit, setEdit] = useState(false);

  const form = useForm<FormValues>();
  const { register, formState, handleSubmit, reset } = form;
  const { errors, isDirty, isValid } = formState;

  const { toast } = useToast();

  const updatePasswordMutation = useUpdatePassword();

  const onSubmit = async (values: FormValues) => {
    //@ts-ignore
    await updatePasswordMutation.mutateAsync(values, {
      onSuccess: () => {
        setEdit(false);
        reset();
        toast({
          title: "Successfully updated your password!",
        });
      },
      onError: (error) => {
        toast({
          //@ts-ignore
          title: error.response?.data.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="sm:w-[600px] w-full relative">
      <h1 className="text-xl font-bold pb-[30px]">Update Your Password</h1>
      <Button
        size={"sm"}
        disabled={edit}
        variant={"outline"}
        className="rounded-full h-11 w-11 absolute top-0 right-0"
        onClick={() => {
          setEdit(true);
        }}
      >
        <Pen />
      </Button>
      <div className="space-y-[30px]">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-[20px]"
        >
          <LabeledInput
            id="name"
            type="password"
            required={true}
            placeholder="Old Password"
            readOnly={!edit}
            label="Old Password"
            isError={errors.oldPassword}
            error={errors.oldPassword?.message}
            {...register("oldPassword", {
              required: setRequired("Old Password is required."),
              minLength: {
                value: 8,
                message: "Old Password must be 8 length minium.",
              },
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
                message: "Password must be 8 length minium.",
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
                message: "Confirm Password must be 8 length minium.",
              },
            })}
          />
          <div className="space-x-[20px] pt-[10px]">
            <LoadingButton
              loading={updatePasswordMutation.isLoading}
              disabled={(isDirty && !isValid) || !edit}
            >
              Save
            </LoadingButton>
            <Button
              disabled={!edit}
              onClick={() => {
                setEdit(false);
                reset();
              }}
              type="button"
              variant={"outline"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
