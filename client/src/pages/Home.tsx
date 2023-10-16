import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetContacts } from "@/hooks/contacts.hook";
import { DeleteIcon, Loader, Pen } from "lucide-react";

interface ContactType {
  email?: string | undefined;
  name: string;
  phoneNumber: string;
  _id: string;
  photo?: string;
  bgColor: string;
}

export const Home = () => {
  const query = useGetContacts();
  const contacts: ContactType[] | undefined = query.data?.data?.data;

  return (
    <div className="lg:px-0 px-[30px]">
      {query.isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 left-0 bg-white w-full ">
            <TableRow className="hover:bg-white">
              <TableHead className="sm:w-[30%] w-[50%] text-[16px] font-bold">
                Name
              </TableHead>
              <TableHead className="w-[30%] text-[16px] font-bold md:table-cell hidden">
                Email
              </TableHead>
              <TableHead className="w-[30%] text-[16px] font-bold sm:table-cell hidden">
                Phone number
              </TableHead>
              <TableHead className="sm:w-[10%] w-[50%] text-[16px] font-bold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-[200px]">
            {contacts &&
              contacts?.map((contact: ContactType) => (
                <TableRow
                  key={contact._id}
                  className="border-none cursor-pointer"
                >
                  <TableCell className="font-medium py-[20px]">
                    <div className="flex items-center space-x-[10px]">
                      <Avatar>
                        {contact.photo && (
                          <AvatarImage src={contact.photo} alt="@shadcn" />
                        )}
                        <AvatarFallback className={`bg-[${contact.bgColor}]`}>
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
                      <Pen size={17} />
                      <DeleteIcon size={17} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
