import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { setShowModal } from "@/reducers/display";
import addBookToLIbrary from "@/hooks/addBookToLibrary";

type Props = {};

export default function BookContent({}: Props) {
  const [copies, setCopies] = useState<number>(1)
  const dispatch = useDispatch();

  const bookData = useSelector((state: any) => state.bookData.bookData);

  useEffect(() => {
    console.log("bookData", bookData);
  }, []);

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
    return fetchResults;
  };
  return (
    <div className=" grid grid-rows-10 text-dark-grey px-4 w-[700px] h-[600px] bg-bone-white border-2 border-dark-grey">
      <div className="row-span-1  flex justify-between items-center">
        <IoCloseOutline
          size="30px"
          className="text-dark-grey hover:text-yellow-300"
          onClick={() => dispatch(setShowModal(false))}
        />
        <h1 className="text-xl text-dark-grey">Book details</h1>
        <div className="w-[30px] h-full"></div>
      </div>
      <div className="row-span-4 flex items-center justify-center ">
        <img
          alt="book picture"
          height="240"
          src={bookData.picture}
          className="row-span-4 max-x-full mx-4 "
        />
        <ul className="overflow-y-scroll w-full no-scrollbar flex-col items-around justify-between">
          <li className="overflow-y-scroll w-full">Title: {bookData.title}</li>
          <li className="overflow-y-scroll w-full">
            Author(s):{" "}
            {bookData.authors.map((author: string, i: number) => {
              return i !== bookData.authors.length - 1 ? `${author}, ` : author;
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
    </div>
  );
}
