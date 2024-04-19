import React from "react";
import { GoTriangleUp } from "react-icons/go";
import { useState } from "react";
import OptionsDropdown from "./OptionsDropdown";
import { useEffect } from "react";

type Props = {
  options: string[];
  searchType: string;
  setSearchOption: React.Dispatch<React.SetStateAction<any>>;
  searchOption: string;
};

export default function SearchOptions({
  searchType,
  options,
  setSearchOption,
  searchOption,
}: Props) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <div>
      <div
        className={`flex flex-col justify-center items-center rounded-sm cursor-pointer h-[45px] w-[150px] bg-bone-white border-2 border-dark-grey `}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div className="p-1 relative flex justify-around items-center rounded-sm group outline-none h-full w-full text-dark-grey text-sm ">
          <p className="w-[100px] h-[30px] flex justify-start align-center overflow-x-scroll no-scrollbar p-1">
            {searchOption !== "" ? searchOption : searchType}
          </p>

          <GoTriangleUp
            size="30px"
            className={`${
              showOptions ? "rotate-180" : "rotate-0"
            } transition-all  text-dark-grey`}
          />
        </div>
      </div>
      {showOptions && (
        <OptionsDropdown
          setSearchOption={setSearchOption}
          options={options}
          setShowOptions={setShowOptions}
        />
      )}
    </div>
  );
}
