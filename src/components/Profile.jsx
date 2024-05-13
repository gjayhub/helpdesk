import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AccountCard from "./AccountCard";
import PasswordCard from "./PasswordCard";
import { getProfile } from "@/lib/action";

const Profile = async ({ profile }) => {
  return (
    <Popover>
      <PopoverTrigger className={cn("flex gap-2 items-center ")}>
        <Avatar>
          <AvatarImage alt="Namae" />
          <AvatarFallback>
            {profile?.full_name
              .split(" ")
              .map((chunk) => chunk[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p>{profile?.full_name}</p>
      </PopoverTrigger>
      <PopoverContent>
        <AccountCard profile={profile} />

        <PasswordCard />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
