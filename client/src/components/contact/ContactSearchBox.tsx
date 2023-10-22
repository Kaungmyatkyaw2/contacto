import { Loader, Search } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { Input } from "../ui/input";
import { ContactType } from "@/types/contact.types";
import { useSearchContacts } from "@/hooks/contacts.hook";
import ContactSearchRow from "./ContactSearchRow";

export const ContactSearchBox = () => {
  const [search, setSearch] = useState<string>("");
  const searchValue = useDeferredValue(search);

  const { data, isLoading } = useSearchContacts(searchValue);

  const contacts: ContactType[] = data?.data?.data || [];

  return (
    <div className="rounded-lg flex items-center relative border">
      <div className="pl-[20px]">
        {isLoading ? (
          <Loader className="animate-spin" size={18} />
        ) : (
          <Search className="text-gray-500" size={18} />
        )}
      </div>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="w-full h-auto border-none px-[20px] py-[10px] focus-visible:ring-0"
        placeholder="Type contact or search..."
      />
      {contacts.length ? (
        <div className="absolute w-[100%] h-auto bg-white bottom-0 left-0 translate-y-[100%] shadow-sm border rounded-md">
          {contacts.map((contact) => (
            <ContactSearchRow key={contact._id} contact={contact} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
