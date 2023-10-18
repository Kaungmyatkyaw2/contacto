import { Pencil, Tag, Trash } from "lucide-react";
import { LabelType } from "@/types/label.types";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomAlertDialog } from "@/sharers/other";
import React, { useState } from "react";
import { useDeleteLabel } from "@/hooks/labels.hooks";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { LabelEditDialog } from "./LabelEditDialog";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: LabelType;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LabelSidebarButton = ({
  label,
  setSidebarOpen,
  ...props
}: Props) => {
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [openEditBox, setOpenEditBox] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.includes(`/label/${label._id}`);
  const { toast } = useToast();
  const deleteLableMutation = useDeleteLabel();

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpenEditBox(true);
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpenDeleteBox(true);
  };

  const handleDelete = async () => {
    //@ts-ignore
    await deleteLableMutation.mutate(label._id, {
      onSuccess: () => {
        toast({
          title: "Successfully delete a label!",
        });
        setOpenDeleteBox(false);
      },
      onError(error: AxiosError) {
        toast({
          //@ts-ignore
          title: error.response?.data.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <div
        {...props}
        className={`
        "cursor-pointer w-full flex justify-between items-center px-[40px] py-[15px]   rounded-tr-[100px] rounded-br-[100px] group
        ${isActive ? "bg-blue-400 bg-opacity-20" : "bg-white hover:bg-gray-100"}
        `}
        onClick={() => {
          setSidebarOpen(false);
          navigate(`/label/${label._id}`);
        }}
      >
        <div className="flex items-center space-x-[10px]">
          <Tag size={20} />
          <span className="text-[14px] font-medium">{label.name}</span>
        </div>
        <div
          className={`
          ${
            isActive ? "flex" : "hidden"
          } group-hover:flex items-center space-x-[25px]`}
        >
          <button onClick={handleDeleteClick}>
            <Trash size={17} />
          </button>
          <button onClick={handleEditClick}>
            <Pencil size={17} />
          </button>
        </div>
      </div>
      <CustomAlertDialog
        open={openDeleteBox}
        setOpen={setOpenDeleteBox}
        title={`Are you sure to delete ${label.name}?`}
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        isLoading={deleteLableMutation.isLoading}
        onConfirm={handleDelete}
      />
      <LabelEditDialog
        open={openEditBox}
        setOpen={setOpenEditBox}
        label={label}
      />
    </>
  );
};
