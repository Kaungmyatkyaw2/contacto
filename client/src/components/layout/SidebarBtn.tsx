import { ButtonProps } from "../ui/button";

interface Props extends ButtonProps {
  icon: any;
  active?: boolean;
}

const SidebarBtn = ({ active, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`w-full flex justify-start items-center pl-[40px] py-[15px] space-x-[10px]   rounded-tr-[100px] rounded-br-[100px] ${
        active ? "bg-blue-400 bg-opacity-20" : "bg-white hover:bg-gray-100"
      }`}
    >
      <props.icon size={20} />
      <span className="text-[14px] font-medium">{props.children}</span>
    </button>
  );
};

export default SidebarBtn;
