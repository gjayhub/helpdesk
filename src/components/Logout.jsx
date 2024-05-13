import { logout } from "@/lib/action";
import { SquareArrowOutDownLeft } from "lucide-react";

import LogoutBtn from "./ui/logoutBtn";
import SubmitButton from "./ui/SubmitButton";

const LogoutUser = () => {
  return (
    <form className="px-1" action={logout}>
      <LogoutBtn />
    </form>
  );
};

export default LogoutUser;
