"use client";

import { Users } from "@/components/Users";
import { useUsers } from "@/context/users.context";
import { Search } from "lucide-react";

const CustomerPage = () => {
  const { search, setSearch } = useUsers();

  return (
    <div className="p-8 max-md:p-4 max-sm:p-3">
      <h1 className="text-[#22331D] text-3xl font-semibold max-sm:text-xl">
        Users
      </h1>
      <div className="mt-3 border-b border-gray-400">
        <div className="flex items-center gap-2">
          <div className="py-2 px-5 border-b-4 border-orange-500 cursor-pointer">
            <span className="text-orange-500 font-semibold">All</span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center">
        <div className="py-2 px-4 w-80 flex items-center gap-3 bg-white shadow-sm rounded-md max-sm:w-full">
          <Search color="gray" size={18} />
          <input
            type="text"
            placeholder="Search user..."
            className="outline-none text-gray-600 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-8">
        <Users />
      </div>
    </div>
  );
};

export default CustomerPage;
