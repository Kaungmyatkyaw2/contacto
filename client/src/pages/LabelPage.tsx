import { ContactTable } from "@/components/contact";
import { useGetContactsByLabel } from "@/hooks/contacts.hook";
import { ContactType } from "@/types/contact.types";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

export const LabelPage = () => {
  const { id } = useParams();
  const query = useGetContactsByLabel(id || "");
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
