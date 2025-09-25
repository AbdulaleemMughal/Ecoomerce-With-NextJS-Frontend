"use client";

import logo from "@/assets/images/logo.png";
import { useResponsiveness } from "@/hooks/useResponsiveness";
import { Menu, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Image from "next/image";
import { sidebarData } from "@/utils/sidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cart } from "./Cart";
import Badge from "@mui/material/Badge";
import { useCart } from "@/context/cart.context";

export const DashboardHeader = () => {
  const pathname = usePathname();
  const { mobileMode } = useResponsiveness();
  const { cartedProduct } = useCart();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<number>(1);

  useEffect(() => {
    const activePath = sidebarData.find((item) => item.path === pathname);
    setActiveNav(activePath?.id!);
  }, [pathname]);

  return (
    <>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <div
          className={`p-3 bg-white flex items-center ${mobileMode ? "justify-between" : "justify-end"
            }`}
        >
          {mobileMode && (
            <DrawerTrigger asChild>
              <span
                className="border border-gray-400 p-1 rounded-sm"
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                <Menu color="gray" size={20} className="cursor-pointer" />
              </span>
            </DrawerTrigger>
          )}
          <span
            className="p-2 bg-gray-200 rounded-md cursor-pointer hover:opacity-65"
            onClick={() => setOpenCart(true)}
          >
            <Badge badgeContent={cartedProduct.length} color="primary">
              <ShoppingCart size={19} />
            </Badge>
          </span>
        </div>
        <DrawerContent position="left">
          <DrawerHeader>
            <DrawerTitle>
              <div className={`px-1 flex items-center gap-3`}>
                <Image
                  src={logo}
                  alt="Logo"
                  className="rounded-md"
                  width={40}
                  height={40}
                />
                <h2 className="text-[#22331D] text-2xl font-semibold">
                  Bazaar
                </h2>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="mt-2">
            {sidebarData.map((item) => {
              const Icon = item.icon;
              return (
                <Link href={item.path} key={item.id}>
                  <div
                    onClick={() => setActiveNav(item.id)}
                    className={`mt-3 cursor-pointer ${activeNav === item.id
                      ? "border-l-4 border-orange-600"
                      : ""
                      } `}
                  >
                    <DrawerClose asChild>
                      <div className="mx-3 p-2 flex items-center gap-3 text-[#22331D]">
                        <Icon className="w-5 h-5" />
                        <p>{item.name}</p>
                      </div>
                    </DrawerClose>
                  </div>
                </Link>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
      <Cart open={openCart} setOpen={setOpenCart} />
    </>
  );
};
