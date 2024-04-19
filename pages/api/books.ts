import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { option, input } = req.query;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  console.log(option, input)

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${option}:${input}&orderBy=relevance&langRestrict=en&maxResults=40&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
