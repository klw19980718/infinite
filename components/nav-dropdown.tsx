"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface SubNavItem {
  title: string
  description?: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  color?: string
}

export interface NavDropdownProps {
  trigger: string | React.ReactNode
  items: SubNavItem[]
  className?: string
  align?: "center" | "start" | "end"
  isActive?: (href: string) => boolean
}

export default function NavDropdown({
  trigger,
  items,
  className = "",
  align = "start",
  isActive,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Detect theme from document
  useEffect(() => {
    setMounted(true)
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"))
    }
    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const width = 320
      setDropdownWidth(width)

      const viewportWidth = window.innerWidth
      const triggerRect = triggerRef.current.getBoundingClientRect()

      const idealLeft = triggerRect.left
      const idealTop = triggerRect.bottom + 8 // mt-2 = 8px

      const minLeft = 16
      const maxLeft = viewportWidth - width - 16

      const adjustedLeft = Math.max(minLeft, Math.min(idealLeft, maxLeft))
      setXOffset(adjustedLeft)
      setYOffset(idealTop)
    }
  }, [isOpen, triggerRef, align])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown when pressing escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  // Handle window resize and scroll
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && triggerRef.current) {
        const width = 320
        setDropdownWidth(width)

        const viewportWidth = window.innerWidth
        const triggerRect = triggerRef.current.getBoundingClientRect()

        const idealLeft = triggerRect.left
        const idealTop = triggerRect.bottom + 8

        const minLeft = 16
        const maxLeft = viewportWidth - width - 16

        const adjustedLeft = Math.max(minLeft, Math.min(idealLeft, maxLeft))
        setXOffset(adjustedLeft)
        setYOffset(idealTop)
      }
    }

    if (isOpen) {
      window.addEventListener("resize", handleResize)
      window.addEventListener("scroll", handleResize, true)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleResize, true)
    }
  }, [isOpen, align])

  const hasActiveItem = items.some((item) => isActive?.(item.href))

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className={`flex items-center gap-1 transition-colors ${
          isOpen || hasActiveItem
            ? "text-primary"
            : "text-foreground/70 hover:text-primary"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`fixed z-[100] p-6 rounded-2xl shadow-lg border
                  ${isDarkMode ? "bg-[#4a4a4a] border-[#5a5a5a]" : "bg-card border-border"}`}
                style={{
                  width: `${dropdownWidth}px`,
                  maxWidth: "calc(100vw - 2rem)",
                  left: `${xOffset}px`,
                  top: `${yOffset}px`,
                }}
                onMouseLeave={closeDropdown}
              >
            <div className="space-y-4">
              {items.map((item, itemIndex) => {
                const active = isActive?.(item.href) || false
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * itemIndex }}
                    key={itemIndex}
                  >
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 group"
                      onClick={closeDropdown}
                    >
                      {item.icon && (
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                            item.color || "bg-primary/10 dark:bg-primary/20"
                          } shadow-sm group-hover:shadow-md transition-all duration-200`}
                        >
                          <item.icon className={`w-5 h-5 ${
                            item.color ? "text-white" : "text-primary"
                          }`} />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3
                          className={`text-sm font-medium transition-colors duration-200 ${
                            active
                              ? "text-primary"
                              : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
        )}
    </div>
  )
}

