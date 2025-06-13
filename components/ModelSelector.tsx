import{ ModelType, type Model } from '@/types'
import React from 'react'

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

const ModelSelector = ({selectedModel, onModelChange}:ModelSelectorProps) => {

     const models: Model[] =  [
    {
      id: ModelType.naiveBayes,
      name: 'Naive Bayes',
      description: 'Fast and efficient probabilistic classifier',
      color: 'blue'
    },
    {
      id: ModelType.xgboost,
      name: 'XGBoost',
      description: 'Advanced gradient boosting algorithm',
      color: 'green'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model) => (
            <label key={model.id} className="cursor-pointer">
              <input
                type="radio"
                name="model"
                value={model.id}
                checked={selectedModel === model.id}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => onModelChange(e.target.value as ModelType)}
                className="sr-only"
              />
              <div className={`p-4 rounded-xl bg-gradient-to-r from-${model.color}-500/20 to-${model.color}-600/20 border-2 transition-all duration-300 hover:scale-105 ${
                selectedModel === model.id 
                  ? `border-${model.color}-500` 
                  : 'border-transparent'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-semibold text-${model.color}-300`}>{model.name}</h4>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedModel === model.id 
                      ? `bg-${model.color}-500 border-${model.color}-500` 
                      : 'border-gray-400'
                  }`}></div>
                </div>
                <p className="text-sm text-gray-300">{model.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModelSelector