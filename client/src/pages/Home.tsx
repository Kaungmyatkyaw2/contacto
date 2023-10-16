import ContactTableRow from "@/components/contact/ContactTableRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetContacts } from "@/hooks/contacts.hook";
import { ContactType } from "@/types/contact.types";
import { Loader } from "lucide-react";

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
              <TableHead className="sm:w-[30%] w-[80%] text-[16px] font-bold">
                Name
              </TableHead>
              <TableHead className="w-[30%] text-[16px] font-bold md:table-cell hidden">
                Email
              </TableHead>
              <TableHead className="w-[30%] text-[16px] font-bold sm:table-cell hidden">
                Phone number
              </TableHead>
              <TableHead className="sm:w-[10%] w-[20%] text-[16px] font-bold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-[200px]">
            {contacts &&
              contacts?.map((contact: ContactType) => (
                <ContactTableRow key={contact._id} contact={contact} />
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
