import SERVER_URL from "@/config";

type TQueryParams = {
  searchOption: string | undefined;
  searchInput: string | undefined;
};

export default async function fetchClientsFromDB({
  searchOption,
  searchInput,
}: TQueryParams) {
  if (!searchInput) return "No clients found";
  const option = searchOption === "" ? "Name" : searchOption;
  const input = searchInput;
  let queryOption = "";

  switch (option) {
    case "Name":
      queryOption = "name";
      break;
    case "Phone number":
      queryOption = "phoneNumber";
      break;
  }
  try {
    const response = await fetch(
      `${SERVER_URL}/clients/${queryOption}/${input}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());

    return response.success !== false ? response.clients : "No clients found";
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
