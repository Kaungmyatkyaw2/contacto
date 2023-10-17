import { ContactType } from "@/types/contact.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ContactTableRow from "./ContactTableRow";
import { Tag } from "lucide-react";
interface Prop {
  contacts: ContactType[];
}

export const ContactTable = ({ contacts }: Prop) => {
  return contacts.length ? (
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
  ) : (
    <div className="w-full h-[calc(100vh-40px)] flex flex-col justify-center items-center space-y-[20px]">
      <Tag size={50} />
      <h1 className="font-bold text-gray-500 text-xl">No contact yet</h1>
    </div>
  );
};
