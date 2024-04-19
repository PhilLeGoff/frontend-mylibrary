import { BookData } from "@/interfaces/booksData";

type TQueryParams = {
  searchOption: string;
  searchInput: string;
};

type Book = {
  title: string;
  authors: string[];
  genres: string[];
  publisher: string;
  publishedDate: string;
  language: string;
  isbn: string;
  picture: string;
  description: string;
  bookId: string | undefined;
  bookNumber: number | undefined;
  available: boolean | undefined;
};

type FilteredData = Book[] | "No books found";

const makeQuery = ({ searchOption, searchInput }: TQueryParams) => {
  const option = searchOption === "" ? "Title" : searchOption;
  // const input = searchInput.replace(/ /g, "_");
  const input = searchInput;
  let queryKeyword = "";

  switch (option) {
    case "Title":
      queryKeyword = "intitle";
      break;
    case "Author":
      queryKeyword = "inauthor";
      break;
    case "ISBN number":
      queryKeyword = "isbn";
      break;
  }
  return { queryKeyword, input };
};

const filterData = (data: any) => {
  let filteredData = data.map((item: any, i: number) => {
    const title = item.volumeInfo.title || "Unknown";
    const authors = item.volumeInfo.authors || ["Unknown"];
    const genres = item.volumeInfo.categories || ["Unknown"];
    const publisher = item.volumeInfo.publisher || "Unknown";
    const publishedDate = item.volumeInfo.publishedDate || "Unknown";
    const language = item.volumeInfo.language || "Unknown";
    const isbn =
      item.volumeInfo.industryIdentifiers &&
      item.volumeInfo.industryIdentifiers.length > 0
        ? item.volumeInfo.industryIdentifiers[
            item.volumeInfo.industryIdentifiers.length - 1
          ].identifier
        : "Unknown";
    const thumbnail =
      item.volumeInfo.imageLinks?.thumbnail || "images/no_image.png";
    const description = item.volumeInfo.description || "No Description";

    return {
      title,
      authors,
      genres,
      publisher,
      publishedDate,
      language,
      isbn,
      picture: thumbnail,
      description,
    };
  });
  console.log("filteredData", filteredData);
  return filteredData;
};

export default async function fetchGoogleBookData({
  searchOption,
  searchInput,
}: TQueryParams) {
  const searchQuery = await makeQuery({ searchOption, searchInput });
  try {
    console.log(
      `/api/books?option=${searchQuery.queryKeyword}&input=${searchQuery.input}`
    );
    const response = await fetch(
      `/api/books?option=${searchQuery.queryKeyword}&input=${searchQuery.input}`
    );
    const data = await response.json();
    let filteredData: FilteredData = [];
    console.log("datafetched", data);
    data.totalItems !== 0
      ? (filteredData = await filterData(data.items))
      : (filteredData = "No books found");
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
