"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  currentImage?: string
  className?: string
}

export function ImageUpload({ onImageUpload, currentImage, className = "" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      handleFileUpload(imageFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file)
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)

    try {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // For demo purposes, we'll use a placeholder URL
      // In production, you would upload to a service like Supabase Storage
      const placeholderUrl = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(file.name)}`
      onImageUpload(placeholderUrl)

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = () => {
    setPreview(null)
    onImageUpload("")
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence>
        {preview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
              <Image src={preview || "/placeholder.svg"} alt="Product preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              relative w-full h-48 border-2 border-dashed rounded-lg transition-all duration-200
              ${
                isDragging
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-950/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-teal-400 dark:hover:border-teal-500"
              }
              ${isUploading ? "pointer-events-none opacity-50" : "cursor-pointer"}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />

            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center p-6">
              <motion.div
                animate={isUploading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: isUploading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${isDragging ? "bg-teal-100 dark:bg-teal-900" : "bg-gray-100 dark:bg-gray-800"}
                `}
              >
                {isUploading ? (
                  <Upload className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                )}
              </motion.div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {isUploading ? "Uploading..." : isDragging ? "Drop image here" : "Drag & drop an image"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{!isUploading && "or click to browse"}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
