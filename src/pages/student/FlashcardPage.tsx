import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  CheckCircle, 
  XCircle,
  Shuffle,
  BookOpen,
  Brain,
  Target
} from 'lucide-react';

export default function FlashcardPage() {
  const { id } = useParams();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [correctCards, setCorrectCards] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const flashcards = [
    {
      id: 1,
      front: "What is Newton's First Law of Motion?",
      back: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
      explanation: "This is also known as the law of inertia. It explains why you feel pushed back in your seat when a car accelerates, or why you continue moving forward when a car suddenly stops.",
      difficulty: "medium"
    },
    {
      id: 2,
      front: "What is inertia?",
      back: "The tendency of an object to resist changes in its state of motion.",
      explanation: "Inertia is why it's harder to start pushing a heavy box than to keep it moving once it's already in motion. The more massive an object is, the more inertia it has.",
      difficulty: "easy"
    },
    {
      id: 3,
      front: "Give an example of Newton's First Law in everyday life",
      back: "When you're in a car that suddenly stops, your body continues moving forward due to inertia.",
      explanation: "This is why seatbelts are important - they provide the external force needed to stop your body's motion along with the car.",
      difficulty: "easy"
    },
    {
      id: 4,
      front: "What is an unbalanced force?",
      back: "A force that causes a change in an object's motion because the net force is not zero.",
      explanation: "When forces are balanced (equal and opposite), there's no change in motion. When they're unbalanced, acceleration occurs in the direction of the net force.",
      difficulty: "hard"
    },
    {
      id: 5,
      front: "Why does a ball eventually stop rolling on a flat surface?",
      back: "Due to friction and air resistance acting as external forces that oppose the motion.",
      explanation: "Without these forces, the ball would continue rolling indefinitely according to Newton's First Law. In space, objects can travel for millions of years without stopping.",
      difficulty: "medium"
    }
  ];

  const currentFlashcard = flashcards[currentCard];
  const progress = ((studiedCards.size) / flashcards.length) * 100;
  const accuracy = studiedCards.size > 0 ? (correctCards.size / studiedCards.size) * 100 : 0;

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(prev => new Set([...prev, currentCard]));
    }
  };

  const handleKnowCard = (known: boolean) => {
    if (known) {
      setCorrectCards(prev => new Set([...prev, currentCard]));
    }
    handleNext();
  };

  const shuffleCards = () => {
    // In a real app, this would shuffle the flashcards array
    setCurrentCard(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
    setCorrectCards(new Set());
    setShowResults(false);
  };

  const resetSession = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
    setCorrectCards(new Set());
    setShowResults(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Great Job!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                You've completed the flashcard session
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {flashcards.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Cards Studied</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {correctCards.size}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Known Cards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {Math.round(accuracy)}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetSession}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Study Again
              </button>
              <button
                onClick={shuffleCards}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
              >
                <Shuffle className="h-4 w-4" />
                <span>Shuffle & Restart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Physics Flashcards
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Master the concepts with interactive flashcards
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Card {currentCard + 1} of {flashcards.length}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{studiedCards.size}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Studied</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-2">
              <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{correctCards.size}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Known</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(accuracy)}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <div 
            className="relative w-full h-96 cursor-pointer"
            onClick={handleFlip}
          >
            <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentFlashcard.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                      currentFlashcard.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                    }`}>
                      {currentFlashcard.difficulty}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {currentFlashcard.front}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Click to reveal answer
                  </p>
                </div>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 p-8 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {currentFlashcard.back}
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      <strong>Explanation:</strong> {currentFlashcard.explanation}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentFlashcard.back);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => shuffleCards()}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors duration-200"
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button
              onClick={() => resetSession()}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <span>{currentCard === flashcards.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Know/Don't Know Buttons (only show when flipped) */}
        {isFlipped && (
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => handleKnowCard(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <XCircle className="h-5 w-5" />
              <span>Don't Know</span>
            </button>
            <button
              onClick={() => handleKnowCard(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <CheckCircle className="h-5 w-5" />
              <span>I Know This</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}