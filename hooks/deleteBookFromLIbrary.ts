import SERVER_URL from "@/config";


export default async function deleteBookFromLibrary(bookId: string | undefined) {
  try {
    const response = await fetch(`${SERVER_URL}/books/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: bookId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}
