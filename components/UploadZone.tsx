'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

interface UploadZoneProps {
  onFilesUploaded: (files: File[]) => void
  onExtractionComplete: (data: any[]) => void
}

export default function UploadZone({ onFilesUploaded, onExtractionComplete }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 2) {
      alert('Please upload a maximum of 2 files')
      return
    }

    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    setIsScanning(true)
    onFilesUploaded(files)

    // Call backend API
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))

    try {
      const response = await fetch('http://localhost:8000/api/analyze-birth-record', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      console.log('Analysis result:', result)
      onExtractionComplete(result.data || [])
      // Handle the result - could update state or show extracted data
    } catch (error) {
      console.error('Error analyzing files:', error)
      onExtractionComplete([])
    }

    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className="glassmorphism p-8 h-96 flex flex-col items-center justify-center relative overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isScanning && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 380 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute top-0 left-0 right-0 h-1 bg-cosmic-gold shadow-lg"
          style={{
            boxShadow: '0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 60px #FFD700'
          }}
        />
      )}

      <motion.div
        animate={isScanning ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: isScanning ? Infinity : 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-xl font-playfair text-cosmic-gold mb-2">
          {isScanning ? 'Scanning Birth Records' : 'Upload Birth Records'}
        </h3>
        <p className="text-gray-300 mb-6">
          {isScanning
            ? 'AI extracting birth details...'
            : 'Drag & drop photos or PDFs of hospital records, horoscopes, or birth certificates'
          }
        </p>

        {!isScanning && (
          <div className="flex gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-cosmic-gold text-obsidian px-6 py-3 rounded-full font-semibold hover:cosmic-glow transition-all"
            >
              Browse Files
            </button>
            <div
              className={`border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer ${
                isDragOver
                  ? 'border-cosmic-gold bg-cosmic-gold/10'
                  : 'border-white/30 hover:border-white/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p className="text-sm text-gray-400">Or drag files here</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}