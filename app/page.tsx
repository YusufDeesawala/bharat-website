"use client"

import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { HeroSection } from "@/components/hero-section"
import { UserDetailsModal } from "@/components/user-details-modal"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [showUserModal, setShowUserModal] = useState(false)

  useEffect(() => {
    const hasProvidedDetails = localStorage.getItem("user-details-provided")
    if (!hasProvidedDetails) {
      setShowUserModal(true)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <CategoryFilter />
          </aside>
          <main className="flex-1">
            <ProductGrid />
          </main>
        </div>
      </div>

      <UserDetailsModal isOpen={showUserModal} onClose={() => setShowUserModal(false)} />
    </div>
  )
}
