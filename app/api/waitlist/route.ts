import { NextResponse } from "next/server"

interface WaitlistEntry {
  name: string
  email: string
  page?: string
  projectReference?: string
  timestamp: string
}

export async function POST(request: Request) {
  try {
    const data: WaitlistEntry = await request.json()

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "이름과 이메일은 필수입니다" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "올바른 이메일 형식을 입력해주세요" },
        { status: 400 }
      )
    }

    // Here you would integrate with Notion API
    // For now, we'll simulate a successful response
    // In production, you would use the Notion SDK:
    //
    // import { Client } from "@notionhq/client"
    // const notion = new Client({ auth: process.env.NOTION_TOKEN })
    // await notion.pages.create({
    //   parent: { database_id: process.env.NOTION_DATABASE_ID },
    //   properties: {
    //     Name: { title: [{ text: { content: data.name } }] },
    //     Email: { email: data.email },
    //     Page: { rich_text: [{ text: { content: data.page || "" } }] },
    //     Timestamp: { date: { start: data.timestamp } },
    //   },
    // })

    console.log("Waitlist entry received:", {
      name: data.name,
      email: data.email,
      page: data.page,
      projectReference: data.projectReference,
      timestamp: data.timestamp,
    })

    return NextResponse.json(
      { success: true, message: "상담 신청이 완료되었습니다" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    )
  }
}
