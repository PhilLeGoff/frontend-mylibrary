"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { setDisplay } from "@/reducers/display";

type Props = {};

export default function Header() {
  const dispatch = useDispatch();
  const handleDisplayChange = (displayName: string) => {
    dispatch(setDisplay({ display: displayName }));
  };

  return (
    <div className="bg-dark-grey row-span-1 flex justify-between items-center pb-3 px-28 border-b-2 border-black">
      <h1 className="text-5xl text-bone-white">myLibrary</h1>
      <ul className="flex text-bone-white w-[400px] justify-between ">
        <li
          className="text-3xl hover:text-yellow-400 hover:cursor-pointer"
          onClick={() => handleDisplayChange("books")}
        >
          Books
        </li>

        <li
          className="text-3xl hover:text-yellow-400 hover:cursor-pointer"
          onClick={() => handleDisplayChange("clients")}
        >
          Clients
        </li>
      </ul>
    </div>
  );
}
