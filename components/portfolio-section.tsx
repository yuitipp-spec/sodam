"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

const portfolioItems = [
  {
    id: 1,
    image: "/images/portfolio-1.jpg",
    title: "화명동 롯데 카이저",
    category: "주거공간",
    area: "43평",
    link: "/portfolio/residential/project-1",
  },
  {
    id: 2,
    image: "/images/portfolio-2.jpg",
    title: "광안동 미용실",
    category: "상업공간",
    area: "20평",
    link: "/portfolio/commercial/project-1",
  },
  {
    id: 3,
    image: "/images/portfolio-3.jpg",
    title: "양산 미용실",
    category: "상업공간",
    area: "60평",
    link: "/portfolio/commercial/project-2",
  },
  {
    id: 4,
    image: "/images/portfolio-4.jpg",
    title: "원룸주택 실내인테리어",
    category: "주거공간",
    area: "18평",
    link: "/portfolio/residential/project-2",
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

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
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

export function PortfolioSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeFilter, setActiveFilter] = useState("전체")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filteredItems =
    activeFilter === "전체"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <section id="portfolio" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <motion.p
              className="text-accent font-medium tracking-widest uppercase mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="font-serif font-light">INTERIOR</span>
              <br />
              <span className="font-bold">PORTFOLIO</span>
            </motion.h2>
            <motion.p
              className="mt-6 text-foreground/70 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              소중한 공간과 시간은 담다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="outline"
                className="mt-6 border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/portfolio/residential">READ MORE</Link>
              </Button>
            </motion.div>
          </div>

          {/* Navigation */}
          <motion.div
            className="flex items-end justify-between lg:justify-end gap-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex gap-2">
              <button
                className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                aria-label="Previous"
              >
                PREV
              </button>
              <span className="text-foreground/30">|</span>
              <button
                className="text-sm text-foreground hover:text-accent transition-colors"
                aria-label="Next"
              >
                NEXT
              </button>
            </div>
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative bg-card overflow-hidden"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300"
                  initial={false}
                />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit bg-background/90 border-0 hover:bg-accent hover:text-accent-foreground"
                    asChild
                  >
                    <Link href={item.link}>
                      상세보기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-foreground/50 mt-1">
                  {item.category} · {item.area}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Divider */}
        <motion.div
          className="mt-16 border-t border-foreground/10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
    </section>
  )
}
