import { HorizontalLoader, LoadingButton } from "@/sharers/other";
import { Plus, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarBtn from "./SidebarBtn";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { LabelCreateDialog, LabelSidebarButton } from "../label";
import { useGetLabels } from "@/hooks/labels.hooks";
import { LabelType } from "@/types/label.types";
import { splitPagesData } from "@/lib/handleInfiniteScroll";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ open, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [openCreateLabel, setOpenCreateLabel] = useState(false);

  const query = useGetLabels();
  const labels = splitPagesData<LabelType>(query.data) || [];

  useInfiniteScroll(ref.current, query);

  return (
    <>
      <div
        ref={ref}
        className={`
        lg:w-[25%] w-[90%] h-[100vh] overflow-y-auto overflow-x-hidden hide-scroll lg:border-none border-r lg:shadow-none shadow-lg bg-white z-[9] lg:pt-0 pb-[100px] pr-[20px] fixed left-0
       lg:translate-x-0 ${
         open ? "translate-x-0" : "translate-x-[-100%]"
       } duration-500
        `}
      >
        <div className="pl-[30px]">
          <LoadingButton
            className="py-[24px] px-[20px] rounded-[100px]"
            onClick={() => {
              navigate("/create");
              setOpen(false);
            }}
          >
            <Plus />
            <span>Create contact</span>
          </LoadingButton>
        </div>

        <div className="w-full pt-[20px]">
          <SidebarBtn
            icon={User}
            active={pathname == "/"}
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
          >
            Contact
          </SidebarBtn>
          <div className="w-full flex justify-start items-center pl-[40px] py-[15px] space-x-[60%]">
            <h1 className="font-bold ">Labels</h1>
            <Button variant={"ghost"} onClick={() => setOpenCreateLabel(true)}>
              <Plus />
            </Button>
          </div>
          {labels &&
            labels.map((label: LabelType) => (
              <LabelSidebarButton
                setSidebarOpen={setOpen}
                key={label._id}
                label={label}
              />
            ))}
          {query.isFetchingNextPage && <HorizontalLoader />}
        </div>
      </div>
      <LabelCreateDialog
        open={openCreateLabel}
        setOpen={setOpenCreateLabel}
      ></LabelCreateDialog>
    </>
  );
};

export default Sidebar;
