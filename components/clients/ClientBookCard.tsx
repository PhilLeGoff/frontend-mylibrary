import { BookData } from "@/interfaces/booksData";
import React from "react";

type Props = { bookData: BookData };

export default function ClientBookCard({ bookData }: Props) {
  const displayAuthors = bookData.authors.map((author: string, i: number) => {
    return i < bookData.authors.length - 1 ? `${author}, ` : author;
  });

  return (
    <div
      className="min-w-[200px] h-[250px] cursor-pointer m-2 border-2 border-dark-grey bg-bone-white"
      //   onClick={() => handleShowModal()}
    >
      <div className="flex h-[150px] justify-center w-full m-[5px]">
        <img
          alt="book picture"
          height="70"
          src={bookData.picture}
          className="row-span-4 "
        />
      </div>
      <div className="row-span-2 h-[90px] my-[5px] flex flex-col justify-around start ml-2 overflow-y-scroll">
        <p className="text-dark-grey text-sm">Title: {bookData.title}</p>
        <p className="text-dark-grey text-sm">Author(s): {displayAuthors}</p>
      </div>
    </div>
  );
}
