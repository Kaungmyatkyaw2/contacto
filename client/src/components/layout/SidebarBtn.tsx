import { ButtonProps } from '../ui/button'


interface Props extends ButtonProps {
    icon: any
}

const SidebarBtn = ({ ...props }: Props) => {
    return (
        <button {...props} className=" w-full flex justify-start items-center pl-[40px] py-[15px] space-x-[10px] bg-white hover:bg-gray-100  rounded-tr-[100px] rounded-br-[100px]">
            <props.icon size={20} />
            <span className="text-[14px] font-medium">
                {props.children}
            </span>
        </button>)
}

export default SidebarBtn