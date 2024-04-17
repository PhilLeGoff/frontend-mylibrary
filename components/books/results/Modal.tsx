import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { setShowModal } from "@/reducers/display";
import addBookToLIbrary from "@/hooks/addBookToLibrary";
import AddBookContent from "../BookContent";
import fetchGoogleBookData from "@/hooks/fetchGoogleBookData";
import { setBookData } from "@/reducers/bookDataStore";
import SearchForBooks from "../SearchForBooks";
import AddBookModalFooter from "./AddBookModalFooter";
import BookSearchedModalFooter from "./BookSearchedModalFooter";

type Props = {};

export default function Modal({}: Props) {
  const dispatch = useDispatch();

  const booksDisplay = useSelector(
    (state: any) => state.libraryDisplays.booksDisplay
  );
  const bookData = useSelector((state: any) => state.bookData.bookData);

  return (
    <div className="flex absolute inset-0 z-10 justify-center w-full bg-white bg-opacity-10 items-center h-full backdrop-blur-sm backdrop-brightness-50">
      <div className=" grid grid-rows-10 text-dark-grey px-4 w-[700px] h-[600px] bg-bone-white border-2 border-dark-grey">
        <div className="row-span-1  flex justify-between items-center">
          <IoCloseOutline
            size="30px"
            className="text-dark-grey hover:text-yellow-300"
            onClick={() => dispatch(setShowModal(false))}
          />
          <h1 className="text-xl text-dark-grey">Book details</h1>
          <div className="w-[30px] h-full flex items-center justify-center">{booksDisplay === "searchForBooks" && `N°${bookData.bookNumber}`}</div>
        </div>
        <div className="row-span-4 flex items-center justify-center ">
          <img
            alt="book picture"
            height="240"
            src={bookData.picture}
            className="row-span-4 max-x-full mx-4 "
          />
          <ul className="h-full overflow-y-scroll w-full no-scrollbar flex-col items-around justify-between">
            <li className="overflow-y-scroll w-full">
              Title: {bookData.title}
            </li>
            <li className="overflow-y-scroll w-full">
              Author(s):{" "}
              {bookData.authors.map((author: string, i: number) => {
                return i !== bookData.authors.length - 1
                  ? `${author}, `
                  : author;
              })}
            </li>
            <li className="overflow-y-scroll w-full">
              Genres(s): {bookData.genres.map((genre: string) => genre)}
            </li>
            <li className="overflow-y-scroll w-full">
              Publisher: {bookData.publisher}
            </li>
            <li className="overflow-y-scroll w-full">
              Published date: {bookData.publishedDate}
            </li>
            <li className="overflow-y-scroll w-full">
              Language: {bookData.language}
            </li>
            <li className="overflow-y-scroll w-full">
              ISBN number: {bookData.isbn}
            </li>
          </ul>
        </div>
        <p className="row-span-3 p-2 m-2 border overflow-y-scroll no-scrollbar border-dark-grey flex justify-start items-start">
          Description: {bookData.description}
        </p>
        {booksDisplay === "addNewBook" ? (
          <AddBookModalFooter bookData={bookData} />
        ) : (
          <BookSearchedModalFooter bookData={bookData} />
        )}
      </div>
    </div>
  );
}
