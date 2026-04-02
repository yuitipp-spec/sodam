"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const services = [
  {
    number: "01",
    title: "Interior Business",
    titleKo: "인테리어 시공",
    description:
      "인간과 환경, 문화와 기술의 고감을 주요 디자인 컨셉으로 하여, 미래 지향적인 시각, 좋은 감각, 적극적인 의지, 진정한 프로페셔널로 고객의 라이프 스타일에 맞춤 프로젝트를 완성시키고 있습니다.",
    image: "/images/business-interior.jpg",
    imagePosition: "right",
  },
  {
    number: "02",
    title: "Remodeling Business",
    titleKo: "리모델링 시공",
    description:
      "이제 리모델링은 선택이 아닌 필수가 된 이 시대에 맞춰 개성있는 라이프스타일과 품격 있는 이상을 담아 세상에 단 하나뿐인 특별한 공간을 만들어 드리겠습니다.",
    image: "/images/business-remodeling.jpg",
    imagePosition: "left",
  },
]

function ServiceItem({ 
  service, 
  index, 
  onOpenModal 
}: { 
  service: typeof services[0]
  index: number
  onOpenModal: () => void 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const contentX = useTransform(
    scrollYProgress, 
    [0, 1], 
    service.imagePosition === "left" ? [30, -30] : [-30, 30]
  )

  return (
    <div
      ref={ref}
      className={`relative grid lg:grid-cols-2 gap-12 items-center ${
        index !== 0 ? "mt-24" : ""
      }`}
    >
      {/* Content */}
      <motion.div
        className={`${
          service.imagePosition === "left" ? "lg:order-1" : "lg:order-2"
        }`}
        style={{ x: contentX }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-6">
          <motion.span 
            className="font-serif text-5xl font-bold text-accent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
          >
            {service.number}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-foreground">
              {service.title}
            </h3>
            <p className="text-sm text-foreground/50 mt-1">
              {service.titleKo}
            </p>
          </motion.div>
        </div>

        <motion.p 
          className="text-foreground/70 leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {service.description}
        </motion.p>

      </motion.div>

      {/* Image */}
      <motion.div
        className={`relative overflow-hidden ${
          service.imagePosition === "left" ? "lg:order-2" : "lg:order-1"
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <motion.div 
          className="relative aspect-[4/3] overflow-hidden"
          style={{ y: imageY }}
        >
          <Image
            src={service.image}
            alt={service.titleKo}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Decorative overlay */}
        <motion.div
          className="absolute inset-0 bg-accent/10"
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  )
}

export function ServicesSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {services.map((service, index) => (
          <ServiceItem 
            key={service.number} 
            service={service} 
            index={index}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </section>
  )
}
