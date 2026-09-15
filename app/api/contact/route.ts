import { NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

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

    // Send email notification
    await sendContactEmail(data)

    console.log("Contact form submitted and email sent:", {
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
