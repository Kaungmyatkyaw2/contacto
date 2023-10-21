import { ContactType } from "@/types/contact.types";
import { MailIcon, PhoneIcon, User } from "lucide-react";

interface Prop {
  contact: ContactType;
}

export const ContactDetailCard = ({ contact }: Prop) => {
  return (
    <div className="sm:w-[600px] w-full py-[20px] px-[20px] bg-gray-50 rounded-[20px]">
      <h1 className="font-bold text-xl pb-[20px]">Contact Details</h1>
      <div className="space-y-[20px]">
        <div className="flex items-center space-x-[15px] text-sm">
          <User size={20} />
          <span className="text-blue-700">{contact.name}</span>
        </div>
        <div className="flex items-center space-x-[15px] text-sm">
          <MailIcon size={20} />
          <span className="text-blue-700">{contact.email || "No Email"}</span>
        </div>
        <div className="flex items-center space-x-[15px] text-sm">
          <PhoneIcon size={20} />
          <a className="text-blue-700" href={`tel:${contact.phoneNumber}`}>
            {contact.phoneNumber}
          </a>
        </div>
      </div>
    </div>
  );
};

