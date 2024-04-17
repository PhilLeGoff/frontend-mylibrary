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
      }
    },
  },
});

export const { setBookData } = bookDataSlice.actions;
export default bookDataSlice.reducer;
