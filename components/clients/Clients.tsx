import React, { useEffect, useState } from "react";
import SearchOptions from "../input/SearchOptions";
import search_options from "@/public/search_options.json";

import Input from "../input/Input";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setShowAddModal } from "@/reducers/clientsDataStore";
import { ClientData } from "@/interfaces/clientData";
import AddClientModal from "./AddClientModal";
import fetchClientsFromDB from "@/hooks/fetchClientsFromDB";
import DisplayFoundClients from "./DisplayFoundClients";
import ClientDetailsModal from "./ClientDetailsModal";

type Props = {};

export default function ClientSearches({}: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<
    ClientData[] | "No clients found"
  >([]);
  const dispatch = useDispatch();
  const modalsDisplay = useSelector(
    (state: any) => state.clientData.clientModalsDisplay
  );

  const handleFindClientsInDB = async () => {
    const clientsFound = await fetchClientsFromDB({
      searchOption: searchOption,
      searchInput: inputValue,
    });
    setFetchedData(clientsFound);
    console.log("clientsFound", clientsFound);
  };

  useEffect(() => {
    if (inputValue) {
      const timer = setTimeout(async () => {
        const booksFound = await fetchClientsFromDB({
          searchOption: searchOption,
          searchInput: inputValue,
        });
        console.log("fetched data", fetchedData);
        setFetchedData(booksFound);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [inputValue]);

  return (
    <div className="bg-bone row-span-6 ">
      <div className="bg-bone h-full w-full">
        <div className="w-full h-[15%] flex justify-between items-center px-24">
          <div className="w-[200px]"></div>
          <div className="flex justify-center items-center">
            <SearchOptions
              options={search_options.Client_search_options}
              searchType="Search by:"
              setSearchOption={setSearchOption}
              searchOption={searchOption}
            />
            <Input
              type="text"
              value={inputValue}
              setState={setInputValue}
              placeholder="Search for a client in myLibrary"
            />
            <div
              className="w-[45px] h-[45px] cursor-pointer border-2 border-dark-grey bg-bone-white flex items-center justify-center"
              onClick={() => handleFindClientsInDB()}
            >
              <IoSearch size="25px" className="text-dark-grey" />
            </div>
          </div>
          <div
            className="p-4 h-[45px] text-md flex justify-center items-center text-center bg-bone-white rounded-md border-2 border-dark-grey hover:border-[3px] cursor-pointer text-dark-grey "
            onClick={() => dispatch(setShowAddModal())}
          >
            Add a client
          </div>
        </div>
        <DisplayFoundClients clientData={fetchedData} />
      </div>
      {modalsDisplay.showAddModal && <AddClientModal />}
      {modalsDisplay.showClientDetails && <ClientDetailsModal />}
    </div>
  );
}
