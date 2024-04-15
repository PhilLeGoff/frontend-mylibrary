import React, { useEffect } from "react";

type Props = {
  setState: React.Dispatch<React.SetStateAction<any>>;
  type: string;
  value: string;
  placeholder: string;
};

export default function Input({ setState, type, value, placeholder }: Props) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setState(newValue);
  };
  return (
    <div
      className={`rounded-sm h-[45px] w-[250px] -m-0.5 flex justify-center items-center  bg-bone-white border-2 border-dark-grey`}
    >
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="text-sm placeholder:text-sm placeholder:text-dark-grey mx-2  rounded-b-sm group bg-transparent outline-none h-[44px] w-[250px] text-dark-grey "
      />
    </div>
  );
}
