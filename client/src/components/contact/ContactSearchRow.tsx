import { ContactType } from "@/types/contact.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Prop {
  contact: ContactType;
}

const ContactSearchRow = ({ contact }: Prop) => {
  return (
    <div className="w-full hover:bg-gray-100 flex items-center space-x-[20px] py-[10px] px-[20px] cursor-pointer">
      <Avatar>
        {contact.photo && <AvatarImage src={contact.photo} alt="@shadcn" />}
        <AvatarFallback
          className="text-white"
          style={{ background: contact.bgColor }}
        >
          {contact.name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <h1>{contact.name}</h1>
    </div>
  );
};

export default ContactSearchRow;
