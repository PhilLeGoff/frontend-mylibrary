import SERVER_URL from "@/config";

interface bookData {
  title: string;
  authors: string[];
  genres: string[];
  isbn: string;
  picture: string;
}

export default async function addBookToLIbrary(data: any) {
  try {
    const response = await fetch(`${SERVER_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete loan from library");
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error: any) {
    console.error("Error adding book to library:", error.message);
    return "Error adding book to library";
  }
}
