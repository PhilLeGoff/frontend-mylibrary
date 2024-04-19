import { ClientData } from "@/interfaces/clientData";
import SERVER_URL from "@/config";

export default async function addClientToLibrary(data: ClientData) {
  try {
    const response = await fetch(`${SERVER_URL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add client to library");
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error: any) {
    console.error("Error adding client to library:", error.message);
    return "Error adding client to library";
  }
}
