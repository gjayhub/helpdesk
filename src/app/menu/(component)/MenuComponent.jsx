"use client";
import React, { Suspense, useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import NavLinks from "@/components/NavLinks";
import { useCollapsed } from "@/lib/store/collapse";
import Nav from "@/components/Nav";
import Profile from "@/components/Profile";
import { Separator } from "@/components/ui/separator";

const MenuComponent = ({ profile, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={20}
        collapsedSize={4}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            isCollapsed ? "h-[52px]" : "px-2"
          )}
        >
          <Suspense fallback={<p>Loading</p>}>
            <Profile profile={profile} isCollapsed={isCollapsed} />
          </Suspense>
        </div>

        <Separator />
        <div>
          <Nav profile={profile} isCollapsed={isCollapsed} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MenuComponent;
