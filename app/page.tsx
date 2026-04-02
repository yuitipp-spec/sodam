"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ServicesSection } from "@/components/services-section"
import { ReviewsSection } from "@/components/reviews-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { ContactModal } from "@/components/contact-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    // Track CTA click
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (command: string, event: string, params: Record<string, string>) => void }).gtag) {
      (window as unknown as { gtag: (command: string, event: string, params: Record<string, string>) => void }).gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: "quick_quote_request",
      })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <PortfolioSection onOpenModal={openModal} />
      <ServicesSection onOpenModal={openModal} />
      <ReviewsSection />
      <PricingSection onOpenModal={openModal} />
      <ContactSection />
      <Footer />
      <FloatingCTA onOpenModal={openModal} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
