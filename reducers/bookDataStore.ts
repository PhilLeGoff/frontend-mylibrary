import { BookData } from "@/interfaces/booksData";
import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  bookData: BookData;
}

const initialState: IinitialState = {
  bookData: {
    bookId: "",
    title: "",
    authors: [""],
    genres: [""],
    publisher: "",
    publishedDate: "",
    language: "",
    isbn: "",
    picture: "",
    description: "",
    bookNumber: 1,
    available: true,
  },
};

export const bookDataSlice = createSlice({
  name: "bookData",
  initialState,
  reducers: {
    setBookData: (state, action) => {
      state.bookData = action.payload.bookData;
      if (action.payload.bookNumber !== undefined) {
        state.bookData.bookNumber = action.payload.bookNumber
        state.bookData.bookId = action.payload.bookId;
        state.bookData.available = action.payload.available;
      }
    },
    setBookAvailable: (state) => {
      state.bookData.available = !state.bookData.available
    }
  },
});

export const { setBookData, setBookAvailable } = bookDataSlice.actions;
export default bookDataSlice.reducer;
