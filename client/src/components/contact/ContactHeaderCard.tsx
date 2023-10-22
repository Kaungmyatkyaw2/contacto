import { ContactType } from "@/types/contact.types";
import { LabelTagButton } from "../label";
import { PhotoAvatar } from "@/sharers/other";

interface Prop {
  contact: ContactType;
}

export const ContactHeaderCard = ({ contact }: Prop) => {
  return (
    <div className="w-full h-full flex  sm:flex-row flex-col  items-center sm:space-x-[30px] md:space-y-0 space-y-[20px]">
      <PhotoAvatar
        name={contact.name}
        bgColor={contact.bgColor}
        img={contact.photo}
      />

      <div>
        <h1 className="text-[30px] font-bold">{contact.name}</h1>
        <div className="flex flex-wrap items-center gap-4 w-full">
          {contact.labels.map((el) => (
            <LabelTagButton key={el._id}>{el.name}</LabelTagButton>
          ))}

          {!contact.labels.length && (
            <LabelTagButton>No Label Tagged</LabelTagButton>
          )}
        </div>
      </div>
    </div>
  );
};
