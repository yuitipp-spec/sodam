import { NextResponse } from "next/server"
import { sendWaitlistEmail } from "@/lib/email"

interface WaitlistEntry {
  name: string
  phone: string
  page?: string
  projectReference?: string
  timestamp: string
}

export async function POST(request: Request) {
  try {
    const data: WaitlistEntry = await request.json()

    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: "이름과 전화번호는 필수입니다" },
        { status: 400 }
      )
    }

    // Validate phone format
    const phoneRegex = /^[0-9-+\s]{8,}$/
    if (!phoneRegex.test(data.phone)) {
      return NextResponse.json(
        { error: "올바른 전화번호 형식을 입력해주세요" },
        { status: 400 }
      )
    }

    // Send email notification
    await sendWaitlistEmail(data)

    console.log("Waitlist entry received and email sent:", {
      name: data.name,
      phone: data.phone,
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
