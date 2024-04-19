import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Input from "./input/Input";
import ClientsDropdown from "./input/ClientsDropdown";
import fetchClientsFromDB from "@/hooks/fetchClientsFromDB";
import { ClientData } from "@/interfaces/clientData";
import { useDispatch, useSelector } from "react-redux";
import addLoanToDB from "@/hooks/addLoanToDB";
import { setBookAvailable } from "@/reducers/bookDataStore";

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>> };

export default function LoanModal({ setShow }: Props) {
  const dispatch = useDispatch();
  const bookData = useSelector((state: any) => state.bookData.bookData);
  const [clientName, setClientName] = useState<string>("");
  const [clientsFound, setClientsFound] = useState<string[]>([]);
  const [showClients, setShowClients] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetchClientsFromDB({
        searchOption: "Name",
        searchInput: clientName,
      });

      const found =
        response === "No clients found"
          ? ["No clients found"]
          : response.map((client: any) => client.fullName);
      setClientsFound(found);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    clientName === "" && setShowClients(false);
    if (clientName.trim() !== "") {
      const timer = setTimeout(() => {
        fetchData();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [clientName]);

  useEffect(() => {
    setShowClients(true);
  }, [clientsFound]);

  const handleAddLoanToDB = async () => {
    const response = await addLoanToDB({
      bookName: bookData.title,
      clientName: clientName,
      bookNumber: bookData.bookNumber,
    });
    console.log(response)
    if (!response.success) {
      return;
    } else {
      dispatch(setBookAvailable())
      setShow(false);
    }
  };

  return (
    <div className="absolute h-[300px] p-4 w-[400px] flex flex-col justify-between items-center bg-bone-white border-2 border-dark-grey text-md text-dark-grey">
      <div className="h-[30px] w-full flex justify-between items-center">
        <IoCloseOutline
          size="25px"
          className="text-dark-grey hover:text-yellow-300"
          onClick={() => setShow(false)}
        />
        <h1 className="text-xl text-dark-grey">Loan book</h1>
        <div className="w-[25px]"></div>
      </div>
      <div className="h-[50px] w-full flex justify-around items-center">
        <p className="pr-2">To:</p>
        <div>
          <Input
            type="text"
            value={clientName}
            setState={setClientName}
            placeholder="Type a name"
          />
          {showClients && (
            <ClientsDropdown
              setClient={setClientName}
              clients={clientsFound}
              setShowClients={setShowClients}
            />
          )}
        </div>
        <div className="text-sm h-[35px] w-[100px] border-2 border-dark-grey flex justify-center items-center">
          New client
        </div>
      </div>
      <div
        className="border-2 cursor-pointer border-dark-grey h-[50px] w-[100px] flex justify-center items-center"
        onClick={() => handleAddLoanToDB()}
      >
        Confirm
      </div>
    </div>
  );
}
