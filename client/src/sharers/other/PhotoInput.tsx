import { Camera } from "lucide-react";
import React, { useRef } from "react";

interface Prop {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  img?: string;
}

export const PhotoInput = ({ onChange, img }: Prop) => {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        onChange={onChange}
        accept="image/*"
        ref={fileRef}
        type="file"
        className="hidden"
      />
      <button
        className="bg-blue-200 relative overflow-hidden hover:opacity-75 rounded-full cursor-pointer min-h-[150px] min-w-[150px] max-w-[150px] flex justify-center items-center"
        style={{
          backgroundImage: `url("${img}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => fileRef.current?.click()}
      >
        <Camera size={35} />
      </button>
    </>
  );
};
