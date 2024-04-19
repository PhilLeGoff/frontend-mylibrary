import React, { useEffect } from "react";
import BookCard from "./BookCard";
import { useDispatch } from "react-redux";
import { BookData } from "@/interfaces/booksData";

type Props = { booksData: BookData[] | "No books found" };

export default function DisplayResults({ booksData }: Props) {
  const dispatch = useDispatch();

  // Log booksData when it changes
  useEffect(() => {
    console.log("booksData", booksData);
  }, [booksData]);

  // Render no books found message if applicable
  if (booksData === "No books found") {
    return (
      <div className="flex justify-center items-center h-[85%]">
        <p className="text-5xl pb-40 text-dark-grey w-[400px]">
          No books found
        </p>
      </div>
    );
  }

  // Render book cards if booksData is an array
  return (
    <div className="h-[85%] overflow-y-scroll">
      <div className="flex flex-wrap justify-around items-center mx-6 h-full">
        {booksData.map((bookData: BookData, index: number) => (
          <BookCard key={index} bookData={bookData} />
        ))}
      </div>
    </div>
  );
}
