"use client";

import { Calender } from "@/components/Calender";
import { Filters } from "@/components/Filters";
import { Product } from "@/components/Product";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useProduct } from "@/hooks/useProduct";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const { categories, getCategories, setCategories } = useProduct();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (openDropdown) {
      getCategories();
    } else {
      setCategories([]);
    }
  }, [openDropdown]);

  return (
    <div className="p-8 max-md:p-4 max-sm:p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-[#22331D] text-3xl font-semibold max-sm:text-xl">
          Orders
        </h1>
        <div className="flex items-center gap-3 max-sm:flex-col-reverse">
          <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild>
              <div className="py-2 px-3 flex items-center justify-between w-52 bg-white rounded-lg cursor-pointer">
                Categories <ChevronDown color="gray" size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white w-52 h-68 p-2 rounded-lg mt-1 overflow-y-auto"
            >
              <DropdownMenuLabel className="font-semibold">
                Categories
              </DropdownMenuLabel>
              <DropdownMenuGroup className="mt-1">
                {categories.length === 0 ? (
                  <div className="mt-4 flex justify-center">
                    <Loader2 className="animate-spin" color="orange" />
                  </div>
                ) : (
                  categories.map((category, index) => {
                    return (
                      <div key={index}>
                        <DropdownMenuItem className="cursor-pointer">
                          {category.name}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </div>
                    );
                  })
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="orange" size="default" className="max-sm:w-full">
            Create Order
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <Calender />
      </div>
      <div className="mt-8">
        <Filters />
      </div>
      <div className="mt-8">
        <Product />
      </div>
    </div>
  );
};

export default OrdersPage;
