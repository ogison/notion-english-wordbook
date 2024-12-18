import { WORD } from "@/types";
import { Status } from "@/types/enums";
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId!,
    });

    const words: WORD[] = response.results
      .map((page: any) => {
        const status = page.properties.status.status.name || "";
        if (status === Status.Done) {
          return undefined;
        }
        return {
          id: page.id,
          word: page.properties.word.rich_text?.[0]?.plain_text || "",
          meaning: page.properties.meaning.rich_text?.[0]?.plain_text || "",
          example: page.properties.example.rich_text?.[0]?.plain_text || "",
          status: page.properties.status.status.name || "",
          type: page.properties.type?.select?.name || "",
        };
      })
      .filter((word): word is WORD => word != undefined);
    return NextResponse.json(words);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to fetch words",
          message: error.message,
          // stack: error.stack, // 開発時のみ
        },
        { status: 500 }
      );
    }
  }
}
