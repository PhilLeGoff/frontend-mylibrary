import { ClientData } from "@/interfaces/clientData";
import React from "react";
import { useDispatch } from "react-redux";
import ClientCard from "./ClientCard";

type Props = { clientData: ClientData[] | "No clients found" };

export default function DisplayFoundClients({ clientData }: Props) {
  const clientCardList =
    clientData !== "No clients found" ? (
      clientData.map((clientData: ClientData, i: number) => {
        return <ClientCard clientData={clientData} key={i}/>;
      })
    ) : (
      <p className="text-5xl pb-40 text-dark-grey w-[400px]">
        No clients found
      </p>
    );
  return <div className="h-[85%] flex flex-wrap justify-around items-center mx-6 overflow-y-scroll">{clientCardList}</div>;
}
