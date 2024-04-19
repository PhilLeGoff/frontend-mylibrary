import deleteBookFromLibrary from "@/hooks/deleteBookFromLIbrary";
import { BookData } from "@/interfaces/booksData";
import React from "react";
import { setShowModal } from "@/reducers/display";
import { useDispatch } from "react-redux";
import deleteLoanFromDB from "@/hooks/deleteLoanFromDB";
import { setBookAvailable } from "@/reducers/bookDataStore";

type Props = {
  bookData: BookData;
  setShowLoanModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BookSearchedModalFooter({
  bookData,
  setShowLoanModal,
}: Props) {
  const dispatch = useDispatch();

  const handleDeleteBook = async () => {
    try {
      const bookDeleted = await deleteBookFromLibrary(bookData.bookId);
      if (bookDeleted !== "Error deleting book:") {
        dispatch(setShowModal({ type: "book", show: false }));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleReturnBook = async () => {
    try {
      const updatedBook = await deleteLoanFromDB(bookData.bookId);
      if (updatedBook.success) {
        dispatch(setBookAvailable());
      }
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <div className="row-span-2 px-4 flex justify-between items-center">
      {bookData.available ? (
        <div
          className="cursor-pointer border-2 border-dark-grey p-4 rounded-sm shadow-lg hover:shadow-xl"
          onClick={() => setShowLoanModal(true)}
        >
          LOAN BOOK
        </div>
      ) : (
        <div className="cursor-pointer border-2 border-dark-grey p-4 rounded-sm shadow-lg hover:shadow-xl" onClick={handleReturnBook}>
          RETURN BOOK
        </div>
      )}
      <div className="cursor-pointer border-2 border-dark-grey p-4 rounded-sm shadow-lg hover:shadow-xl" onClick={handleDeleteBook}>
        DELETE BOOK
      </div>
    </div>
  );
}