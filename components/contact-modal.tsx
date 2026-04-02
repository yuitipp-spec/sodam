"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle, ArrowRight } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  projectReference?: string
}

export function ContactModal({
  isOpen,
  onClose,
  projectReference,
}: ContactModalProps) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    privacyConsent: false,
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    privacyConsent: "",
  })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      privacyConsent: "",
    }
    let isValid = true

    if (!formData.name.trim()) {
      errors.name = "이름을 입력해주세요"
      isValid = false
    }

    if (!formData.email.trim()) {
      errors.email = "이메일을 입력해주세요"
      isValid = false
    } else if (!validateEmail(formData.email)) {
      errors.email = "올바른 이메일 형식을 입력해주세요"
      isValid = false
    }

    if (!formData.privacyConsent) {
      errors.privacyConsent = "개인정보 수집에 동의해주세요"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          page: window.location.pathname,
          projectReference,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("제출에 실패했습니다")
      }

      // Track success event
      if (typeof window !== "undefined" && (window as unknown as { gtag?: (command: string, event: string, params: Record<string, string>) => void }).gtag) {
        (window as unknown as { gtag: (command: string, event: string, params: Record<string, string>) => void }).gtag("event", "lead_success", {
          event_category: "conversion",
          event_label: "waitlist_signup",
        })
      }

      setStep("success")
    } catch {
      setError("전송에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep("form")
    setFormData({ name: "", email: "", privacyConsent: false })
    setFormErrors({ name: "", email: "", privacyConsent: "" })
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                빠른 견적 요청
              </DialogTitle>
              <p className="text-center text-foreground/70 mt-2">
                간단한 정보를 입력하시면 담당자가 빠르게 연락드립니다
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  이름 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={formErrors.name ? "border-destructive" : ""}
                />
                {formErrors.name && (
                  <p className="text-sm text-destructive">{formErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  이메일 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={formErrors.email ? "border-destructive" : ""}
                />
                {formErrors.email && (
                  <p className="text-sm text-destructive">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyConsent}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        privacyConsent: checked as boolean,
                      })
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="privacy"
                      className="text-sm font-normal text-foreground/70 cursor-pointer"
                    >
                      상담 및 안내 목적의 개인정보 수집에 동의합니다{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <a
                      href="#privacy-policy"
                      className="text-xs text-accent hover:underline"
                    >
                      개인정보 처리방침 보기
                    </a>
                  </div>
                </div>
                {formErrors.privacyConsent && (
                  <p className="text-sm text-destructive">
                    {formErrors.privacyConsent}
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-md text-sm">
                  {error}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-destructive hover:text-destructive"
                    onClick={() => setError(null)}
                  >
                    재시도
                  </Button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    처리 중...
                  </>
                ) : (
                  "상담 신청하기"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-4">
              상담 신청 완료되었습니다
            </h3>

            <p className="text-foreground/70 mb-8">
              담당자가 확인하는 대로 바로 연락 드리겠습니다!
            </p>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full border-foreground/30"
                onClick={() => {
                  handleClose()
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                포트폴리오 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => {
                  handleClose()
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                상담 예약하러 가기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
