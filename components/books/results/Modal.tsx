import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { setShowModal } from "@/reducers/display";
import AddBookModalFooter from "./AddBookModalFooter";
import BookSearchedModalFooter from "./BookSearchedModalFooter";
import LoanModal from "@/components/loans/LoanModal";

export default function Modal() {
  const [showLoanModal, setShowLoanModal] = useState(false);
  const dispatch = useDispatch();

  const booksDisplay = useSelector(
    (state: any) => state.libraryDisplays.booksDisplay
  );
  const bookData = useSelector((state: any) => state.bookData.bookData);

  const handleModalClose = () => {
    dispatch(setShowModal(false));
  };

  return (
    <div className="flex absolute inset-0 z-10 justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm backdrop-brightness-50">
      <div className="grid grid-rows-10 px-4 w-[700px] h-[600px] bg-bone-white border-2 border-dark-grey text-dark-grey">
        <div className="row-span-1 flex justify-between items-center">
          <IoCloseOutline
            size="30px"
            className="text-dark-grey hover:text-yellow-300"
            onClick={handleModalClose}
          />
          <h1 className="text-xl">Book details</h1>
          {booksDisplay === "searchForBooks" ? (
            <div className="w-[30px] h-full flex items-center justify-center">
              N°{bookData.bookNumber}
            </div>
          ): <div></div>}
        </div>
        <div className="row-span-4 flex items-center justify-center">
          <img
            alt="book picture"
            height="240"
            src={bookData.picture}
            className="max-w-[300px] min-h-full mx-4 border border-dark-grey"
          />
          <ul className="h-full overflow-y-scroll w-full no-scrollbar flex flex-col items-center justify-around">
            <li className="w-full">Title: {bookData.title}</li>
            <li className="w-full">Author(s): {bookData.authors.join(", ")}</li>
            <li className="w-full">Genres(s): {bookData.genres.join(", ")}</li>
            <li className="w-full">Publisher: {bookData.publisher}</li>
            <li className="w-full">Published date: {bookData.publishedDate}</li>
            <li className="w-full">Language: {bookData.language}</li>
            <li className="w-full">ISBN number: {bookData.isbn}</li>
          </ul>
        </div>
        <p className="row-span-3 p-2 m-2 border overflow-y-scroll no-scrollbar border-dark-grey flex justify-start items-start">
          Description: {bookData.description}
        </p>
        {booksDisplay === "addNewBook" ? (
          <AddBookModalFooter bookData={bookData} />
        ) : (
          <BookSearchedModalFooter
            bookData={bookData}
            setShowLoanModal={setShowLoanModal}
          />
        )}
      </div>
      {showLoanModal && <LoanModal setShow={setShowLoanModal} />}
    </div>
  );
}
