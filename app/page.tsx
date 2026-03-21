'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from '../components/Header'
import UploadZone from '../components/UploadZone'
import ProcessingStatus from '../components/ProcessingStatus'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [extractedData, setExtractedData] = useState<any[]>([])

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files)
    setIsProcessing(true)
    setExtractedData([])
    // The API call is now in UploadZone
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/generate-kundali', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'kundali.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-playfair text-cosmic-gold mb-4">
            Astral Nexus
          </h1>
          <p className="text-xl text-gray-300 font-inter">
            AI-Native Vedic Astrology Platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <UploadZone onFilesUploaded={handleFilesUploaded} onExtractionComplete={handleExtractionComplete} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProcessingStatus isProcessing={isProcessing} files={uploadedFiles} extractedData={extractedData} onGeneratePDF={handleGeneratePDF} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <Dashboard />
        </motion.div>
      </main>
    </div>
  )
}