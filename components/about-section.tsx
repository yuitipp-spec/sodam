"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image
                  src="/images/hero-modern-white.jpg"
                  alt="모던 인테리어 디자인"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            {/* Decorative Number */}
            <motion.div 
              className="absolute -top-8 -left-4 md:-left-8"
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
            >
              <span className="font-serif text-8xl md:text-9xl font-bold text-accent/20">
                02
              </span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="lg:pl-8">
            <motion.p 
              className="text-accent font-medium tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              From Follos
            </motion.p>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="font-serif font-light">FUNCTION</span>
            </motion.h2>

            <motion.div 
              className="mt-8 space-y-4 text-foreground/70 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p>
                인간과 환경, 문화와 기술의 고감을 주요 디자인 컨셉으로 하여,
                미래 지향적인 시각, 좋은 감각, 적극적인 의지, 진정한 프로페셔널로
                고객의 라이프 스타일에 맞춤 프로젝트를 완성시키고 있습니다.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
