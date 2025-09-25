"use client";

import Image from "next/image";
import imagePlaceholder from "@/assets/images/imagePlaceholder.png";
import { useUsers } from "@/context/users.context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { itemPerPage } from "@/utils/itemsPerPage";
import { ProductPagination } from "./ProductPagination";

export const Users = () => {
  const {
    users,
    getAllUser,
    limit,
    setLimit,
    totalUsers,
    skip,
    setSkip,
    debouncedSearch,
  } = useUsers();
  const [loading, setLoading] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllUser().finally(() => {
      setLoading(false);
    });
  }, [limit, skip, debouncedSearch]);

  return (
    <>
      <div className="bg-white rounded-sm p-2">
        <Table className="border-b border-gray-400">
          <TableHeader className="text-sm bg-gray-100 overflow-hidden border-none">
            <TableRow className="text-[12px]">
              <TableHead className="rounded-tl-2xl rounded-bl-2xl pl-5">
                FIRSTNAME
              </TableHead>
              <TableHead>LASTNAME</TableHead>
              <TableHead className="text-center">USERNAME</TableHead>
              <TableHead className="text-center">EMAIL</TableHead>
              <TableHead className="text-center">AGE</TableHead>
              <TableHead className="text-center">ADDRESS</TableHead>
              <TableHead>ROLE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                  </TableRow>
                ))
              : users.map((user, index) => {
                  return (
                    <TableRow key={index} className="font-medium">
                      <TableCell className="flex items-center gap-2 pl-5">
                        <span className="border border-gray-300 rounded-md p-1">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt="image"
                              className="rounded-sm"
                              width={35}
                              height={30}
                              unoptimized
                            />
                          ) : (
                            <Image
                              src={imagePlaceholder}
                              alt="image"
                              className="rounded-sm"
                              width={35}
                              height={30}
                              unoptimized
                            />
                          )}
                        </span>
                        {user.firstName}
                      </TableCell>
                      <TableCell className="capitalize">
                        {user.lastName}
                      </TableCell>
                      <TableCell className="text-gray-500 text-center">
                        {user.username}
                      </TableCell>
                      <TableCell className="text-gray-500 text-center">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-gray-500 text-center">
                        {user.age}
                      </TableCell>
                      <TableCell className="text-gray-500 text-center">
                        {user.address.address}, {user.address.city}
                      </TableCell>
                      <TableCell className="text-gray-500 ">
                        {user.role}
                      </TableCell>
                    </TableRow>
                  );
                })}
            {}
          </TableBody>
        </Table>
        <div className="mt-7 mb-3 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:items-start">
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-sm">Items per page</p>
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
              <DropdownMenuTrigger asChild>
                <div className="px-2 py-1.5 flex items-center justify-between w-16 bg-white rounded-lg cursor-pointer border border-gray-400">
                  {limit}{" "}
                  <ChevronDown
                    color="gray"
                    size={20}
                    className={`transition-transform duration-200 ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white w-20 p-2 rounded-lg mt-1 overflow-y-auto shadow-lg"
              >
                <DropdownMenuLabel className="font-semibold">
                  Items
                </DropdownMenuLabel>
                <DropdownMenuGroup className="mt-1">
                  {itemPerPage.map((item, index) => (
                    <div key={index}>
                      <DropdownMenuItem
                        onClick={() => setLimit(item.value)}
                        className="cursor-pointer"
                      >
                        {item.value}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="max-md:mx-auto">
            <ProductPagination
              page={totalUsers}
              limit={limit}
              skip={skip}
              setSkip={setSkip}
            />
          </div>
        </div>
      </div>
    </>
  );
};
