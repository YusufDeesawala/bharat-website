"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, User, Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface UserInfo {
  name: string
  email: string
  phone: string
  location: string
  message: string
}

export function UserInfoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check if user has already submitted info
    const hasSubmitted = localStorage.getItem("user_info_submitted")

    // Show modal after a short delay if user hasn't submitted info
    if (!hasSubmitted) {
      // Show modal after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("user_inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error("Error saving user info:", error)
        alert("There was an error saving your information. Please try again.")
      } else {
        localStorage.setItem("user_info_submitted", "true")
        setIsOpen(false)
        alert("Thank you for your interest! We will contact you soon.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("There was an error saving your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSkip = () => {
    localStorage.setItem("user_info_submitted", "true")
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">Welcome to PVC Pro Solutions!</DialogTitle>
                  <Button variant="ghost" size="sm" onClick={handleSkip} className="text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <DialogDescription className="text-base">
                  We'd love to learn more about your needs and how we can help you with premium PVC solutions.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State/Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    How can we help you?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleSkip}>
                    Skip for now
                  </Button>
                </div>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
