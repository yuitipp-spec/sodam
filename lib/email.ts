import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = process.env.NOTIFY_EMAIL || "your-email@example.com"
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev"

interface ContactEmailData {
  name: string
  contact: string
  spaceType?: string
  area?: string
  timeline?: string
  message?: string
  fileCount?: number
  timestamp: string
}

interface WaitlistEmailData {
  name: string
  email: string
  page?: string
  projectReference?: string
  timestamp: string
}

const spaceTypeLabels: Record<string, string> = {
  apartment: "아파트",
  villa: "빌라/주택",
  officetel: "오피스텔",
  office: "사무실",
  store: "상가",
  other: "기타",
}

const timelineLabels: Record<string, string> = {
  "1month": "1개월 이내",
  "3months": "1~3개월",
  "6months": "3~6개월",
  later: "6개월 이후",
  undecided: "미정",
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Seoul",
  })
}

export async function sendContactEmail(data: ContactEmailData) {
  const spaceTypeText = data.spaceType
    ? spaceTypeLabels[data.spaceType] || data.spaceType
    : "미입력"
  const timelineText = data.timeline
    ? timelineLabels[data.timeline] || data.timeline
    : "미입력"

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `[소담] 새 상담 문의 - ${data.name}님`,
    html: `
      <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); padding: 32px; text-align: center;">
          <h1 style="color: #c9a96e; margin: 0; font-size: 24px; letter-spacing: 2px;">소담 인테리어</h1>
          <p style="color: #999; margin: 8px 0 0 0; font-size: 14px;">새로운 상담 문의가 접수되었습니다</p>
        </div>

        <!-- Content -->
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; width: 120px; vertical-align: top;">이름</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px; font-weight: 600;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">연락처</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px; font-weight: 600;">${data.contact}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">공간 유형</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px;">${spaceTypeText}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">평수</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px;">${data.area ? data.area + "평" : "미입력"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">희망 시공 시기</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px;">${timelineText}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">추가 요청사항</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px; line-height: 1.6;">${data.message || "없음"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">첨부 파일</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px;">${data.fileCount ? data.fileCount + "개" : "없음"}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background: #f8f8f8; padding: 20px 32px; border: 1px solid #e5e5e5; border-top: none; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">접수 시각: ${formatDate(data.timestamp)}</p>
          <p style="color: #bbb; font-size: 11px; margin: 8px 0 0 0;">이 메일은 소담 인테리어 홈페이지에서 자동 발송되었습니다.</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error("Resend email error:", error)
    throw new Error(`이메일 전송 실패: ${error.message}`)
  }
}

export async function sendWaitlistEmail(data: WaitlistEmailData) {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `[소담] 빠른 견적 요청 - ${data.name}님`,
    html: `
      <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); padding: 32px; text-align: center;">
          <h1 style="color: #c9a96e; margin: 0; font-size: 24px; letter-spacing: 2px;">소담 인테리어</h1>
          <p style="color: #999; margin: 8px 0 0 0; font-size: 14px;">빠른 견적 요청이 접수되었습니다</p>
        </div>

        <!-- Content -->
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; width: 120px; vertical-align: top;">이름</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px; font-weight: 600;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">이메일</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px; font-weight: 600;">${data.email}</td>
            </tr>
            ${data.projectReference ? `
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">관심 프로젝트</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px;">${data.projectReference}</td>
            </tr>
            ` : ""}
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 12px; color: #888; font-size: 13px; vertical-align: top;">요청 페이지</td>
              <td style="padding: 14px 12px; color: #333; font-size: 14px;">${data.page || "/"}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background: #f8f8f8; padding: 20px 32px; border: 1px solid #e5e5e5; border-top: none; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">접수 시각: ${formatDate(data.timestamp)}</p>
          <p style="color: #bbb; font-size: 11px; margin: 8px 0 0 0;">이 메일은 소담 인테리어 홈페이지에서 자동 발송되었습니다.</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error("Resend email error:", error)
    throw new Error(`이메일 전송 실패: ${error.message}`)
  }
}
