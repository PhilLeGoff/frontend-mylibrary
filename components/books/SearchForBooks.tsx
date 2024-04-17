import React, { useState } from "react";
import SearchOptions from "./input/SearchOptions";
import search_options from "@/public/search_options.json";
import Input from "./input/Input";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setBooksDisplay } from "@/reducers/display";
import fetchBooksFromDB from "@/hooks/fetchBooksFromDB";
import { BookData } from "@/interfaces/booksData";
import DisplayResults from "./results/DisplayResults";

type Props = {};

export default function SearchForBooks({}: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<BookData[]>([]);

  const dispatch = useDispatch();

  const handleDisplayChange = (displayName: string) => {
    dispatch(setBooksDisplay({ booksDisplay: displayName }));
  };

  const findBooksInDB = async () => {
    const booksFound = await fetchBooksFromDB({
      searchOption: searchOption,
      searchInput: inputValue,
    });

    setFetchedData(booksFound);
  };

  return (
    <div className="bg-bone h-full w-full">
      <div className="w-full h-[15%] flex justify-between items-center px-24">
        <div className="w-[200px]"></div>
        <div className="flex justify-center items-center">
          <SearchOptions
            options={search_options.myLibrary_options}
            searchType="Search by:"
            setSearchOption={setSearchOption}
            searchOption={searchOption}
          />
          <Input
            type="text"
            value={inputValue}
            setState={setInputValue}
            placeholder="Search for a book in myLibrary"
          />
          <div
            className="w-[45px] h-[45px] cursor-pointer border-2 border-dark-grey bg-bone-white flex items-center justify-center"
            onClick={() => findBooksInDB()}
          >
            <IoSearch size="25px" className="text-dark-grey" />
          </div>
        </div>
        <div
          className="w-[220px] flex justify-center items-center text-center bg-bone-white rounded-md border-2 border-dark-grey hover:border-[3px] cursor-pointer text-dark-grey text-2xl "
          onClick={() => handleDisplayChange("addNewBook")}
        >
          Add a book to myLibrary
        </div>
      </div>
      <DisplayResults booksData={fetchedData} />
    </div>
  );
}
