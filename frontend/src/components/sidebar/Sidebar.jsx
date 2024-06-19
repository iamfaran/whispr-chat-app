import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";
const Sidebar = () => {
  return (
    <div className="border w-[400px] border-red-500 fixed left-0 h-full top-0 p-4 overflow-y-auto">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
