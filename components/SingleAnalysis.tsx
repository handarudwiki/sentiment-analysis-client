'use client'

import { ModelType } from '@/types';
import { fetchApi } from '@/utils';
import { BarChart3, Edit3, Info } from 'lucide-react';
import React, { useState } from 'react'

interface SingleAnalysisProps {
    selectedModel: ModelType;
}

const SingleAnalysis = ({selectedModel}:SingleAnalysisProps) => {
    const [tweetText, setTweetText] =useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState(null)

      const analyzeTweet = async () => {
    if (!tweetText.trim()) {
      alert('Please enter a tweet to analyze')
      return
    }

    setIsAnalyzing(true)
    
    try {
      const model = selectedModel == ModelType.naiveBayes ? 'naive-bayes' : 'xgboost'
      const response = await fetchApi(model, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: tweetText }),
      })

      const data = response
      setResult(data)
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

    const getSentimentEmoji = (sentiment:string) => {
    switch (sentiment) {
      case 'positif': return '😊'
      case 'negatif': return '😞'
      default: return '😐'
    }
  }

   const getSentimentColor = (sentiment:string) => {
    switch (sentiment) {
      case 'positif': return 'green'
      case 'negatif': return 'red'
      default: return 'gray'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="glass-card p-8">
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <Edit3 className="w-6 h-6 mr-3 text-blue-400" />
          Input Tweet
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Tweet Text
            </label>
            <textarea
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              rows={4}
              className="w-full p-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
              placeholder="Enter your tweet about IKN here..."
            />
          </div>
          <button
            onClick={analyzeTweet}
            disabled={isAnalyzing}
            className="w-full btn-primary py-4"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="glass-card p-8">
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-green-400" />
          Analysis Results
        </h3>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{getSentimentEmoji(result.result)}</div>
                <h4 className={`text-3xl font-bold text-${getSentimentColor(result.result)}-400 capitalize mb-2`}>
                  {result.result}
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Model Used:</span>
                  <span className="font-medium text-blue-300 capitalize">
                    {selectedModel.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Info className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Enter a tweet to see sentiment analysis results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  
  )
}

export default SingleAnalysis