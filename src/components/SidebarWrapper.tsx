"use client";

import { useResponsiveness } from "@/hooks/useResponsiveness";
import { Sidebar } from "./Sidebar";

export const SidebarWrapper = () => {
  const { laptopMode, tabletMode, mobileMode } = useResponsiveness();

  return (
    <>
      <aside
        className={`h-screen bg-[#22331D] ${
          mobileMode
            ? "hidden"
            : tabletMode
            ? "w-fit"
            : laptopMode
            ? "w-[200px]"
            : "w-[300px]"
        }`}
      >
        <Sidebar />
      </aside>
    </>
  );
};
