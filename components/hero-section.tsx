"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Phone, MessageCircle, Instagram, Youtube } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    image: "/images/hero-bedroom.jpg",
    title: "소중한 것을 담다",
    titleParts: [
      { text: "소", large: true },
      { text: "중한 것을 " },
      { text: "담", large: true },
      { text: "다" },
    ],
    subtitle: "고객님의 소중함을 공간에 담아내다",
    subtitleClass: "text-3xl md:text-3xl",
    description: "소담 인테리어",
  },
  {
    image: "/images/hero-living-room.jpg",
    title: "LIVING",
    subtitle: "PORTFOLIO",
    description: "주거공간 인테리어",
  },
  {
    image: "/images/hero-modern-white.jpg",
    title: "COMMERCIAL",
    subtitle: "PORTFOLIO",
    description: "상업공간 인테리어",
  },
]

export function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slide Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].description}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/60" />
        </motion.div>
      </AnimatePresence>

      {/* Left Side Label */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
      >
        <div className="bg-muted/80 backdrop-blur-sm px-8 py-12 rounded-r-lg">
          <p className="text-sm font-semibold tracking-widest text-foreground uppercase">
            Commercial
          </p>
          <p className="text-sm font-semibold tracking-widest text-foreground uppercase">
            Portfolio
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-end z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-xl ml-auto text-right">
            {/* Slide Indicators */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-end gap-2 mb-6"
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-foreground w-6" : "bg-foreground/30"
                    }`}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </motion.div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                className="font-serif"
              >
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block text-5xl md:text-7xl font-light tracking-wider text-foreground"
                >
                  {(slides[currentSlide] as { titleParts?: { text: string; large?: boolean }[] }).titleParts
                    ? (slides[currentSlide] as { titleParts: { text: string; large?: boolean }[] }).titleParts.map((part, i) =>
                        part.large
                          ? <span key={i} className="text-5xl md:text-7xl font-bold">{part.text}</span>
                          : <span key={i}>{part.text}</span>
                      )
                    : slides[currentSlide].title}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`block font-bold tracking-wider text-foreground mt-2 ${(slides[currentSlide] as { subtitleClass?: string }).subtitleClass ?? "text-5xl md:text-7xl"}`}
                >
                  {slides[currentSlide].subtitle}
                </motion.span>
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg text-foreground/70"
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* CTA */}
          </div>
        </div>
      </div>

      {/* Right Side Social Icons */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute right-4 top-20 z-20"
      >
        <div className="flex flex-col gap-3 bg-foreground rounded-full py-4 px-2">
          {[
            { type: "link", label: "블로그", href: "https://dodongint.tistory.com/", customIcon: "B" },
            { type: "button", label: "채팅 문의", onClick: onOpenModal, icon: MessageCircle },
            { type: "link", label: "Instagram", href: "https://www.instagram.com/design_sodamspace/", icon: Instagram },
            { type: "link", label: "YouTube", href: "https://www.youtube.com/@sodam_design", icon: Youtube },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            >
              {item.type === "button" ? (
                <button
                  onClick={(item as { onClick: () => void }).onClick}
                  className="w-8 h-8 flex items-center justify-center text-background hover:text-accent transition-colors"
                  aria-label={item.label}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                </button>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center text-background hover:text-accent transition-colors"
                  aria-label={item.label}
                >
                  {(item as { customIcon?: string }).customIcon ? (
                    <span className="text-sm font-bold leading-none">{(item as { customIcon: string }).customIcon}</span>
                  ) : (
                    item.icon && <item.icon className="w-4 h-4" />
                  )}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Slide Navigation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute right-4 bottom-1/4 z-20"
      >
        <div className="flex flex-col gap-2 bg-foreground rounded-full py-2 px-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="w-8 h-8 flex items-center justify-center text-background hover:text-accent transition-colors"
            aria-label="이전 슬라이드"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="w-8 h-8 flex items-center justify-center text-background hover:text-accent transition-colors"
            aria-label="다음 슬라이드"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 z-20"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            (주)소담인테리어 견적문의{" "}
            <a href="tel:010-6782-5010" className="font-bold hover:text-accent transition-colors">
              010-6782-5010
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
