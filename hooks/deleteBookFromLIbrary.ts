export default async function deleteBookFromLibrary(bookId: string) {
    try {
        const response = await fetch(
            `http://localhost:3001/books/`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({bookId: bookId})
            }
          )
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
}