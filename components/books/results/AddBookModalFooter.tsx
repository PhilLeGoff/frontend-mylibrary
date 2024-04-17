import addBookToLIbrary from "@/hooks/addBookToLibrary";
import { BookData } from "@/interfaces/booksData";
import { setShowModal } from "@/reducers/display";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = { bookData: BookData };

export default function AddBookModalFooter({ bookData }: Props) {
  const [copies, setCopies] = useState<number>(1);
  const dispatch = useDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setCopies(newValue);
    } else {
      // If the new value is NaN or less than 1, set copies to 1
      setCopies(1);
    }
  };

  const handleAddBook = async () => {
    const data = {
      title: bookData.title,
      authors: bookData.authors,
      genres: bookData.genres,
      isbn: bookData.isbn,
      picture: bookData.picture,
    };
    const fetchResults = await addBookToLIbrary(data);
    fetchResults !== "Error adding book to library" &&
      dispatch(setShowModal({ type: "book", show: false }));
    return fetchResults;
  };

  return (
    <div className="row-span-2 px-4 flex justify-between items-center">
      <div className="flex w-[200px]  h-full items-center">
        <p>Books to add:</p>
        <input
          type="number"
          className="w-[40px] ml-2 outline-none"
          value={copies}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div
        className="h-[60px] w-[150px] border-2 cursor-pointer border-dark-grey flex items-center justify-center "
        onClick={() => handleAddBook()}
      >
        ADD BOOK
      </div>
    </div>
  );
}
