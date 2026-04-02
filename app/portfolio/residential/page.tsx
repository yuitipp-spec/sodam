"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { residentialProjects } from "@/lib/portfolio-data"

export default function ResidentialPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            포트폴리오로 돌아가기
          </Link>

          {/* 카테고리 탭 */}
          <div className="flex gap-4 mb-8">
            <Link
              href="/portfolio/residential"
              className="px-4 py-2 text-sm font-medium border-b-2 border-accent text-accent"
            >
              주거공간
            </Link>
            <Link
              href="/portfolio/commercial"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-foreground/50 hover:text-foreground transition-colors"
            >
              상업공간
            </Link>
          </div>

          <p className="text-accent font-medium tracking-widest uppercase mb-4">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="font-serif font-light">RESIDENTIAL</span>
            <br />
            <span className="font-bold">주거공간</span>
          </h1>
          <p className="text-foreground/70 max-w-md">
            삶의 공간을 더욱 아름답고 기능적으로 만드는 주거 인테리어 프로젝트입니다.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative bg-card overflow-hidden"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/portfolio/residential/${project.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-fit bg-background/90 border-0 hover:bg-accent hover:text-accent-foreground pointer-events-none"
                      >
                        상세보기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-foreground">{project.title}</h3>
                    <p className="text-sm text-foreground/50 mt-1">
                      {project.category} · {project.area} · {project.budget}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
