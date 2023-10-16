import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { ContactType } from "@/types/contact.types";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { DeleteIcon, Pen } from "lucide-react";
import { useDeleteContact } from "@/hooks/contacts.hook";
import { AxiosError } from "axios";
import ContactDeleteDialog from "../../sharers/other/AlertDialog";
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/lib/axiosClient";
interface Prop {
  contact: ContactType;
}

const ContactTableRow = ({ contact }: Prop) => {
  const deleteContact = useDeleteContact();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navgiate = useNavigate();
  const avatarBg = `bg-[${contact.bgColor}]`;

  const handleEdit = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["contacts", contact._id],
      queryFn: () =>
        axiosClient()
          .get(`/contacts/${contact._id}`)
          .then((res) => res.data),
    });
    navgiate(`/edit/${contact._id}`);
  };

  const confirmDelete = async () => {
    //@ts-ignore
    await deleteContact.mutateAsync(contact._id, {
      onSuccess: () => {
        toast({
          title: "Successfully delete a contact!",
        });
        queryClient.invalidateQueries(["contacts"], { exact: true });
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
              <AvatarFallback className={`${avatarBg}`}>
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
        <TableCell className="font-medium py-[20px] flex justify-end">
          <div className="flex items-center space-x-[15px] w-fit">
            <Pen size={17} onClick={handleEdit} />
            <DeleteIcon size={17} onClick={() => setOpen(true)} />
          </div>
        </TableCell>
      </TableRow>
      <ContactDeleteDialog
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
