import { ContactoIcon, DropDown } from "@/sharers/other";
import { Button } from "../ui/button";
import {
  LogOutIcon,
  Menu,
  Search,
  SettingsIcon,
  UserCircle,
} from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/provider/AuthContextProvider";

export const Navbar = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { dispatch, state: auth } = useContext(AuthContext);

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
          },
        },
      ],
    },
  ];
  return (
    <div className="w-full h-[60px] fixed top-0 left-0 border-b z-[9]">
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
          <div className="rounded-lg flex items-center relative border">
            <div className="pl-[20px]">
              <Search className="text-gray-500" size={18} />
            </div>
            <Input
              className="w-full h-auto border-none px-[20px] py-[10px] focus-visible:ring-0"
              placeholder="Type contact or search..."
            />
          </div>
        </div>
        <div className="w-[25%] flex justify-end items-center">
          <div className="w-fit h-fit pr-[20px]">
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
    </div>
  );
};
