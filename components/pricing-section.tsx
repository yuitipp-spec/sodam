"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const pricingTiers = [
  {
    title: "원룸 / 부분 리모델링",
    subtitle: "",
    priceRange: "500 ~ 1,500만원",
    area: "10평 이하",
    features: [
      "기본 도면 설계",
      "마감재 선택 컨설팅",
      "시공 관리",
      "기본 조명 설치",
      "6개월 A/S 보증",
    ],
  },
  {
    title: "전체 인테리어",
    subtitle: "",
    priceRange: "2,000 ~ 5,000만원",
    area: "20~35평",
    features: [
      "프리미엄 마감재",
      "시공 전담 매니저",
      "1년 A/S 보증",
      "입주 청소 서비스",
    ],
    popular: true,
  },
  {
    title: "하이엔드 인테리어",
    subtitle: "",
    priceRange: "5,000만원 ~",
    area: "35평 이상",
    features: [
      "구조 변경 설계",
      "최고급 마감재",
      "전담 디자이너 배정",
      "스마트홈 연동",
      "2년 A/S 보증",
      "입주 청소 + 스타일링",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function PricingSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [area, setArea] = useState("")
  const [spaceType, setSpaceType] = useState("")
  const [estimate, setEstimate] = useState<string | null>(null)
  
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const calculatorRef = useRef(null)
  
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" })
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" })
  const calculatorInView = useInView(calculatorRef, { once: true, margin: "-100px" })

  const calculateEstimate = () => {
    if (!area || !spaceType) return

    const areaNum = parseInt(area)
    let basePrice = 0

    // Base calculation per square meter
    if (spaceType === "residential") {
      basePrice = areaNum * 103
    } else if (spaceType === "commercial") {
      basePrice = areaNum * 148
    } else {
      basePrice = areaNum * 200
    }

    const minPrice = Math.round(basePrice * 0.9)
    const maxPrice = Math.round(basePrice * 1.1)

    setEstimate(
      `약 ${minPrice.toLocaleString()}만원 ~ ${maxPrice.toLocaleString()}만원`
    )
  }

  return (
    <section id="pricing" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <motion.p 
            className="text-accent font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Pricing Guide
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-serif font-light">사례별</span>{" "}
            <span className="font-bold">견적안내</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-foreground/70 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            프로젝트 규모와 요구사항에 따른 예상 견적을 확인하세요
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              variants={cardVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: tier.popular 
                  ? "0 25px 50px -12px rgba(196, 120, 74, 0.25)" 
                  : "0 25px 50px -12px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 }
              }}
              className={`relative bg-card border ${
                tier.popular ? "border-accent" : "border-border"
              } p-8 flex flex-col h-full`}
            >
              {tier.popular && (
                <motion.div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 text-sm font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  인기
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {tier.title}
                </h3>
                {tier.subtitle ? (
                  <p className="text-sm text-foreground/50 mt-1">
                    {tier.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="text-center mb-6">
                <motion.p 
                  className="text-xl font-bold text-accent whitespace-nowrap"
                  initial={{ scale: 0.8 }}
                  animate={cardsInView ? { scale: 1 } : { scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "backOut" }}
                >
                  {tier.priceRange}
                </motion.p>
                <p className="text-sm text-foreground/50 mt-1">{tier.area}</p>
              </div>

              <ul className="space-y-3 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    className="flex items-center gap-3 text-foreground/70"
                    initial={{ opacity: 0, x: -20 }}
                    animate={cardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                  >
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                className={`w-full mt-auto transition-all duration-300 hover:scale-105 ${
                  tier.popular
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "bg-foreground hover:bg-foreground/90 text-background"
                }`}
                onClick={onOpenModal}
              >
                빠른견적요청
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Calculator */}
        <motion.div 
          ref={calculatorRef}
          className="max-w-2xl mx-auto bg-muted/50 p-8 border border-border"
          initial={{ opacity: 0, y: 50 }}
          animate={calculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold text-foreground text-center mb-6"
            initial={{ opacity: 0 }}
            animate={calculatorInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            간단 예상 견적 계산기
          </motion.h3>

          <motion.div 
            className="grid md:grid-cols-2 gap-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={calculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-2">
              <Label htmlFor="area">평수</Label>
              <Input
                id="area"
                type="number"
                placeholder="예: 32"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spaceType">공간 유형</Label>
              <Select value={spaceType} onValueChange={setSpaceType}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">주거공간</SelectItem>
                  <SelectItem value="commercial">상업공간</SelectItem>
                  <SelectItem value="remodeling">하이엔드</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={calculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              className="w-full bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 hover:scale-[1.02]"
              onClick={calculateEstimate}
            >
              예상 견적 확인
            </Button>
          </motion.div>

          <AnimatePresence mode="wait">
            {estimate && (
              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-foreground/70">예상 견적 범위</p>
                <motion.p 
                  className="text-2xl font-bold text-accent mt-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                >
                  {estimate}
                </motion.p>
                <p className="text-sm text-foreground/50 mt-2">
                  * 실제 견적은 현장 상담 후 확정됩니다
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Button
                    variant="outline"
                    className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    onClick={onOpenModal}
                  >
                    상세 견적 요청
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
