import React from "react";

type Props = {
  clients: string[];
  setClient: React.Dispatch<React.SetStateAction<string>>;
  setShowClients: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ClientsDropdown({
  clients,
  setClient,
  setShowClients,
}: Props) {
  const handleClientSelection = (client: string) => {
    client === "No clients found" ? null : setClient(client);
    setShowClients(false);
  };

  return (
    <div className=" w-[200px]  -m-0.5 -mt-[1px] absolute  border-x-2 border-y-[1px] border-dark-grey opacity-90 flex flex-col bg-bone-white rounded-b-sm z-50">
      {clients.map((client: string, i: number) => {
        return (
          <section
            key={i}
            className="h-[30px] w-full cursor-pointer border-y-[1px] border-dark-grey text-sm pl-[10px] pt-[3px] text-dark-grey"
            onClick={() => handleClientSelection(client)}
          >
            {client}
          </section>
        );
      })}
    </div>
  );
}
