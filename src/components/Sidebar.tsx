"use client";

import logo from "@/assets/images/logo.png";
import { useResponsiveness } from "@/hooks/useResponsiveness";
import { sidebarData } from "@/utils/sidebarData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  const { tabletMode } = useResponsiveness();
  const [activeNav, setActiveNav] = useState<number>(1);

  useEffect(() => {
    const activePath = sidebarData.find((item) => item.path === pathname);
    setActiveNav(activePath?.id!);
  }, [pathname]);

  return (
    <>
      <div className="">
        <div
          className={`py-4 flex items-center gap-3 ${
            tabletMode ? "px-3" : "px-6"
          }`}
        >
          <Image
            src={logo}
            alt="Logo"
            className="rounded-md"
            width={40}
            height={40}
          />
          {!tabletMode && (
            <h2 className="text-[#EFEDE7] text-2xl font-semibold">Bazaar</h2>
          )}
        </div>
        <div className="mt-6">
          {sidebarData.map((item) => {
            const Icon = item.icon;
            return (
              <Link href={item.path} key={item.id}>
                <div
                  onClick={() => setActiveNav(item.id)}
                  className={`mt-3 cursor-pointer ${
                    activeNav === item.id ? "border-l-4 border-orange-600" : ""
                  } `}
                >
                  <div className="mx-3 p-2 flex items-center gap-3 text-white">
                    <Icon className="w-5 h-5" />
                    {!tabletMode && <p>{item.name}</p>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
