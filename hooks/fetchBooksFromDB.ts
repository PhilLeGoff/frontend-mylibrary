import SERVER_URL from "@/config";

type TQueryParams = {
  searchOption: string;
  searchInput: string;
};

export default async function fetchBooksFromDB({
  searchOption,
  searchInput,
}: TQueryParams) {
  const option = searchOption === "" ? "Title" : searchOption;
  let input = searchInput;
  if (!searchInput) return "No books found";
  let queryOption = "";

  switch (option) {
    case "Title":
      queryOption = "title";
      break;
    case "Author":
      queryOption = "authors";
      break;
    case "ISBN number":
      queryOption = "isbn";
      break;
    case "Genre":
      queryOption = "genres";
      break;
    case "Due":
      queryOption = "due";
      break;
  }
  try {
    const response = await fetch(
      `${SERVER_URL}/books/${queryOption}/${input}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());

    return response.success !== false ? response.books : "No books found";
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
