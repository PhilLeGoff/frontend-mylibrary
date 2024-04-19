import addClientToLibrary from "@/hooks/addClientToLibrary";
import { setShowAddModal } from "@/reducers/clientsDataStore";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

type Props = {};

export default function AddClientModal({}: Props) {
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState<string>();
  const [phoneValue, setPhoneValue] = useState<string>();
  const [addError, setAddError] = useState<boolean>(false);

  const handleAddClientToLibrary = async () => {
    
    const addResponse = await addClientToLibrary({
      clientId: undefined,
      fullName: nameValue,
      phoneNumber: phoneValue,
      booksLoaned: [],
    });
    addResponse.success === true
      ? dispatch(setShowAddModal())
      : setAddError(!addError);
  };

  useEffect(() => {
    if (addError) {
      const timer = setTimeout(() => {
        dispatch(setShowAddModal());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [addError]);

  return (
    <div className="flex absolute inset-0 z-10 justify-center w-full bg-white bg-opacity-10 items-center h-full backdrop-blur-sm backdrop-brightness-50">
      {!addError ? (
        <div className="flex flex-col text-md justify-between items-center text-dark-grey px-4 w-[500px] h-[400px] bg-bone-white border-2 border-dark-grey">
          <div className="row-span-2 w-full my-4 flex justify-between items-center">
            <IoCloseOutline
              size="25px"
              className="text-dark-grey hover:text-yellow-300"
              onClick={() => dispatch(setShowAddModal())}
            />
            <h1 className="text-xl text-dark-grey">Add client</h1>
            <div className="w-[25px]"></div>
          </div>
          <div className="flex flex-col justify-around items-between h-[200px] w-[400px]">
            <div>
              Fullname:{" "}
              <input
                className="text-sm placeholder:text-sm placeholder:text-dark-grey mx-2  rounded-b-sm group bg-transparent outline-none h-[40px] w-[200px] text-dark-grey"
                type="string"
                value={nameValue}
                placeholder="Type here"
                onChange={(event) => setNameValue(event.target.value)}
              />
            </div>
            <div>
              Phone number:{" "}
              <input
                className="text-sm placeholder:text-sm placeholder:text-dark-grey mx-2  rounded-b-sm group bg-transparent outline-none h-[40px] w-[200px] text-dark-grey"
                type="string"
                value={phoneValue}
                placeholder="Type here"
                onChange={(event) => setPhoneValue(event.target.value)}
              />
            </div>
          </div>
          <div className="flex my-4 cursor-pointer justify-center items-center h-[50px] w-[120px] border border-dark-grey rounded-sm " onClick={() => handleAddClientToLibrary()}>
            <p className="text-md">Add client</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-md justify-center items-center text-dark-grey px-4 w-[500px] h-[400px] bg-bone-white border-2 border-dark-grey">
          <h1 className="text-red-500 text-3xl">Client already registered</h1>
        </div>
      )}
    </div>
  );
}
