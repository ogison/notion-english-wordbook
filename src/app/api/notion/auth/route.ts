import { NextResponse } from "next/server";

export async function GET() {
  const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
  const REDIRECT_URI = process.env.NOTION_REDIRECT_URI;
  
  const authUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${REDIRECT_URI}`;
  
  return NextResponse.json({ authUrl });
}