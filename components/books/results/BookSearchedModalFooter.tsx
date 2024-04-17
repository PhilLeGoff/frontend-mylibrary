import deleteBookFromLibrary from "@/hooks/deleteBookFromLIbrary";
import { BookData } from "@/interfaces/booksData";
import React from "react";
import { setShowModal } from "@/reducers/display";
import { useDispatch } from "react-redux";

type Props = { bookData: BookData };

export default function BookSearchedModalFooter({ bookData }: Props) {
  const dispatch = useDispatch();

  const handleDeleteBook = async () => {
    const bookDeleted = await deleteBookFromLibrary(bookData.bookId);
    bookDeleted !== "Error deleting book:" &&
      dispatch(setShowModal({ type: "book", show: false }));
  };
  return (
    <div className="row-span-2 px-4 flex justify-between items-center">
      <div className="flex w-[200px]  h-full items-center">
        <p>Books available: ?</p>
        {/* <input
          type="number"
          className="w-[40px] ml-2 outline-none"
          value={copies}
          onChange={(e) => handleInputChange(e)}
        /> */}
      </div>
      <div className="w-[320px] flex justify-between">
        <div
          className="h-[60px] w-[150px] border-2 cursor-pointer border-dark-grey flex items-center justify-center "
          onClick={() => null}
        >
          LOAN BOOK
        </div>
        <div
          className="h-[60px] w-[150px] border-2 cursor-pointer border-dark-grey flex items-center justify-center "
          onClick={() => handleDeleteBook()}
        >
          DELETE BOOK
        </div>
      </div>
    </div>
  );
}
