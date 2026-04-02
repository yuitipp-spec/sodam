"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle, Upload, X } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    spaceType: "",
    area: "",
    timeline: "",
    message: "",
    privacyConsent: false,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}은 5MB를 초과합니다.`)
        return false
      }
      return true
    })

    if (files.length + validFiles.length > 3) {
      alert("최대 3개의 파일만 첨부할 수 있습니다.")
      return
    }

    setFiles([...files, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.contact || !formData.privacyConsent) {
      setError("필수 항목을 모두 입력해주세요.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          fileCount: files.length,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("제출에 실패했습니다")
      }

      setIsSuccess(true)
      setFormData({
        name: "",
        contact: "",
        spaceType: "",
        area: "",
        timeline: "",
        message: "",
        privacyConsent: false,
      })
      setFiles([])
    } catch {
      setError("전송에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-xl mx-auto text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-10 h-10 text-accent" />
            </motion.div>

            <motion.h2 
              className="text-3xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              상담 신청 완료되었습니다
            </motion.h2>

            <motion.p 
              className="text-foreground/70 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              담당자가 확인하는 대로 바로 연락 드리겠습니다!
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                variant="outline"
                className="border-foreground/30 transition-all duration-300 hover:scale-105"
                onClick={() => {
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                포트폴리오 보기
              </Button>

              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-105"
                onClick={() => setIsSuccess(false)}
              >
                새 상담 신청
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            className="text-accent font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-serif font-light">상담</span>{" "}
            <span className="font-bold">문의</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-foreground/70 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            편하게 문의해주세요. 전문 상담사가 친절하게 안내해드립니다.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div 
          className="max-w-2xl mx-auto bg-card border border-border p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="space-y-2">
                <Label htmlFor="contact-name">
                  이름 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact-name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-info">
                  연락처 (전화 또는 이메일){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact-info"
                  placeholder="010-0000-0000 또는 email@example.com"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="space-y-2">
                <Label htmlFor="space-type">공간 유형</Label>
                <Select
                  value={formData.spaceType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, spaceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">아파트</SelectItem>
                    <SelectItem value="villa">빌라/주택</SelectItem>
                    <SelectItem value="officetel">오피스텔</SelectItem>
                    <SelectItem value="office">사무실</SelectItem>
                    <SelectItem value="store">상가</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">평수</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="예: 32"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Label htmlFor="timeline">희망 시공 시기</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) =>
                  setFormData({ ...formData, timeline: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1개월 이내</SelectItem>
                  <SelectItem value="3months">1~3개월</SelectItem>
                  <SelectItem value="6months">3~6개월</SelectItem>
                  <SelectItem value="later">6개월 이후</SelectItem>
                  <SelectItem value="undecided">미정</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Label htmlFor="message">추가 요청사항</Label>
              <Textarea
                id="message"
                placeholder="원하시는 스타일이나 요청사항을 자유롭게 작성해주세요"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="transition-all duration-300 focus:scale-[1.01]"
              />
            </motion.div>

            {/* File Upload */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Label>사진 첨부 (선택, 최대 3개, 각 5MB 이하)</Label>
              <div className="flex flex-wrap gap-4">
                <AnimatePresence>
                  {files.map((file, index) => (
                    <motion.div
                      key={file.name + index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative bg-muted p-3 rounded-md flex items-center gap-2"
                    >
                      <span className="text-sm text-foreground/70 max-w-[150px] truncate">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-foreground/50 hover:text-destructive transition-colors"
                        aria-label="파일 제거"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {files.length < 3 && (
                  <motion.label 
                    className="cursor-pointer bg-muted hover:bg-muted/80 p-4 rounded-md flex items-center gap-2 text-foreground/70 transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">파일 선택</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      multiple
                    />
                  </motion.label>
                )}
              </div>
            </motion.div>

            {/* Privacy Consent */}
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Checkbox
                id="contact-privacy"
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
                  htmlFor="contact-privacy"
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
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="bg-destructive/10 text-destructive p-4 rounded-md text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
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
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
