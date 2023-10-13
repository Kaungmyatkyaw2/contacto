import { ContactoIcon, DropDown } from "@/sharers/other"
import { Button } from "../ui/button"
import { LogOutIcon, Menu, PersonStanding, Search, SettingsIcon, UserCircle } from "lucide-react"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"


export const Navbar = ({setOpen} : {setOpen :  React.Dispatch<React.SetStateAction<boolean>>}) => {

  const navigate = useNavigate()
  const dropdownContents = [
    {
      menus: [{ name: "Profile", icon: UserCircle }, { name: "Setting", icon: SettingsIcon }, { name: "Log out", icon: LogOutIcon }]
    }

  ]
  return (
    <div className="w-full h-[60px] fixed top-0 left-0 border-b">
      <div className="w-ful h-full flex justify-between items-center">
        <div className="w-[25%] flex items-center space-x-[20px] pl-[30px]">
          <Button variant={"ghost"} onClick={() => setOpen(prev => !prev)}><Menu /></Button>
          <ContactoIcon onClick={() => { navigate("/") }} />
        </div>
        <div className="w-[50%] md:block hidden">
          <div className="rounded-lg flex items-center relative border">
            <div className="pl-[20px]"><Search className="text-gray-500" size={18} /></div>
            <Input className="w-full h-auto border-none px-[20px] py-[10px] focus-visible:ring-0" placeholder="Type contact or search..." />
          </div>

        </div>
        <div className="w-[25%] flex justify-end items-center pr-[30px]">
          <div className="w-fit h-fit pr-[20px]">
            <DropDown content={dropdownContents}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  )
}
