import { ContactTable } from "@/components/contact";
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
        <ContactTable contacts={contacts || []} />
      )}
    </div>
  );
};
