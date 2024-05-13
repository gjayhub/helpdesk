import React, { Suspense } from "react";
import Nav from "@/components/Nav/Nav";
import { Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export const revalidate = 3600;
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const layout = ({ children }) => {
  return (
    <section>
      <div className="flex relative ">
        <Sheet className="bg-red">
          <SheetTrigger
            className="absolute z-10 md:hidden top-3 left-3"
            asChild
          >
            <Menu className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="w-fit p-0" side="left">
            <div className=" w-56">
              <Nav />
            </div>
          </SheetContent>
        </Sheet>
        <div className="max-md:hidden w-56">
          <Nav />
        </div>
        <div className="min-h-screen">
          <Separator orientation="vertical" />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};

export default layout;
