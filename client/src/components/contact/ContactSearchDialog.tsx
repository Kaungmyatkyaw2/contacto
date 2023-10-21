import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchContacts } from "@/hooks/contacts.hook";
import { ContactType } from "@/types/contact.types";
import { DialogProps } from "@radix-ui/react-dialog";
import { useDeferredValue, useEffect, useState } from "react";
import ContactSearchRow from "./ContactSearchRow";

interface Prop extends DialogProps {}

export const ContactSearchDialog = ({ ...props }: Prop) => {
  const [search, setSearch] = useState<string>("");
  const searchValue = useDeferredValue(search);

  const { data } = useSearchContacts(searchValue);
  const contacts: ContactType[] = data?.data?.data || [];

  useEffect(() => {
    if (!props.open) setSearch("");
  }, [props.open]);
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Share Conacts</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              id="link"
              placeholder="Search contacts..."
            />
            <div className="bg-white">
              {contacts.map((contact) => (
                <ContactSearchRow key={contact._id} contact={contact} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
