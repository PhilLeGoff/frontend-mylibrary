import SERVER_URL from "@/config";

type TQueryParams = {
  fullName: string | undefined;
  phoneNumber: string | undefined;
};

export default async function fetchClientFullData({
  fullName,
  phoneNumber,
}: TQueryParams) {
  try {
    const response = await fetch(
      `${SERVER_URL}/clients/fulldata/${fullName}/${phoneNumber}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());
    console.log("fetchresponse", response);
    return response.success !== false ? response : "No clients found";
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
