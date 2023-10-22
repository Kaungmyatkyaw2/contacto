import { UserProfileSetting } from "@/components/user";
import { UserPasswordSetting } from "@/components/user/UserPasswordSetting";

export const SettingPage = () => {
  return (
    <div className="py-[30px] px-[20px] space-y-[80px]">
      <UserProfileSetting />
      <UserPasswordSetting />
    </div>
  );
};
