import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { ContactType } from "@/types/contact.types";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { Trash, Pencil } from "lucide-react";
import { useDeleteContact } from "@/hooks/contacts.hook";
import { AxiosError } from "axios";
import { CustomAlertDialog } from "../../sharers/other/";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
interface Prop {
  contact: ContactType;
}

const ContactTableRow = ({ contact }: Prop) => {
  const deleteContact = useDeleteContact();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navgiate = useNavigate();

  const handleEdit = async () => {
    navgiate(`/edit/${contact._id}`);
  };

  const confirmDelete = async () => {
    //@ts-ignore
    await deleteContact.mutateAsync(contact._id, {
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

    setOpen(false);
  };

  return (
    <>
      <TableRow key={contact._id} className="border-none cursor-pointer">
        <TableCell className="font-medium py-[20px]">
          <div className="flex items-center space-x-[10px]">
            <Avatar>
              {contact.photo && (
                <AvatarImage src={contact.photo} alt="@shadcn" />
              )}
              <AvatarFallback
                className="text-white"
                style={{ background: contact.bgColor }}
              >
                {contact.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span>{contact.name}</span>
          </div>
        </TableCell>
        <TableCell className="font-medium py-[20px] md:table-cell hidden">
          {contact.email || ""}
        </TableCell>
        <TableCell className="font-medium py-[20px] sm:table-cell hidden">
          {contact.phoneNumber}
        </TableCell>
        <TableCell className="font-medium py-[20px]">
          <div className="flex justify-end items-center">
            <div className="flex items-center space-x-[15px]">
              <Pencil size={17} onClick={handleEdit} />
              <Trash size={17} onClick={() => setOpen(true)} />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <CustomAlertDialog
        open={open}
        setOpen={setOpen}
        title={`Are you sure to delete contact?`}
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        isLoading={deleteContact.isLoading}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ContactTableRow;
