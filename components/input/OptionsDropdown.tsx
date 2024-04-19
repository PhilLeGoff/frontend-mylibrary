import React from "react";

type Props = {
  options: string[];
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
};

export default function OptionsDropdown({ options, setSearchOption, setShowOptions }: Props) {
const handleOptionSelection = (option: string) => {
    setSearchOption(option)
    setShowOptions(false)
}

  return (
    <div className=" w-[150px] absolute -mt-0.5 border-x-2 border-y-[1px] border-dark-grey opacity-90 flex flex-col bg-bone-white rounded-b-sm z-50">
      {options.map((option: string, i: number) => {
        return (
          <section key={i}
            className="h-[30px] w-full cursor-pointer border-y-[1px] border-dark-grey text-sm pl-[10px] pt-[3px] text-dark-grey"
            onClick={() => handleOptionSelection(option)}
          >
            {option}
          </section>
        );
      })}
    </div>
  );
}
