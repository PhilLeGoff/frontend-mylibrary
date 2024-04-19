import fetchClientFullData from "@/hooks/fetchClientFullData";
import { ClientData } from "@/interfaces/clientData";
import { setClientData, setShowClientDetails } from "@/reducers/clientsDataStore";
import React from "react";
import { useDispatch } from "react-redux";

type Props = { clientData: ClientData };

export default function ClientCard({ clientData }: Props) {
  const dispatch = useDispatch()
  const handleClientFullData = async () => {
    const response = await fetchClientFullData({
      fullName: clientData.fullName,
      phoneNumber: clientData.phoneNumber,
    });
    if (response.success) {
      dispatch(setClientData({data: response.clientDetails}))
      dispatch(setShowClientDetails())
    } 
    return response
  };
  return (
    <div
      className=" shadow-lg hover:shadow-2xl no-scrollbar p-4 w-[250px] h-[250px] flex flex-col justify-around items-center text-md text-dark-grey cursor-pointer m-2 border-2 border-dark-grey bg-bone-white"
      onClick={() => handleClientFullData()}
    >
      <p className="h-[50px]">{clientData.fullName}</p>
      <p className="h-[50px]">{clientData.phoneNumber}</p>
      <p className="h-[50px]">Loans: {clientData.booksLoaned.length}</p>
    </div>
  );
}
