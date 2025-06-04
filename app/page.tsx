

const page = () => {
  return (
   <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 2s;"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 4s;"></div>
        </div>
    </div>

    <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 animate-pulse-glow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                IKN Tweet Sentiment Analyzer
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Analyze sentiment of tweets about Indonesia new capital city using advanced ML algorithms
            </p>
        </header>
        <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Model</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="cursor-pointer">
                        <input type="radio" name="model" value="naive_bayes" className="sr-only model-radio" checked/>
                        <div className="model-card p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-2 border-blue-500 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-blue-300">Naive Bayes</h4>
                                <div className="w-4 h-4 rounded-full border-2 border-blue-500 radio-indicator bg-blue-500"></div>
                            </div>
                            <p className="text-sm text-gray-300">Fast and efficient probabilistic classifier</p>
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" name="model" value="xgboost" className="sr-only model-radio"/>
                        <div className="model-card p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 border-2 border-transparent transition-all duration-300 hover:scale-105">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-green-300">XGBoost</h4>
                                <div className="w-4 h-4 rounded-full border-2 border-gray-400 radio-indicator"></div>
                            </div>
                            <p className="text-sm text-gray-300">Advanced gradient boosting algorithm</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-center space-x-1 bg-white/10 backdrop-blur-lg rounded-2xl p-2">
                    <button className="tab-btn px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-blue-500 text-white" data-tab="single">
                        Single Tweet Analysis
                    </button>
                    <button className="tab-btn px-6 py-3 rounded-xl font-medium transition-all duration-300 text-gray-300 hover:text-white" data-tab="batch">
                        Batch CSV Analysis
                    </button>
                </div>
            </div>

            <div id="single-tab" className="tab-content">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-semibold mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                            Input Tweet
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Tweet Text</label>
                                <textarea id="tweet-input" rows="4" className="w-full p-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none" placeholder="Enter your tweet about IKN here..."></textarea>
                            </div>
                            <button id="analyze-btn" className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:transform-none">
                                <span className="analyze-text">Analyze Sentiment</span>
                                <span className="loading-text hidden">Analyzing...</span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-semibold mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Analysis Results
                        </h3>
                        <div id="single-results" className="space-y-4">
                            <div className="text-center text-gray-400 py-8">
                                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p>Enter a tweet to see sentiment analysis results</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="batch-tab" className="tab-content hidden">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Batch CSV Analysis
                    </h3>
                    
                    <div className="mb-8">
                        <div id="drop-zone" className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors duration-300 cursor-pointer">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-xl mb-2">Drop your CSV file here</p>
                            <p className="text-gray-400 mb-4">or click to browse</p>
                            <input type="file" id="csv-input" accept=".csv" className="hidden"/>
                            <button id="browse-btn" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300">
                                Browse Files
                            </button>
                        </div>
                        <div id="file-info" className="hidden mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                            <p className="text-green-300">File selected: <span id="file-name"></span></p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <button id="process-csv-btn" className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:transform-none" disabled>
                            <span className="process-text">Process CSV File</span>
                            <span className="processing-text hidden">Processing...</span>
                        </button>
                    </div>
                    <div id="batch-results" className="hidden">
                        <h4 className="text-xl font-semibold mb-4">Analysis Results</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-green-300" id="positive-count">0</div>
                                <div className="text-sm text-gray-300">Positive</div>
                            </div>
                            <div className="bg-gray-500/20 border border-gray-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-gray-300" id="neutral-count">0</div>
                                <div className="text-sm text-gray-300">Neutral</div>
                            </div>
                            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-red-300" id="negative-count">0</div>
                                <div className="text-sm text-gray-300">Negative</div>
                            </div>
                        </div>
                        <button id="download-btn" className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300">
                            Download Results CSV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
  )
}

export default page