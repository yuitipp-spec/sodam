"use client"

import { useState, use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { commercialProjects } from "@/lib/portfolio-data"

export default function CommercialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = commercialProjects.find((p) => p.id === id)
  if (!project) notFound()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + project.photos.length) % project.photos.length : null))
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % project.photos.length : null))

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link
            href="/portfolio/commercial"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            상업공간 목록으로
          </Link>
          <p className="text-accent font-medium tracking-widest uppercase mb-3">Commercial</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{project.title}</h1>
          <p className="text-foreground/60 mb-4">{project.description}</p>
          <div className="flex gap-6 text-sm text-foreground/50">
            <span>면적 {project.area}</span>
            <span>예산 {project.budget}</span>
            <span>총 {project.photos.length}장</span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {project.photos.map((photo, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden cursor-pointer group bg-muted"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={photo}
                  alt={`${project.title} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-foreground/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground/60 mb-4">이런 공간을 원하신다면 지금 바로 상담하세요.</p>
          <Button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            빠른견적요청
          </Button>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>

            <button
              className="absolute left-4 text-white/70 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); prevPhoto() }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <motion.div
              key={lightboxIndex}
              className="relative w-full max-w-4xl max-h-[80vh] mx-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.photos[lightboxIndex]}
                alt={`${project.title} ${lightboxIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-full"
              />
            </motion.div>

            <button
              className="absolute right-4 text-white/70 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); nextPhoto() }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIndex + 1} / {project.photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
