import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Clients from "./clients/Clients";
import BooksDisplay from "./books/BooksDisplay";

export default function Display() {
  const displayState = useSelector((state: any) => state.libraryDisplays.display);

  switch (displayState) {
    case "books":
      return <BooksDisplay />;
    case "clients":
      return <Clients />;
  }
}
