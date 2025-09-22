"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { productType } from "@/types/productType";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/cart.context";

type CartProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const Cart = ({ open, setOpen }: CartProps) => {
  const { cartedProduct: cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="fixed right-0 top-0 h-screen w-full md:w-[400px] p-0 flex flex-col">
        {/* Header */}
        <DrawerHeader className="flex justify-between items-center border-b px-4 py-3">
          <DrawerTitle className="text-lg font-semibold">Your Cart</DrawerTitle>
          <DrawerClose asChild>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <X size={20} />
            </button>
          </DrawerClose>
        </DrawerHeader>

        {/* Cart Items */}
        <ScrollArea className="flex-1 px-4">
          {cartItems.length > 0 ? (
            <div className="space-y-4 py-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  {/* Thumbnail */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <DrawerDescription className="text-center py-10 text-gray-500">
              Your cart is empty 🛒
            </DrawerDescription>
          )}
        </ScrollArea>

        {/* Footer */}
        {cartItems.length > 0 && (
          <DrawerFooter className="border-t px-4 py-3">
            <div className="flex justify-between items-center font-semibold text-base">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-3">Checkout</Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
