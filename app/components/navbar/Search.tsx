"use client";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full hover: shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm px-6 ">Search</div>
        <div className="hidden sm:block border-x-[1px] flex-1 text-center text-sm px-6 gap-3">
          Timeframe
        </div>
        <div className=" px-6 flex flex-row items-center gap-3">
          <div className="hidden sm:block ">Search</div>
          <div className="p-2 bg-blue-400 rounded-full">
            <BiSearch></BiSearch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
