import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Authors from "./authors/Authors";
import Loans from "./loans/Loans";
import Clients from "./clients/Clients";
import BooksDisplay from "./books/BooksDisplay";

export default function Display() {
  const displayState = useSelector((state: any) => state.libraryDisplays.display);

  switch (displayState) {
    case "books":
      return <BooksDisplay />;
    case "authors":
      return <Authors />;
    case "loans":
      return <Loans />;
    case "clients":
      return <Clients />;
  }
}
