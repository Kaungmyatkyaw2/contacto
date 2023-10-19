import { ContactTable } from "@/components/contact";
import { useGetContactsByLabel } from "@/hooks/contacts.hook";
import { HorizontalLoader } from "@/sharers/other";
import { ContactType } from "@/types/contact.types";
import { useParams } from "react-router-dom";

export const LabelPage = () => {
  const { id } = useParams();
  const query = useGetContactsByLabel(id || "");
  const contacts: ContactType[] | undefined = query.data?.data?.data;

  return (
    <div className="lg:px-0 px-[30px]">
      {query.isLoading ? (
        <HorizontalLoader />
      ) : (
        <ContactTable contacts={contacts || []} />
      )}

      {!query.isLoading && query.isFetching && <HorizontalLoader />}
    </div>
  );
};
