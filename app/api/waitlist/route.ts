import { NextResponse } from "next/server"
import { sendWaitlistEmail } from "@/lib/email"

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

    // Send email notification
    await sendWaitlistEmail(data)

    console.log("Waitlist entry received and email sent:", {
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
