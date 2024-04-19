import { BookData } from "@/interfaces/booksData";
import { setShowClientDetails } from "@/reducers/clientsDataStore";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ClientBookCard from "./ClientBookCard";

type Props = {};

export default function ClientDetailsModal({}: Props) {
  const dispatch = useDispatch();
  const clientDetails = useSelector(
    (state: any) => state.clientData.clientData
  );

  const displayBookLoaned = clientDetails.booksLoaned.map(
    (book: BookData, i: number) => {
      return <ClientBookCard bookData={book} key={i} />;
    }
  );
  return (
    <div className="flex absolute inset-0 z-10 justify-center w-full bg-white bg-opacity-10 items-center h-full backdrop-blur-sm backdrop-brightness-50">
      <div className=" grid grid-rows-10 text-dark-grey px-4 w-[700px] h-[600px] bg-bone-white border-2 border-dark-grey">
        <div className="row-span-1 flex justify-between items-center">
          <IoCloseOutline
            size="30px"
            className="text-dark-grey hover:text-yellow-300"
            onClick={() => dispatch(setShowClientDetails())}
          />
          <h1 className="text-xl text-dark-grey">Client details</h1>
          <div className="w-[30px] h-full flex items-center justify-center"></div>
        </div>
        <div className="row-span-3 w-full flex justify-center items-center">
          <div className="h-full  flex flex-col justify-around item-center">
            <p className="text-md">Client name: {clientDetails.fullName}</p>
            <p className="text-md">Phone number: {clientDetails.phoneNumber}</p>
          </div>
        </div>
        <h2 className="row-span-1 text-xl flex justify-center items-center">
          Books loaned
        </h2>
        <div className="row-span-5 w-[650px] h-full ">
          <div className="overflow-x-scroll flex">{displayBookLoaned}</div>
        </div>
      </div>
    </div>
  );
}
