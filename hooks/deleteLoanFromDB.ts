import SERVER_URL from "@/config";

export default async function deleteLoanFromDB(bookId: string | undefined) {
  try {
    const response = await fetch(`${SERVER_URL}/loans/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId: bookId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add book to library");
    }

    const bookStatus = response.json();
    return bookStatus;
  } catch (error: any) {
    console.error("Error deleting loan from library:", error.message);
    return "Error deleting loan from library";
  }
}
