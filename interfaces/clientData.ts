import { BookData } from "./booksData";

export interface ClientData {
  clientId: string | undefined;
  fullName: string | undefined;
  phoneNumber: string | undefined;
  booksLoaned: [BookData] | [];
}
