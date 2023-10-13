import { LoadingButton } from '@/sharers/other';
import { Plus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarBtn from './SidebarBtn';

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ open, setOpen }: Props) => {

    const navigate = useNavigate();

    return (
        <div className={`
        lg:w-[25%] w-[90%]  h-[100vh] lg:border-none border-r lg:shadow-none shadow-lg bg-white z-[999] lg:pt-0 pt-[20px] pr-[20px] fixed left-0
       lg:translate-x-0 ${open ? "translate-x-0" : "translate-x-[-100%]"} duration-500
        `}>
            <div className="pl-[30px]">
                <LoadingButton
                    className="py-[24px] px-[20px] rounded-[100px]"
                    onClick={() => navigate("/create")}
                >
                    <Plus />
                    <span>
                        Create contact
                    </span>
                </LoadingButton>
            </div>

            <div className="w-full pt-[20px]">
                <SidebarBtn icon={User}
                    onClick={() => {
                        navigate("/")
                        setOpen(false)
                    }}
                >
                    Contact
                </SidebarBtn>
            </div>

        </div>)
}

export default Sidebar