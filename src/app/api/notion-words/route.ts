import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  try {
    const response = await notion.databases.query({
      database_id: databaseId!,
    });

    const words = response.results.map((page: any) => {
      return {
        id: page.id,
        word: page.properties.word.rich_text[0].plain_text || "",
        meaning: page.properties.meaning.rich_text[0].plain_text || "",
        example: page.properties.example.rich_text[0].plain_text || "",
      };
    });
    return NextResponse.json(words); // 取得したデータをJSON形式で返す
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch words" },
      { status: 500 }
    );
  }
}
