'use client'

import { ModelType } from "@/types";
import { Download, FileText, Upload } from "lucide-react";
import React, { useRef, useState } from "react";

interface BatchCsvAnalysisProps {
    selectedModel: ModelType;
}

const BatchCsvAnalysis = ({selectedModel}:BatchCsvAnalysisProps) => {
const [csvFile, setCsvFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]!
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file)
    } else {
      alert('Please select a CSV file')
    }
  }

  const handleDrop = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file)
    } else {
      alert('Please select a CSV file')
    }
  }

  const handleDragOver = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
  }

  const processCsvFile = async () => {
    if (!csvFile) return

    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      formData.append('file', csvFile)
      formData.append('model', selectedModel)

      const response = await fetch('/api/batch', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Processing failed')
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Processing failed:', error)
      alert('Processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResults = () => {
    if (!results) return

    const csvContent = "data:text/csv;charset=utf-8," + 
      "tweet,sentiment,confidence\n" +
      results.data.map(row => `"${row.tweet}","${row.sentiment}",${row.confidence}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "sentiment_analysis_results.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-semibold mb-6 flex items-center">
        <FileText className="w-6 h-6 mr-3 text-purple-400" />
        Batch CSV Analysis
      </h3>
      
      {/* File Upload */}
      <div className="mb-8">
        <div 
          className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors duration-300 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl mb-2">Drop your CSV file here</p>
          <p className="text-gray-400 mb-4">or click to browse</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300">
            Browse Files
          </button>
        </div>
        
        {csvFile && (
          <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
            <p className="text-green-300">
              File selected: <span className="font-medium">{csvFile.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Process Button */}
      <div className="mb-8">
        <button
          onClick={processCsvFile}
          disabled={!csvFile || isProcessing}
          className="w-full btn-secondary py-4"
        >
          {isProcessing ? 'Processing...' : 'Process CSV File'}
        </button>
      </div>

      {/* Batch Results */}
      {results && (
        <div>
          <h4 className="text-xl font-semibold mb-4">Analysis Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-300">
                {results.summary.positive}
              </div>
              <div className="text-sm text-gray-300">Positive</div>
            </div>
            <div className="bg-gray-500/20 border border-gray-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-300">
                {results.summary.neutral}
              </div>
              <div className="text-sm text-gray-300">Neutral</div>
            </div>
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-300">
                {results.summary.negative}
              </div>
              <div className="text-sm text-gray-300">Negative</div>
            </div>
          </div>
          <button
            onClick={downloadResults}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Results CSV
          </button>
        </div>
      )}
    </div>
  )
}

export default BatchCsvAnalysis