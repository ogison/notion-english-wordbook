import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    const updatedPage = await notion.pages.update({
      page_id: id,
      properties: {
        status: {
          type: "status",
          status: {
            name: status,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Page updated successfully",
      updatedPage,
    });
  } catch (error) {
    console.error("Error updating Notion page:", error);
    return NextResponse.json(
      { message: "Failed to update page", error },
      { status: 500 }
    );
  }
}
