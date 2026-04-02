"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, X } from "lucide-react"

export function FloatingCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const [showBar, setShowBar] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      setShowBar(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Floating Action Button - Mobile/Desktop */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {isExpanded && (
          <>
            <a
              href="tel:010-6782-5010"
              className="w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg hover:bg-foreground/90 transition-all animate-in slide-in-from-bottom-2"
              aria-label="전화 문의"
            >
              <Phone className="w-6 h-6" />
            </a>
            <a
              href="https://open.kakao.com/o/swq1jU0h"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-all animate-in slide-in-from-bottom-2"
              aria-label="빠른 견적 요청"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isExpanded
              ? "bg-foreground/80 text-background"
              : "bg-accent text-accent-foreground"
          }`}
          aria-label={isExpanded ? "닫기" : "문의하기"}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sticky Bottom CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 bg-accent text-accent-foreground transition-transform duration-300 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-medium hidden sm:block">
            지금 바로 무료 상담 받아보세요
          </p>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
            <a
              href="tel:010-6782-5010"
              className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              <span>010-6782-5010</span>
            </a>
            <Button
              size="sm"
              className="bg-background text-foreground hover:bg-background/90"
              onClick={onOpenModal}
            >
              빠른견적요청
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
