import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Prop {
  name: string;
  bgColor?: string;
  img?: string;
}

export const PhotoAvatar = ({ name, bgColor, img }: Prop) => {
  return (
    <Avatar className="h-[150px] w-[150px]">
      {img && <AvatarImage className="w-full h-full object-cover" src={img} alt="" />}
      <AvatarFallback
        className="text-white text-4xl font-bold"
        style={{ background: bgColor }}
      >
        {name.substring(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};
