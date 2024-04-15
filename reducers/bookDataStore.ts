import { BookData } from "@/interfaces/booksData";
import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  bookData: BookData;
}

const initialState: IinitialState = {
  bookData: {
    title: "",
    authors: [""],
    genres: [""],
    publisher: "",
    publishedDate: "",
    language: "",
    isbn: "",
    picture: "",
    description: "",
  },
};

export const bookDataSlice = createSlice({
  name: "bookData",
  initialState,
  reducers: {
    setBookData: (state, action) => {
      state.bookData = action.payload.bookData;
    },
  },
});

export const { setBookData } = bookDataSlice.actions;
export default bookDataSlice.reducer;
