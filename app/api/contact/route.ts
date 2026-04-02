import { NextResponse } from "next/server"

interface ContactEntry {
  name: string
  contact: string
  spaceType?: string
  area?: string
  timeline?: string
  message?: string
  fileCount?: number
  timestamp: string
}

export async function POST(request: Request) {
  try {
    const data: ContactEntry = await request.json()

    // Validate required fields
    if (!data.name || !data.contact) {
      return NextResponse.json(
        { error: "이름과 연락처는 필수입니다" },
        { status: 400 }
      )
    }

    // Here you would integrate with Notion API or send email notification
    // For now, we'll simulate a successful response
    //
    // Example Notion integration:
    // import { Client } from "@notionhq/client"
    // const notion = new Client({ auth: process.env.NOTION_TOKEN })
    // await notion.pages.create({
    //   parent: { database_id: process.env.NOTION_CONTACT_DATABASE_ID },
    //   properties: {
    //     Name: { title: [{ text: { content: data.name } }] },
    //     Contact: { rich_text: [{ text: { content: data.contact } }] },
    //     SpaceType: { select: { name: data.spaceType || "기타" } },
    //     Area: { number: parseInt(data.area || "0") },
    //     Timeline: { select: { name: data.timeline || "미정" } },
    //     Message: { rich_text: [{ text: { content: data.message || "" } }] },
    //     FileCount: { number: data.fileCount || 0 },
    //     Timestamp: { date: { start: data.timestamp } },
    //   },
    // })

    console.log("Contact form submitted:", {
      name: data.name,
      contact: data.contact,
      spaceType: data.spaceType,
      area: data.area,
      timeline: data.timeline,
      message: data.message,
      fileCount: data.fileCount,
      timestamp: data.timestamp,
    })

    return NextResponse.json(
      { success: true, message: "상담 신청이 완료되었습니다" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    )
  }
}
