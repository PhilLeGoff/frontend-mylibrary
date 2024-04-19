import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  display: "books" | "authors" | "clients" | "loans";
  booksDisplay: "searchForBooks" | "addNewBook";
  // loansDisplay: "searchForLoans" | "addNewLoan";
  modalDisplay: {
    type: "book" | "author" | "clients" | "loans";
    show: boolean;
  };
  loanModalDisplay: {
    showLoanDetails: boolean;
    showLoanBook: boolean;
  };
}

const initialState: IinitialState = {
  display: "books",
  booksDisplay: "addNewBook",
  modalDisplay: { type: "book", show: false },
  loanModalDisplay: { showLoanDetails: false, showLoanBook: false },
};

export const displaySlice = createSlice({
  name: "libraryDisplays",
  initialState,
  reducers: {
    setDisplay: (state, action) => {
      state.display = action.payload.display;
    },
    setBooksDisplay: (state, action) => {
      state.booksDisplay = action.payload.booksDisplay;
    },
    setShowModal: (state, action) => {
      state.modalDisplay = action.payload;
    },
  },
});

export const { setDisplay, setBooksDisplay, setShowModal } =
  displaySlice.actions;
export default displaySlice.reducer;
