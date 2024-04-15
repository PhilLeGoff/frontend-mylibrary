import { BookData } from "@/interfaces/booksData";
import React from "react";
import { setShowModal } from "@/reducers/display";
import { setBookData } from "@/reducers/bookDataStore";

type Props = { bookData: BookData; dispatch: any };

export default function BookCard({ bookData, dispatch }: Props) {
  const displayAuthors = bookData.authors.map((author: string, i: number) => {
    return i < bookData.authors.length - 1 ? `${author}, ` : author;
  });

  const handleShowModal = async () => {
    await dispatch(setBookData({ bookData: bookData }));
    await dispatch(setShowModal({ type: "book", show: true }));
  };
  
  return (
    <div
      className="w-[250px] h-[300px] cursor-pointer m-2 border-2 border-dark-grey bg-bone-white"
      onClick={() => handleShowModal()}
    >
      <div className="flex h-[200px] justify-center w-full m-[5px]">
        <img
          alt="book picture"
          height="100"
          src={bookData.picture}
          className="row-span-4 max-x-full"
        />
      </div>
      <div className="row-span-2 h-[80px] my-[5px] flex flex-col justify-around start ml-2 overflow-y-scroll">
        <p className="text-dark-grey text-sm">Title: {bookData.title}</p>
        <p className="text-dark-grey text-sm">Author(s): {displayAuthors}</p>
      </div>
    </div>
  );
}
