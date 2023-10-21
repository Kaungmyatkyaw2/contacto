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
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/contact/edit/${contact._id}`);
  };
  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenDelDialog(true);
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

    setOpenDelDialog(false);
  };

  return (
    <>
      <TableRow
        onClick={() => {
          navigate(`/contact/${contact._id}`);
        }}
        key={contact._id}
        className="border-none cursor-pointer"
      >
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
              <Trash size={17} onClick={handleDelete} />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <CustomAlertDialog
        open={openDelDialog}
        setOpen={setOpenDelDialog}
        title={`Are you sure to delete contact?`}
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        isLoading={deleteContact.isLoading}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ContactTableRow;
