import { ContactDetailCard, ContactHeaderCard } from "@/components/contact";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteContact, useGetContact } from "@/hooks/contacts.hook";
import { CrudButton, CustomAlertDialog } from "@/sharers/other";
import { ContactType } from "@/types/contact.types";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ContactPage = () => {
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useToast();

  const deleteContactMutation = useDeleteContact();

  const query = useGetContact(id?.toString() || "");
  const contact: ContactType = query.data;

  const confirmDelete = async () => {
    //@ts-ignore
    await deleteContactMutation.mutateAsync(contact._id, {
      onSuccess: () => {
        toast({
          title: "Successfully delete a contact!",
        });
      },
      onError(error: AxiosError) {
        toast({
          //@ts-ignore
          title: error.response?.data.message,
          variant: "destructive",
        });
      },
    });

    setOpenDelDialog(false);
  };

  if (query.isLoading) {
    return (
      <div className="w-full h-[calc(100vh-100px)] space-y-[5px] flex flex-col items-center justify-center">
        <Loader className="animate-spin" size={30} />
        <h1>Fetching data... Please wait!</h1>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="w-full relative lg:px-0 sm:px-[30px] pb-[50px]">
        <div className="w-full border-b py-[30px] space-y-[30px]">
          <ContactHeaderCard contact={contact} />
          <div className="space-x-[20px] md:pl-[180px] flex sm:justify-start justify-center">
            <CrudButton
              onClick={() => {
                navigate(`/contact/edit/${contact._id}`);
              }}
              styleType="update"
            >
              Edit
            </CrudButton>
            <CrudButton
              styleType="delete"
              onClick={() => {
                setOpenDelDialog(true);
              }}
            >
              Delete
            </CrudButton>
          </div>
        </div>
        <div className="pt-[20px] md:px-0 px-[10px]">
          <ContactDetailCard contact={contact} />
        </div>
      </div>
      <CustomAlertDialog
        open={openDelDialog}
        setOpen={setOpenDelDialog}
        title={`Are you sure to delete contact?`}
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        isLoading={deleteContactMutation.isLoading}
        onConfirm={confirmDelete}
      />
    </>
  );
};
