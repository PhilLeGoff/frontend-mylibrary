import { BookData } from "@/interfaces/booksData";
import React from "react";
import { setShowModal } from "@/reducers/display";
import { setBookData } from "@/reducers/bookDataStore";
import { useSelector, useDispatch } from "react-redux";
import fetchGoogleBookData from "@/hooks/fetchGoogleBookData";

type Props = { bookData: BookData };

export default function BookCard({ bookData }: Props) {
  const dispatch = useDispatch();
  const booksDisplay = useSelector(
    (state: any) => state.libraryDisplays.booksDisplay
  );
  const checkBookData = useSelector((state: any) => state.bookData.bookData);
  const displayAuthors = bookData.authors.join(", ");

  const handleShowModal = async () => {
    if (booksDisplay === "searchForBooks") {
      try {
        const fullBookData = await fetchGoogleBookData({
          searchOption: "Title",
          searchInput: bookData.title,
        });
        const updatedBookData =
          typeof fullBookData[0] === "object" ? fullBookData[0] : {};
        await dispatch(
          setBookData({
            bookData: {
              ...updatedBookData,
              title: bookData.title,
              picture: bookData.picture,
              bookNumber: bookData.bookNumber,
              bookId: bookData.bookId,
              available: bookData.available,
            },
          })
        );
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    } else {
      await dispatch(setBookData({ bookData }));
    }
    await dispatch(setShowModal({ type: "book", show: true }));
  };

  return (
    <div
      className="shadow-lg hover:shadow-2xl w-[250px] h-[300px] cursor-pointer m-2 pt-2 border-2 border-dark-grey bg-bone-white"
      onClick={handleShowModal}
    >
      <div className="flex h-[200px] justify-center">
        <img
          alt="book picture"
          height="100"
          src={bookData.picture}
          className="row-span-4 max-x-full"
        />
      </div>
      <div className="h-[80px] my-[5px] flex flex-col justify-around start ml-2">
        <p className="h-[49%] text-dark-grey text-sm overflow-y-scroll no-scrollbar">
          Title: {bookData.title}
        </p>
        <p className="h-[49%] text-dark-grey text-sm flex flex-wrap overflow-y-scroll no-scrollbar">
          Author(s): {displayAuthors}
        </p>
      </div>
    </div>
  );
}
