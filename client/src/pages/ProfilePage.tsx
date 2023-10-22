import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/provider/AuthContextProvider";
import { useUpdateMe } from "@/hooks/user.hooks";
import { LabeledInput } from "@/sharers/form";
import { LoadingButton, PhotoAvatar } from "@/sharers/other";
import { PhotoInput } from "@/sharers/other/PhotoInput";
import { setRequired } from "@/validation";
import { Pen } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
}
export const ProfilePage = () => {
  const [edit, setEdit] = useState(false);

  const { state: auth } = useContext(AuthContext);
  const user = auth?.user;
  const [previewImage, setPreviewImage] = useState<null | string>(
    user?.photo || null
  );
  const [file, setFile] = useState<null | File>(null);

  const form = useForm<FormValues>();
  const { register, formState, handleSubmit, reset } = form;
  const { errors, isDirty, isValid } = formState;

  const updateMeMutation = useUpdateMe();

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setPreviewImage(URL.createObjectURL(e.target.files[0] || {}));
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    file && formData.append("photo", file);

    //@ts-ignore
    await updateMeMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center lg:pt-0 pt-[20px] sm:px-0 px-[20px]">
      <div className="sm:w-[600px] w-full">
        <h1 className="text-xl font-bold">Welcome , {user?.name}</h1>

        <div>
          <div className="space-y-[30px] relative">
            <Button
              size={"sm"}
              disabled={edit}
              variant={ "outline" }
              className="rounded-full h-11 w-11 absolute top-0 right-0"
              onClick={() => {
                setEdit(true);
              }}
            >
              <Pen />
            </Button>
            {edit ? (
              <PhotoInput
                onChange={handleSelectFile}
                img={previewImage || ""}
              />
            ) : (
              <PhotoAvatar
                name={user?.name || ""}
                bgColor={"green"}
                img={user?.photo}
              />
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-[20px]"
            >
              <LabeledInput
                id="name"
                type="text"
                required={true}
                placeholder="Your Name"
                defaultValue={user?.name}
                readOnly={!edit}
                label="Name"
                isError={errors.name}
                error={errors.name?.message}
                {...register("name", {
                  required: setRequired("Name is required."),
                })}
              />
              <div className="space-x-[20px]">
                <LoadingButton
                  loading={updateMeMutation.isLoading}
                  disabled={isDirty && !isValid}
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
      </div>
    </div>
  );
};
