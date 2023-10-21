import { ContactType } from "@/types/contact.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LabelTagButton } from "../label";

interface Prop {
  contact: ContactType;
}

export const ContactHeaderCard = ({ contact }: Prop) => {
  return (
    <div className="w-full h-full flex  sm:flex-row flex-col  items-center sm:space-x-[30px] md:space-y-0 space-y-[20px]">
      <Avatar className="h-[150px] w-[150px]">
        {contact.photo && <AvatarImage src={contact.photo} alt="" />}
        <AvatarFallback
          className="text-white text-4xl font-bold"
          style={{ background: contact.bgColor }}
        >
          {contact.name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>

      <div>
        <h1 className="text-[30px] font-bold">{contact.name}</h1>
        <div className="flex flex-wrap items-center gap-4 w-full">
          {contact.labels.map((el) => (
            <LabelTagButton>{el.name}</LabelTagButton>
          ))}

          {!contact.labels.length && (
            <LabelTagButton>No Label Tagged</LabelTagButton>
          )}
        </div>
      </div>
    </div>
  );
};
