"use client";

import { Search } from "lucide-react";

export const Filters = () => {
  return (
    <>
      <div>
        <div className="border-b border-gray-400">
          <div className="flex items-center gap-2">
            <div className="py-2 px-5 border-b-4 border-orange-500 cursor-pointer">
              <span className="text-orange-500 font-semibold">All</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div className="py-2 px-4 w-72 flex items-center gap-3 bg-white shadow-sm rounded-md max-sm:w-full">
            <Search color="gray" size={18} />
            <input
              type="text"
              placeholder="Search product..."
              className="outline-none text-gray-600 w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
