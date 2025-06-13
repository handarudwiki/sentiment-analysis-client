'use client'

import AnimatedBackground from "@/components/AnimatedBackground"
import BatchCsvAnalysis from "@/components/BatchCsvAnalysis"
import Header from "@/components/Header"
import ModelSelector from "@/components/ModelSelector"
import SingleAnalysis from "@/components/SingleAnalysis"
import { ModelType } from "@/types"
import { useState } from "react"

const page = () => {

    const [activeTab, setActiveTab]= useState<string>('single')
    const [selectedModel, setSelectedModel] = useState<ModelType>(ModelType.naiveBayes)

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground/>

      <Header/>

      <ModelSelector onModelChange={setSelectedModel} selectedModel={selectedModel}/>

      {/* Main Content */}

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-center space-x-1 glass-card p-2">
            <button
             className={
              `px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                 activeTab === 'single' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('single')
             }
             >Single Tweet Analysis</button>
            <button 
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'batch' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab('batch')}
            >Batch CSV Analysis</button>

          </div>
        </div>
            { activeTab === 'single' && <SingleAnalysis selectedModel={selectedModel}/> }
            {activeTab === 'batch' && <BatchCsvAnalysis selectedModel={selectedModel}/>}
      </div>
    </div>
  )
}

export default page