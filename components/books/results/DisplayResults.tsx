import { BookData } from "@/interfaces/booksData";
import React, { useEffect } from "react";
import BookCard from "./BookCard";
import { useDispatch } from "react-redux";

type Props = { booksData: BookData[] };

export default function DisplayResults({ booksData }: Props) {
  const dispatch = useDispatch()
  const bookCardList = booksData.map((bookdata: BookData, i: number) => {
    bookdata.authors === undefined && console.log("bookdata map", bookdata, i)
    return <BookCard bookData={bookdata} dispatch={dispatch} key={i}/>
}
  
  );

  useEffect(() => {
    console.log("booksData", booksData);
  }, [booksData]);
  return booksData !== null ? (
    <div className="h-[85%] ">
      <div className="flex h-full flex-wrap justify-around items-center mx-6 overflow-y-scroll overflow-x-scroll">
        {bookCardList}
      </div>
    </div>
  ) : (
    <div className="row-span-6"></div>
  );
}
