import { BookData } from "@/interfaces/booksData";
import React, { useEffect } from "react";
import BookCard from "./BookCard";
import { useDispatch } from "react-redux";

type Props = { booksData: BookData[] | "No books found" };

export default function DisplayResults({ booksData }: Props) {
  const dispatch = useDispatch();

  // BookCardList is undefined if no search was made and null if no books were found
  const bookCardList =
    booksData[0] !== "No books found"
      ? booksData !== "No books found" &&
        booksData.map((bookdata: BookData, i: number) => {
          bookdata.authors === undefined &&
            console.log("bookdata map", bookdata, i);
          return <BookCard bookData={bookdata} dispatch={dispatch} key={i} />;
        })
      : null;

  useEffect(() => {
    console.log("booksData", booksData);
  }, [booksData]);
  return booksData.length !== 0 ? (
    <div className="h-[85%] ">
      <div className="flex h-full flex-wrap justify-around items-center mx-6 overflow-y-scroll overflow-x-scroll">
        {bookCardList !== null ? (
          bookCardList
        ) : (
          <p className="text-5xl pb-40 text-dark-grey w-[400px]">
            No books found
          </p>
        )}
      </div>
    </div>
  ) : (
    null
  );
}
