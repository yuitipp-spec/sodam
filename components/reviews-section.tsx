"use client"

import { useRef } from "react"
import { Star } from "lucide-react"
import { motion, useInView } from "framer-motion"

const reviews = [
  {
    id: 1,
    name: "최**",
    location: "부산 해운대구",
    rating: 5,
    text: "초도 상담부터 친절하게 어떤식으로 시공되는지 알려주셔서 너무 좋았어요. 이사 들어와서 하루 지내보니 조명이랑 전체 색감이 포근해서 마음이 편안해지네요. 여러모로 신경 많이 써주셔서 감사합니다~ 특히 COB 조명 라인이 너무 깔끔하고 예쁘네요:)",
    project: "34평 아파트 전체 인테리어",
  },
  {
    id: 2,
    name: "이**",
    location: "부산 동래구",
    rating: 5,
    text: "인테리어 업체 찾는데 지쳐 제일 친절한 업체에 의뢰 맡기자고 생각해 맡겼는데 처음 시작부터 제 예산 맞춰서 시공해주신다고 하시고 추천해주신 장판 디자인도 너무 맘에 들어요~ 오피스텔 공사한다고 하시는 분들께 소개 많이 해드릴게요~",
    project: "오피스텔 인테리어",
  },
  {
    id: 3,
    name: "최**",
    location: "경남 양산",
    rating: 5,
    text: "확장 이전을 하게 되어 기존 인테리어 업체에 진행해야하나 했었는데 그 전 업체 AS처리가 너무 늦어 맘고생 한게 생각나서 다음은 무조건 AS 잘 되는 업체에 의뢰해야겠다고 생각했는데 견적 단계에서 기존 미용실에 등이 나가서 난감했는데 연락한지 2시간만에 대표님 등장해서 얼마나 든든했는지 몰라요. 디자인도 너무 예쁘게 잘 뽑아주셔서 다음번에 2호점할때 꼭 연락 드릴게요~~ 감사합니다 ㅎㅎ",
    project: "미용실 인테리어",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function ReviewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="reviews" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            className="text-accent font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Reviews
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-serif font-light">고객</span>{" "}
            <span className="font-bold">리뷰</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-foreground/70 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            소담인테리어와 함께한 고객님들의 솔직한 후기입니다
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 }
              }}
              className="bg-card p-8 border border-border flex flex-col"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + i * 0.05 }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-accent fill-accent"
                          : "text-foreground/20"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/70 leading-relaxed flex-1">
                {review.text}
              </p>

              {/* Info */}
              <div className="border-t border-border pt-4 mt-auto">
                <p className="font-medium text-foreground">
                  {review.name}{" "}
                  <span className="text-foreground/50 font-normal">
                    · {review.location}
                  </span>
                </p>
                <p className="text-sm text-accent mt-1">{review.project}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* (삭제) Trust Badges */}
      </div>
    </section>
  )
}
