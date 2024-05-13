"use client";
import { deleteUser, editUser } from "./action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import SubmitBtn from "./SubmitBtn";
import { useToast } from "@/components/ui/use-toast";
import { useFormState } from "react-dom";
import DeleteBtn from "./DeleteBtn";

const initialState = {
  message: "",
  success: false,
};
const ActionOptions = ({ user }) => {
  const [state, formAction] = useFormState(
    editUser.bind(null, user.id),
    initialState
  );
  const deleteAction = deleteUser.bind(null, user.id);

  const { pending } = useFormStatus();
  const [email, setEmail] = useState();
  const [fullname, setFullname] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const isDisabled = !email?.trim() && !fullname?.trim() && !password?.trim();

  const ref = useRef();
  const { toast } = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  useEffect(() => {
    setMessage(state?.message);
    if (state?.success) {
      toast({
        variant: "success",
        description: "Profile is created successfully!",
      });
      setEmail(null);
      setFullname(null);
      setPassword(null);
      ref.current?.reset();
    }
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [toast, state]);

  return (
    <div className="flex justify-center items-center gap-2">
      <form action={deleteAction}>
        <button className="text-red-600" type="submit">
          Delete
        </button>
      </form>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-green-600">Edit</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form
              ref={ref}
              action={(formData) => {
                formAction(formData);
              }}
            >
              <div className="grid grid-cols-4 items-center gap-4 pb-5">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="name"
                  name="email"
                  placeholder={user.email}
                  onChange={handleEmailChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 pb-5">
                <Label htmlFor="username" className="text-right">
                  Full name
                </Label>
                <Input
                  id="username"
                  name="fullname"
                  placeholder={user.full_name}
                  onChange={handleFullnameChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Password
                </Label>
                <Input
                  id="username"
                  name="password"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {message && (
                <p className="text-center text-xs text-red-400 pt-5">
                  {message}
                </p>
              )}
              <DialogFooter className="pt-8">
                <SubmitBtn isDisabled={isDisabled} />
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ActionOptions;
