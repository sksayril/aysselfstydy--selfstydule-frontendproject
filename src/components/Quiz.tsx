import React, { useState } from 'react';
import { CheckCircle2, XCircle, Timer, Award, ArrowRight, RotateCcw } from 'lucide-react';

// Static quiz data
const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers({});
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Quiz Completed!</h2>
              <p className="text-lg opacity-90">Here's how you performed</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-green-600">Correct Answers</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-red-600">{quizData.length - score}</div>
                  <div className="text-sm text-red-600">Wrong Answers</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600">{Math.round((score / quizData.length) * 100)}%</div>
                  <div className="text-sm text-blue-600">Score</div>
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuizData = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Quiz Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Timer className="w-5 h-5 mr-2" />
                <span>Question {currentQuestion + 1} of {quizData.length}</span>
              </div>
              <div className="flex items-center">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Score: {score}
                </span>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuizData.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuizData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedAnswer
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;