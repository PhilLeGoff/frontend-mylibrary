export interface BookData {
  bookId: string | undefined;
  title: string;
  authors: string[];
  genres: string[];
  publisher: string;
  publishedDate: string;
  language: string;
  isbn: string;
  picture: string;
  description: string;
  bookNumber: number | undefined;
  available: boolean | undefined;
}
