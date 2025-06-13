import { MessageCircle } from "lucide-react"

const Header = () => {
  return (
    <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 animate-pulse-glow">
                <MessageCircle className="w-10 h-10 text-white"/>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-4">
            IKN Tweet Sentiment Analyzer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Analyze sentiment of tweets about Indonesia new capital city using advanced ML algorithms
          </p>
        </header>
    </div>
  )
}

export default Header