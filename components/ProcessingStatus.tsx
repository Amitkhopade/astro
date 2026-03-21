'use client'

import { motion } from 'framer-motion'

interface ProcessingStatusProps {
  isProcessing: boolean
  files: File[]
  extractedData?: any[]
  onGeneratePDF?: (data: any) => void
}

export default function ProcessingStatus({ isProcessing, files, extractedData = [], onGeneratePDF }: ProcessingStatusProps) {
  return (
    <div className="glassmorphism p-8 h-96">
      <h3 className="text-xl font-playfair text-cosmic-gold mb-6">AI Processing Status</h3>

      {isProcessing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cosmic-gold border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-300 mb-2">Analyzing {files.length} file{files.length > 1 ? 's' : ''}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Extracting text...</span>
              <span>✓</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Identifying birth details...</span>
              <span>⟳</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Generating Kundali...</span>
              <span>○</span>
            </div>
          </div>
        </motion.div>
      ) : extractedData.length > 0 ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-4">✅</div>
          <p className="text-green-400 mb-4">Extraction Complete!</p>
          <div className="text-left bg-white/5 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Extracted Birth Details:</h4>
            {extractedData.map((item, index) => (
              <div key={index} className="mb-2">
                <p><strong>Name:</strong> {item.extracted_data?.name || 'N/A'}</p>
                <p><strong>DOB:</strong> {item.extracted_data?.dob || 'N/A'}</p>
                <p><strong>TOB:</strong> {item.extracted_data?.tob || 'N/A'}</p>
                <p><strong>Place:</strong> {item.extracted_data?.place || 'N/A'}</p>
              </div>
            ))}
          </div>
          <button 
            className="bg-cosmic-gold text-obsidian px-6 py-3 rounded-full font-semibold hover:cosmic-glow transition-all"
            onClick={() => onGeneratePDF && onGeneratePDF(extractedData[0]?.extracted_data)}
          >
            Generate Kundali PDF
          </button>
        </motion.div>
      ) : (
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4">📋</div>
          <p>Upload birth records to begin AI analysis</p>
        </div>
      )}
    </div>
  )
}