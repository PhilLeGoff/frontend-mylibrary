import SERVER_URL from "@/config";

type AddLoan = {
    bookName: string,
    clientName: string,
    bookNumber: number,
}

export default async function addLoanToDB({bookName, clientName, bookNumber} : AddLoan) {
    try {
        const response: any  = await fetch(`${SERVER_URL}/loans`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({bookTitle: bookName, clientName: clientName, bookNumber: bookNumber}),
        })
        const loanstatus = response.json();
        return loanstatus
    } catch (error: any) {
        console.error("Error adding loan to library:", error.message);
        return "Error adding loan to library";
      }
}