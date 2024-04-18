import { logout } from "@/lib/action";
import { SquareArrowOutDownLeft } from "lucide-react";

import LogoutBtn from "./ui/logoutBtn";
import SubmitButton from "./ui/SubmitButton";

const LogoutUser = () => {
  return (
    <form action={logout}>
      <LogoutBtn />
    </form>
  );
};

export default LogoutUser;
