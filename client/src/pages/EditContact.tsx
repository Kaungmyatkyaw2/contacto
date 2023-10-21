import { LabelPopOver } from "@/components/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetContact, useUpdateContact } from "@/hooks/contacts.hook";
import { useGetLabels } from "@/hooks/labels.hooks";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { splitPagesData } from "@/lib/handleInfiniteScroll";
import { IconInput } from "@/sharers/form";
import { LoadingButton } from "@/sharers/other";
import { LabelType } from "@/types/label.types";
import { emailPattern, setRequired } from "@/validation";
import { Camera, MailIcon, Phone, Tag, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface FormValues {
  email: string;
  name: string;
  phoneNumber: string;
}

export const EditContact = () => {
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [file, setFile] = useState<null | File>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const form = useForm<FormValues>();
  const { register, formState, handleSubmit, reset, setValue } = form;
  const { errors, isDirty, isValid } = formState;

  const navigate = useNavigate();
  const { id } = useParams();

  const updateContactoMutation = useUpdateContact();
  const getContactQuery = useGetContact(id?.toString() || "");

  const getLabelsQuery = useGetLabels();
  const labels = splitPagesData<LabelType>(getLabelsQuery.data) || [];

  const [selectedLabels, setSelectedLabels] = useState<LabelType[]>([]);
  const [tempLabels, setTempLabels] = useState<LabelType[]>([]);
  const tempLabelIds = tempLabels.map((el) => el._id);

  useInfiniteScroll(popoverRef.current, getLabelsQuery, [getLabelsQuery]);

  useEffect(() => {
    if (getContactQuery.data) {
      const data = getContactQuery.data;
      setValue("email", data.email || "");
      setValue("name", data.name || "");
      setValue("phoneNumber", data.phoneNumber || "");
      setSelectedLabels(data.labels);
      setPreviewImage(data.photo);
    }
  }, [getContactQuery.data]);

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
    await updateContactoMutation.mutateAsync(
      { id: `${id}`, values: formData },
      {
        onSuccess: () => {
          toast({
            title: "Successfully update a contact!",
          });
          reset();
          setPreviewImage(null);
          navigate("/");
        },
        onError: (error: any) => {
          toast({
            //@ts-ignore
            title: error?.response?.data.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const onLabelOpenChange = (e: boolean) => {
    if (!e) {
      setTempLabels([]);
    } else {
      setTempLabels(selectedLabels);
    }
  };

  const onLabelChoose = (el: LabelType) => {
    if (tempLabelIds.includes(el._id)) {
      setTempLabels((prev) => prev.filter((i) => i._id !== el._id));
    } else {
      setTempLabels((prev) => [...prev, el]);
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full py-[30px] border-b flex md:flex-row flex-col md:items-center md:space-x-[30px] md:space-y-0 space-y-[20px] md:pl-0 pl-[30px]">
        <input
          onChange={handleSelectFile}
          accept="image/*"
          ref={fileRef}
          type="file"
          className="hidden"
        />
        <button
          className="bg-blue-200 hover:opacity-75 rounded-full cursor-pointer min-h-[150px] min-w-[150px] flex justify-center items-center"
          style={{ backgroundImage: `url("${previewImage}")` }}
          onClick={() => fileRef.current?.click()}
        >
          <Camera size={35} />
        </button>
        <div className="flex flex-wrap items-center space-x-[15px] w-full">
          {selectedLabels.map((el) => (
            <Button
              key={el._id}
              variant={"outline"}
              className="space-x-[10px]"
              size={"sm"}
            >
              <Tag size={17} />
              <span>{el.name}</span>
            </Button>
          ))}
          <LabelPopOver
            isLoading={getLabelsQuery.isFetchingNextPage}
            ref={popoverRef}
            onOpenChange={onLabelOpenChange}
            selectedLabels={selectedLabels}
            labels={labels}
            onChoose={onLabelChoose}
            onApply={() => {
              setSelectedLabels(tempLabels);
            }}
            tempLabelIds={tempLabelIds}
          />
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
          loading={updateContactoMutation.isLoading}
          type="submit"
          className="w-fit px-[50px] py-[25px] rounded-[100px]"
        >
          Save
        </LoadingButton>
      </form>
    </div>
  );
};
