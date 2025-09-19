import { Calendar1 } from "lucide-react";

export const Calender = () => {
  return (
    <>
      <div className="bg-white shadow-sm rounded-3xl">
        <div className="grid grid-cols-12">
          <div className="col-span-2 pb-7 pt-10 border-r border-gray-300 max-lg:col-span-3 max-lg:border-b max-md:col-span-4 max-sm:col-span-6">
            <div className="flex justify-center gap-2 max-sm:justify-start max-sm:px-5">
              <Calendar1 />
              <h3 className="font-bold">Todays</h3>
            </div>
          </div>
          <div className="col-span-2 py-7 px-5 border-r border-gray-300  max-lg:col-span-3 max-lg:border-b max-md:col-span-4 max-sm:col-span-6">
            <label className="font-semibold text-gray-400 text-[12px]">
              Total orders
            </label>
            <h4 className="text-[20px] text-[#22331D] font-bold">48</h4>
          </div>
          <div className="col-span-2 py-7 px-5 border-r border-gray-300  max-lg:col-span-3 max-lg:border-b max-md:col-span-4 max-sm:col-span-6">
            <label className="font-semibold text-gray-400 text-[12px]">
              Ordered items over time
            </label>
            <h4 className="text-[20px] text-[#22331D] font-bold">493</h4>
          </div>
          <div className="col-span-2 py-7 px-5 border-r border-gray-300  max-lg:col-span-3 max-lg:border-b max-md:col-span-4 max-sm:col-span-6">
            <label className="font-semibold text-gray-400 text-[12px]">
              Returns
            </label>
            <h4 className="text-[20px] text-[#22331D] font-bold">6</h4>
          </div>
          <div className="col-span-2 py-7 px-5 border-r border-gray-300  max-lg:col-span-3 max-lg:border-b max-md:col-span-4 max-sm:col-span-6">
            <label className="font-semibold text-gray-400 text-[12px]">
              Fulfilled orders over time
            </label>
            <h4 className="text-[20px] text-[#22331D] font-bold">359</h4>
          </div>
          <div className="col-span-2 py-7 px-5  max-lg:col-span-3 max-lg:border-b max-md:col-span-4 max-sm:col-span-6">
            <label className="font-semibold text-gray-400 text-[12px]">
              Delivered orders over time
            </label>
            <h4 className="text-[20px] text-[#22331D] font-bold">48</h4>
          </div>
        </div>
      </div>
    </>
  );
};
