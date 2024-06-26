import React, { useState, useEffect } from "react";
import SearchOptions from "../input/SearchOptions";
import searchOptions from "@/public/search_options.json";
import Input from "../input/Input";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setBooksDisplay } from "@/reducers/display";
import fetchGoogleBookData from "@/hooks/fetchGoogleBookData";
import { BookData } from "@/interfaces/booksData";
import DisplayResults from "./results/DisplayResults";

export default function AddNewBook() {
  const [inputValue, setInputValue] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [fetchedData, setFetchedData] = useState<BookData[] | "No books found">([]);
  const dispatch = useDispatch();

  const handleDisplayChange = (displayName: string) => {
    dispatch(setBooksDisplay({ booksDisplay: displayName }));
  };

  const handleDataFetching = async () => {
    if (inputValue) {
      const filteredData = await fetchGoogleBookData({
        searchOption,
        searchInput: inputValue,
      });
      setFetchedData(filteredData);
    }
  };

  useEffect(() => {
    if (inputValue) {
      const timer = setTimeout(async () => {
        const booksFound = await fetchGoogleBookData({
          searchOption: searchOption,
          searchInput: inputValue,
        });
        console.log("fetched data", fetchedData);
        setFetchedData(booksFound);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [inputValue]);


  useEffect(() => {
    console.log("fetchedData", fetchedData);
  }, [fetchedData]);

  return (
    <div className="bg-bone h-full w-full">
      <div className="flex justify-between items-center px-24 h-[15%]">
        <div className="w-[200px]"></div>
        <div className="flex items-center">
          <SearchOptions
            options={searchOptions.google_books_options}
            searchType="Search by:"
            setSearchOption={setSearchOption}
            searchOption={searchOption}
          />
          <Input
            type="text"
            value={inputValue}
            setState={setInputValue}
            placeholder="Search for a book in Google Books"
          />
          <div
            className="w-[45px] h-[45px] cursor-pointer border-2 border-dark-grey bg-bone-white flex items-center justify-center"
            onClick={handleDataFetching}
          >
            <IoSearch size="25px" className="text-dark-grey" />
          </div>
        </div>
        <div
          className="w-[220px] h-[45px] text-md flex justify-center items-center text-center bg-bone-white rounded-md border-2 border-dark-grey hover:border-[3px] cursor-pointer text-dark-grey"
          onClick={() => handleDisplayChange("searchForBooks")}
        >
          Search in myLibrary
        </div>
      </div>
      <DisplayResults booksData={fetchedData} />
    </div>
  );
}
