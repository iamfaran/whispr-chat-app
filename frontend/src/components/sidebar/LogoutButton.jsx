import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="mt-auto">
      <BiLogOut onClick={handleLogout} className="w-6 h-6" />
    </div>
  );
};
export default LogoutButton;
