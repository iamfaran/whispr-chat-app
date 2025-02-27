import { useAuth } from "../../context/AuthContext";
const NoChat = () => {
  const { user } = useAuth();
  return (
    <div className="sm:flex items-center justify-center w-full h-full hidden ">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user ? user.fullName : "User"} ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default NoChat;
