"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { label: "회사소개", href: "/#about" },
  {
    label: "포트폴리오",
    href: "/#portfolio",
    children: [
      { label: "주거공간", href: "/portfolio/residential" },
      { label: "상업공간", href: "/portfolio/commercial" },
    ],
  },
  { label: "리뷰", href: "/#reviews" },
  { label: "견적안내", href: "/#pricing" },
  { label: "상담문의", href: "/#contact" },
]

export function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="소담인테리어 로고"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-bold text-lg text-foreground">소담인테리어</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {item.label}
                  <span className="text-xs text-foreground/50">▾</span>
                </Link>
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
                  <div className="bg-background shadow-lg border border-foreground/10 py-1 min-w-[120px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/80 hover:text-foreground"
            asChild
          >
            <a href="tel:010-6782-5010" aria-label="전화 문의">
              <Phone className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/80 hover:text-foreground"
            onClick={onOpenModal}
            aria-label="채팅 문의"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button
            onClick={onOpenModal}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            빠른견적요청
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/80"
            asChild
          >
            <a href="tel:010-6782-5010" aria-label="전화 문의">
              <Phone className="h-5 w-5" />
            </a>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <nav className="flex flex-col gap-4 mt-8 px-6">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2 block"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <div className="flex flex-col gap-1 pl-4 mt-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-sm text-foreground/60 hover:text-foreground transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <Button
                  onClick={() => {
                    setIsOpen(false)
                    onOpenModal()
                  }}
                  className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  빠른견적요청
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
