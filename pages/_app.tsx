import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import libraryDisplays from "@/reducers/display";
import bookData from "@/reducers/bookDataStore";
import clientData from "@/reducers/clientsDataStore";

const reducers = combineReducers({ libraryDisplays, bookData, clientData });

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
