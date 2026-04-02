"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react"
import { motion, useInView } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

function BlogBIcon({ className }: { className?: string }) {
  return (
    <span
      className={`w-5 h-5 inline-flex items-center justify-center font-bold text-lg leading-none ${className ?? ""}`}
    >
      b
    </span>
  )
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer className="bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4 py-16" ref={ref}>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-2 mb-6"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/logo.jpg"
                alt="소담인테리어 로고"
                width={40}
                height={40}
                className="object-contain rounded-sm"
              />
              <span className="font-bold text-lg">소담</span>
            </motion.div>
            <p className="text-background/70 text-sm leading-relaxed">
              '소중한 것을 담다'
              <br />
              고객님의 소중함을 공간에 담아내다.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6">연락처</h4>
            <ul className="space-y-4 text-sm text-background/70">
              {[
                { icon: Phone, content: "010-6782-5010", href: "tel:010-6782-5010" },
                { icon: Mail, content: "sanghyun5010@hanmail.net", href: "mailto:sanghyun5010@hanmail.net" },
                { icon: MapPin, content: "부산광역시 부산진구 새싹로 89-12", isAddress: true },
                { icon: Clock, content: "평일 09:00 - 18:00" },
              ].map((item, index) => (
                <motion.li 
                  key={item.content}
                  className={`flex ${item.isAddress ? 'items-start' : 'items-center'} gap-3`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <item.icon className={`w-4 h-4 ${item.isAddress ? 'mt-1 flex-shrink-0' : ''}`} />
                  {item.href ? (
                    <a href={item.href} className="hover:text-accent transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <span>{item.content}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6">바로가기</h4>
            <ul className="space-y-3 text-sm text-background/70">
              {[
                { href: "#about", label: "회사소개" },
                { href: "#portfolio", label: "포트폴리오" },
                { href: "#reviews", label: "리뷰" },
                { href: "#pricing", label: "견적안내" },
                { href: "#contact", label: "상담문의" },
              ].map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link href={link.href} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6">SNS</h4>
            <div className="flex gap-4 mb-8">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/design_sodamspace/" },
                { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@sodam_design" },
                { icon: BlogBIcon, label: "Blog", href: "https://dodongint.tistory.com/" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <motion.div 
              className="text-sm text-background/50 space-y-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p>사업자등록번호: 727-03-03592</p>
              <p>대표: 박상현</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div 
          className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-sm text-background/50">
            &copy; {new Date().getFullYear()} (주)소담인테리어. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <Link href="#" className="hover:text-accent transition-colors">
              이용약관
            </Link>
            <Link
              href="#privacy-policy"
              className="hover:text-accent transition-colors"
            >
              개인정보처리방침
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
