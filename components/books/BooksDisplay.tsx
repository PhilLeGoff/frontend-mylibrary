import React from "react";
import { useSelector } from "react-redux";
import SearchForBooks from "./SearchForBooks";
import AddNewBook from "./AddNewBook";
import Modal from "./Modal";

type Props = {};

export default function BooksDisplay({}: Props) {
  const displayState = useSelector((state: any) => state.libraryDisplays);

  const displayModal = () => {
    if (
      displayState.modalDisplay.type === "book" &&
      displayState.modalDisplay.show === true
    )
      return <Modal />;
    else return null;
  };
  return (
    <div className="row-span-6 ">
      {displayState.booksDisplay === "searchForBook" ? (
        <SearchForBooks />
      ) : (
        <AddNewBook />
      )}
      {displayModal()}
    </div>
  );
}
