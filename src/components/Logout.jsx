import { logout } from "@/lib/action";
import { SquareArrowOutDownLeft } from "lucide-react";

const LogoutUser = () => {
  return (
    <form action={logout}>
      <button type="submit">
        <SquareArrowOutDownLeft />
        <p>logout</p>
      </button>
    </form>
  );
};

export default LogoutUser;
