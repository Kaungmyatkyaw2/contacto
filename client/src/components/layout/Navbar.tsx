import { ContactoIcon, DropDown } from "@/sharers/other";
import { Button } from "../ui/button";
import {
  LogOutIcon,
  Menu,
  SearchIcon,
  SettingsIcon,
  UserCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/provider/AuthContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import { ContactSearchBox, ContactSearchDialog } from "../contact";

export const Navbar = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const navigate = useNavigate();
  const { dispatch, state: auth } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const dropdownContents = [
    {
      menus: [
        { name: "Profile", icon: UserCircle },
        { name: "Setting", icon: SettingsIcon },
        {
          name: "Log out",
          icon: LogOutIcon,
          onClick: () => {
            dispatch({ type: "logOut" });
            queryClient.removeQueries(["contacts"]);
            queryClient.removeQueries(["labels"]);
            navigate("/login");
          },
        },
      ],
    },
  ];
  return (
    <>
      <div className="w-full h-[60px] fixed top-0 left-0 border-b z-[9] bg-white">
        <div className="w-ful h-full flex justify-between items-center lg:px-[30px] px-[15px]">
          <div className="w-[25%] flex items-center space-x-[20px]">
            <Button variant={"ghost"} onClick={() => setOpen((prev) => !prev)}>
              <Menu />
            </Button>
            <ContactoIcon
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="w-[50%] md:block hidden">
            <ContactSearchBox />
          </div>
          <div className="w-[25%] flex justify-end items-center space-x-[20px]">
            <Button
              onClick={() => {
                setOpenSearchDialog(true);
              }}
              variant={"outline"}
              size={"icon"}
              className="rounded-full md:hidden flex"
            >
              <SearchIcon className="h-4 w-4" />
            </Button>
            <DropDown content={dropdownContents}>
              <Avatar>
                {auth?.user?.photo && (
                  <AvatarImage src={auth?.user?.photo} alt="@shadcn" />
                )}
                <AvatarFallback className="bg-green-500 text-white font-bold">
                  {auth?.user?.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </DropDown>
          </div>
        </div>
      </div>

      <ContactSearchDialog
        open={openSearchDialog}
        onOpenChange={setOpenSearchDialog}
      />
    </>
  );
};
