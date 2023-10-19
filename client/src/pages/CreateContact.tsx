import { useToast } from "@/components/ui/use-toast";
import { useCreateContact } from "@/hooks/contacts.hook";
import { useGetLabels } from "@/hooks/labels.hooks";
import { IconInput } from "@/sharers/form";
import { LoadingButton } from "@/sharers/other";
import { emailPattern, setRequired } from "@/validation";
import { AxiosError } from "axios";
import {
  Camera,
  Check,
  MailIcon,
  Pen,
  Phone,
  Plus,
  Tag,
  User,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LabelType } from "@/types/label.types";

interface FormValues {
  email: string;
  name: string;
  phoneNumber: string;
}

export const CreateContact = () => {
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [file, setFile] = useState<null | File>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>();
  const { register, formState, handleSubmit, reset } = form;
  const { errors, isDirty, isValid } = formState;

  const createContactMutation = useCreateContact();
  const getLabelsQuery = useGetLabels();

  const labels: LabelType[] = getLabelsQuery.data?.data.data || [];
  const [tempLabels, setTempLabels] = useState<LabelType[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<LabelType[]>([]);
  const tempLabelIds = tempLabels.map((el) => el._id);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setPreviewImage(URL.createObjectURL(e.target.files[0] || {}));
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("name", values.name);
    formData.append(
      "labels",
      JSON.stringify(selectedLabels.map((el) => el._id))
    );

    values.email && formData.append("email", values.email);
    file && formData.append("photo", file);

    //@ts-ignore
    await createContactMutation.mutateAsync(formData, {
      onSuccess: () => {
        toast({
          title: "Successfully create a contact!",
        });
        reset();
        setPreviewImage(null);
        navigate("/");
      },
      onError: (error: AxiosError) => {
        toast({
          //@ts-ignore
          title: error?.response?.data.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="w-full relative">
      <div className="w-full py-[30px] border-b flex items-center space-x-[30px]">
        <input
          onChange={handleSelectFile}
          accept="image/*"
          ref={fileRef}
          type="file"
          className="hidden"
        />
        <button
          className="bg-blue-200 hover:opacity-75 rounded-full cursor-pointer h-[150px] w-[150px] flex justify-center items-center"
          style={{ backgroundImage: `url("${previewImage}")` }}
          onClick={() => fileRef.current?.click()}
        >
          <Camera size={35} />
        </button>
        <div className="flex flex-wrap  items-center space-x-[15px]">
          {selectedLabels.map((el) => (
            <Button variant={"outline"} className="space-x-[10px]" size={"sm"}>
              <Tag size={17} />
              <span>{el.name}</span>
            </Button>
          ))}
          <Popover
            onOpenChange={(e) => {
              if (!e) {
                setTempLabels([]);
              } else {
                setTempLabels(selectedLabels);
              }
            }}
          >
            <PopoverTrigger asChild>
              {selectedLabels.length ? (
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <Pen className="h-3 w-3" />
                </Button>
              ) : (
                <Button variant={"outline"} className="space-x-[10px]">
                  <Plus size={17} />
                  <span>Add Label</span>
                </Button>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <div className="">
                {labels.map((el) => (
                  <div
                    onClick={() => {
                      if (tempLabelIds.includes(el._id)) {
                        setTempLabels((prev) =>
                          prev.filter((i) => i._id !== el._id)
                        );
                      } else {
                        setTempLabels((prev) => [...prev, el]);
                      }
                    }}
                    className="w-full px-[15px] py-[10px] cursor-pointer text-sm hover:bg-gray-50 flex items-center space-x-[10px]"
                  >
                    {tempLabelIds.includes(el._id) && (
                      <Check size={17} color="blue" />
                    )}
                    <span>{el.name}</span>
                  </div>
                ))}
                <div
                  onClick={() => {
                    setSelectedLabels(tempLabels);
                  }}
                  className="w-full px-[15px] py-[10px] cursor-pointer text-sm hover:bg-gray-50 text-center"
                >
                  <span className="text-[blue] font-medium">Apply</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[530px] w-auto pt-[30px] px-[30px] space-y-[35px]"
      >
        <IconInput
          placeholder="Name"
          icon={User}
          isError={errors.name}
          error={errors.name?.message}
          required={true}
          {...register("name", {
            required: setRequired("Name is required."),
          })}
        />
        <IconInput
          placeholder="Email Address"
          icon={MailIcon}
          isError={errors.email}
          error={errors.email?.message}
          {...register("email", {
            pattern: emailPattern,
          })}
        />
        <IconInput
          placeholder="Phone Number"
          icon={Phone}
          isError={errors.phoneNumber}
          error={errors.phoneNumber?.message}
          required={true}
          {...register("phoneNumber", {
            required: setRequired("Phone Number is required."),
          })}
        />
        <LoadingButton
          disabled={isDirty && !isValid}
          loading={createContactMutation.isLoading}
          type="submit"
          className="w-fit px-[50px] py-[25px] rounded-[100px]"
        >
          Save
        </LoadingButton>
      </form>
    </div>
  );
};
