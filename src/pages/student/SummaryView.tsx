import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, Download, BookOpen, MessageCircle, ThumbsUp, ThumbsDown, Volume2, VolumeX, RotateCcw, Lightbulb, HelpCircle, Highlighter as Highlight, FileText, Clock, User } from 'lucide-react';

export default function SummaryView() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1425); // 23:45 in seconds
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'detailed'>('medium');
  const [showCluelessMode, setShowCluelessMode] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const summaryData = {
    id: id,
    title: 'Physics Chapter 5 - Motion',
    teacher: 'Dr. Smith',
    date: '2024-01-15',
    duration: '23:45',
    difficulty: 'Medium',
    transcription: `Today we're going to discuss the fundamental principles of motion in physics. Newton's first law states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This concept is also known as the law of inertia, which is a crucial foundation for understanding mechanics. Let's explore how this applies to real-world scenarios and everyday examples. Consider a ball rolling on a flat surface - without friction, it would continue rolling indefinitely. However, in reality, friction and air resistance act as external forces that gradually slow down the ball until it comes to rest.`,
    summaries: {
      easy: "Newton's first law says things that aren't moving stay still, and things that are moving keep moving unless something stops them. It's like when you roll a ball - it keeps going until something makes it stop.",
      medium: "Today's physics lesson focused on Newton's first law of motion, also known as the law of inertia. We discussed how objects at rest remain at rest and objects in motion continue moving unless acted upon by an external force. The lesson included real-world examples like a rolling ball to illustrate these fundamental principles of mechanics.",
      detailed: "This comprehensive physics lesson provided an in-depth exploration of Newton's first law of motion, fundamentally known as the law of inertia. We began by establishing the core principle that objects at rest will remain at rest, and objects in motion will continue in motion at constant velocity, unless acted upon by an unbalanced external force. The discussion included detailed analysis of real-world applications, such as the behavior of a ball rolling on various surfaces, demonstrating how friction and other forces affect motion. Students learned to identify and analyze different scenarios where inertia plays a crucial role in everyday physics phenomena."
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
    }
  };

  const handleFeedback = (type: 'helpful' | 'confusing') => {
    // Handle feedback submission
    console.log(`Feedback: ${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {summaryData.title}
              </h1>
              <div className="flex items-center space-x-4 mt-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{summaryData.teacher}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{summaryData.duration}</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                  {summaryData.difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{formatTime(currentTime)}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Difficulty Level Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary Difficulty</h3>
          <div className="flex space-x-4">
            {[
              { value: 'easy', label: 'Easy', desc: 'Simple explanations' },
              { value: 'medium', label: 'Medium', desc: 'Balanced detail' },
              { value: 'detailed', label: 'Detailed', desc: 'Comprehensive' }
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => setDifficultyLevel(level.value as any)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                  difficultyLevel === level.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <p className="font-medium text-gray-900 dark:text-white">{level.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{level.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              AI Summary
            </h3>
            <button
              onClick={() => setShowCluelessMode(!showCluelessMode)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <HelpCircle className="h-4 w-4" />
              <span>I don't get this</span>
            </button>
          </div>
          
          <div 
            className="prose dark:prose-invert max-w-none"
            onMouseUp={handleTextSelection}
          >
            <p className="text-gray-900 dark:text-white leading-relaxed text-lg">
              {summaryData.summaries[difficultyLevel]}
            </p>
          </div>

          {/* Clueless Mode */}
          {showCluelessMode && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Simplified Explanation</h4>
              </div>
              <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                Think of it like this: Imagine you're sitting in a car. When the car suddenly stops, your body keeps moving forward. That's inertia! Your body wants to keep moving even though the car stopped.
              </p>
              <p className="text-yellow-700 dark:text-yellow-300">
                <strong>Example:</strong> When you slide a book across a table, it eventually stops because of friction. Without friction, it would keep sliding forever!
              </p>
            </div>
          )}

          {/* Text Selection Actions */}
          {selectedText && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800 dark:text-blue-300">
                  Selected: "{selectedText.substring(0, 50)}..."
                </span>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200">
                    <Highlight className="h-3 w-3 inline mr-1" />
                    Highlight
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200">
                    <MessageCircle className="h-3 w-3 inline mr-1" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Full Transcription */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Full Transcription
            </h3>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {summaryData.transcription}
            </p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How was this summary?</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleFeedback('helpful')}
              className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful</span>
            </button>
            <button
              onClick={() => handleFeedback('confusing')}
              className="flex items-center space-x-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-300 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>Confusing</span>
            </button>
          </div>
          
          <div className="mt-4">
            <textarea
              placeholder="Ask a question or share your thoughts about this summary..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={3}
            ></textarea>
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Send Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}