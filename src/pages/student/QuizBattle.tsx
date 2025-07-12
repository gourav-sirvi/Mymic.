import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Clock, 
  Trophy, 
  Zap, 
  Target, 
  CheckCircle, 
  XCircle,
  Star,
  Award,
  RotateCcw,
  Play
} from 'lucide-react';

export default function QuizBattle() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is Newton's First Law of Motion also known as?",
      options: [
        "Law of Acceleration",
        "Law of Inertia", 
        "Law of Gravity",
        "Law of Energy"
      ],
      correct: 1,
      explanation: "Newton's First Law is also called the Law of Inertia because it describes how objects resist changes to their motion.",
      difficulty: "easy",
      points: 100
    },
    {
      id: 2,
      question: "According to Newton's First Law, what happens to an object in motion?",
      options: [
        "It gradually slows down",
        "It speeds up automatically",
        "It stays in motion unless acted upon by a force",
        "It changes direction randomly"
      ],
      correct: 2,
      explanation: "An object in motion will continue moving at the same speed and direction unless an external force acts upon it.",
      difficulty: "medium",
      points: 200
    },
    {
      id: 3,
      question: "Which of these is the best example of inertia?",
      options: [
        "A ball bouncing up and down",
        "Your body moving forward when a car suddenly stops",
        "A magnet attracting metal",
        "Water flowing downhill"
      ],
      correct: 1,
      explanation: "When a car stops suddenly, your body continues moving forward due to inertia - the tendency to resist changes in motion.",
      difficulty: "medium",
      points: 200
    },
    {
      id: 4,
      question: "What type of force is needed to change an object's motion according to Newton's First Law?",
      options: [
        "Balanced force",
        "Unbalanced force",
        "Gravitational force only",
        "Magnetic force only"
      ],
      correct: 1,
      explanation: "An unbalanced force (net force not equal to zero) is required to change an object's state of motion.",
      difficulty: "hard",
      points: 300
    },
    {
      id: 5,
      question: "Why does a hockey puck eventually stop sliding on ice?",
      options: [
        "It runs out of energy",
        "Gravity pulls it down",
        "Friction acts as an external force",
        "It naturally wants to stop"
      ],
      correct: 2,
      explanation: "Friction between the puck and ice acts as an external force that opposes motion, causing the puck to slow down and stop.",
      difficulty: "hard",
      points: 300
    }
  ];

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameFinished && !showResult && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameFinished, showResult, timeLeft]);

  const handleTimeUp = () => {
    setShowResult(true);
    setStreak(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQ.correct) {
      const timeBonus = Math.floor(timeLeft * 2);
      const streakBonus = streak * 50;
      const totalPoints = currentQ.points + timeBonus + streakBonus;
      setScore(prev => prev + totalPoints);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setGameFinished(true);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setGameStarted(false);
    setGameFinished(false);
    setStreak(0);
    setMaxStreak(0);
  };

  const getScoreRating = () => {
    const percentage = (score / (questions.reduce((acc, q) => acc + q.points, 0))) * 100;
    if (percentage >= 90) return { rating: 'Excellent!', color: 'text-green-600', icon: Trophy };
    if (percentage >= 75) return { rating: 'Great!', color: 'text-blue-600', icon: Star };
    if (percentage >= 60) return { rating: 'Good!', color: 'text-yellow-600', icon: Target };
    return { rating: 'Keep Practicing!', color: 'text-gray-600', icon: Award };
  };

  // Start screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Physics Quiz Battle
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Test your knowledge of Newton's Laws of Motion
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {totalQuestions}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Questions</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  30s
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Per Question</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                <Trophy className="h-4 w-4" />
                <span>Earn points for correct answers</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Time bonus for quick answers</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                <Zap className="h-4 w-4" />
                <span>Streak multiplier for consecutive correct answers</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg font-semibold flex items-center space-x-2 mx-auto transition-colors duration-200"
            >
              <Play className="h-5 w-5" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (gameFinished) {
    const { rating, color, icon: RatingIcon } = getScoreRating();
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <RatingIcon className={`h-10 w-10 ${color}`} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Quiz Complete!
              </h1>
              <p className={`text-xl font-semibold ${color}`}>
                {rating}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {score}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {maxStreak}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Best Streak</div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Breakdown</h3>
              <div className="space-y-2 text-sm">
                {questions.map((q, index) => (
                  <div key={q.id} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Question {index + 1}</span>
                    <span className={`font-medium ${
                      selectedAnswer === q.correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {q.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={restartGame}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {score} pts
              </div>
              {streak > 0 && (
                <div className="flex items-center space-x-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">{streak}x streak</span>
                </div>
              )}
            </div>
            <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {timeLeft}s
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentQ.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
              currentQ.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
              'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
            }`}>
              {currentQ.difficulty} • {currentQ.points} pts
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {currentQ.question}
          </h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showResult
                    ? index === currentQ.correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (
                    <div>
                      {index === currentQ.correct && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {index === selectedAnswer && index !== currentQ.correct && <XCircle className="h-5 w-5 text-red-600" />}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Explanation</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200"
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}