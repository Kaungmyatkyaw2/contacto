import { useToast } from '@/components/ui/use-toast'
import axiosClient from '@/lib/axiosClient'
import { IconInput } from '@/sharers/form'
import { LoadingButton } from '@/sharers/other'
import { emailPattern, setRequired } from '@/validation'
import { Camera, MailIcon, Phone, Plus, User } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormValues {
    email: string;
    name: string;
    phoneNumber: string;
}

export const CreateContact = () => {
    const [previewImage, setPreviewImage] = useState<null | string>(null);
    const [file, setFile] = useState<null | File>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { toast } = useToast();

    const form = useForm<FormValues>();
    const { register, formState, handleSubmit } = form;
    const { errors, isDirty, isValid } = formState;


    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setPreviewImage(URL.createObjectURL(e.target.files[0] || {}));
            setFile(e.target.files[0])
        }
    }

    const onSubmit = async (values: FormValues) => {

        try {
            const formData = new FormData();
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("name", values.name);

            values.email && formData.append("email", values.email);
            file && formData.append("photo", file);

            await axiosClient.post("/contacts", formData);

            toast({
                title: "Successfully create a contact !",
            })
            // navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full relative'>

            <div className="w-full py-[30px] border-b flex items-center space-x-[30px]">
                <input onChange={handleSelectFile} accept="image/*" ref={fileRef} type="file" className='hidden' />
                <button className='bg-blue-200 hover:opacity-75 rounded-full cursor-pointer h-[150px] w-[150px] flex justify-center items-center'
                    style={{ backgroundImage: `url("${previewImage}")` }}
                    onClick={() => fileRef.current?.click()}
                >
                    <Camera size={35} />
                </button>
                <LoadingButton variant={"outline"} size={'sm'}>
                    <Plus size={19} />
                    <span>
                        Add Label
                    </span>
                </LoadingButton>
            </div>

            <form noValidate onSubmit={handleSubmit(onSubmit)} className='sm:w-[530px] w-auto pt-[30px] px-[30px] space-y-[35px]'>
                <IconInput placeholder='Name' icon={User}
                    isError={errors.name}
                    error={errors.name?.message}
                    required={true}
                    {...register("name", {
                        required: setRequired("Name is required."),
                    })}
                />
                <IconInput placeholder='Email Address' icon={MailIcon}
                    isError={errors.email}
                    error={errors.email?.message}
                    {...register("email", {
                        pattern: emailPattern,
                    })}
                />
                <IconInput placeholder='Phone Number' icon={Phone}
                    isError={errors.phoneNumber}
                    error={errors.phoneNumber?.message}
                    required={true}
                    {...register("phoneNumber", {
                        required: setRequired("Phone Number is required."),
                    })}
                />
                <LoadingButton
                    disabled={isDirty && !isValid}
                    type="submit"
                    className="w-fit px-[50px] py-[25px] rounded-[100px]"
                >
                    Save
                </LoadingButton>
            </form>

        </div>
    )
}
