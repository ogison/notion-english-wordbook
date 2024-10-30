import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function POST(request: Request) {
  try {
    const { word, meaning, example } = await request.json();
    const response = await notion.pages.create({
      parent: { database_id: databaseId! },
      properties: {
        word: {
          rich_text: [
            {
              text: {
                content: word,
              },
            },
          ],
        },
        meaning: {
          rich_text: [
            {
              text: {
                content: meaning,
              },
            },
          ],
        },
        example: {
          rich_text: [
            {
              text: {
                content: example,
              },
            },
          ],
        },
        status: {
          status: {
            id: "8939ce51-2133-4922-aa56-6917c4db5d67",
          },
        },
      },
    });

    return NextResponse.json({ message: "Word added successfully", response });
  } catch (error) {
    console.error("Error adding word:", error);
    return NextResponse.json(
      { message: "Failed to add word", error },
      { status: 500 }
    );
  }
}
