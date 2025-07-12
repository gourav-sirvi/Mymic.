import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Play,
  Download,
  Star,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();

  const recentSummaries = [
    { 
      id: '1', 
      title: 'Physics Chapter 5 - Motion', 
      teacher: 'Dr. Smith', 
      duration: '23:45', 
      difficulty: 'Medium',
      completed: true,
      score: 92
    },
    { 
      id: '2', 
      title: 'Mathematics - Calculus Basics', 
      teacher: 'Prof. Johnson', 
      duration: '31:20', 
      difficulty: 'Hard',
      completed: false,
      score: null
    },
    { 
      id: '3', 
      title: 'Chemistry - Atomic Structure', 
      teacher: 'Dr. Wilson', 
      duration: '27:15', 
      difficulty: 'Easy',
      completed: true,
      score: 88
    },
  ];

  const achievements = [
    { name: 'Quick Learner', icon: Zap, earned: true, description: 'Complete 5 summaries in a day' },
    { name: 'Consistent', icon: Target, earned: true, description: 'Study 7 days in a row' },
    { name: 'High Scorer', icon: Trophy, earned: false, description: 'Score 95% or higher' },
    { name: 'Quiz Master', icon: Award, earned: true, description: 'Complete 10 quizzes' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Continue your learning journey with the latest summaries.
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{user?.xp || 0} XP</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Level {user?.level || 1}</div>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Summaries Read</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +3 this week
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Score</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">89%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +5% from last week
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Study Streak</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12 days</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              Keep it up!
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Spent</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24.5h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This month
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Summaries */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Summaries</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentSummaries.map((summary) => (
                  <div key={summary.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${summary.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
                          <Play className={`h-4 w-4 ${summary.completed ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{summary.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {summary.teacher} • {summary.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            summary.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                            summary.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
                            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                          }`}>
                            {summary.difficulty}
                          </span>
                        </div>
                        {summary.completed && summary.score && (
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{summary.score}%</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Link
                          to={`/student/summary/${summary.id}`}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors duration-200"
                        >
                          {summary.completed ? 'Review' : 'Study'}
                        </Link>
                        <Link
                          to={`/student/flashcards/${summary.id}`}
                          className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md transition-colors duration-200"
                        >
                          Flashcards
                        </Link>
                        <Link
                          to={`/student/quiz/${summary.id}`}
                          className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md transition-colors duration-200"
                        >
                          Quiz
                        </Link>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements & Level Progress */}
          <div className="space-y-6">
            {/* Level Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Level Progress</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Level {user?.level || 1}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{user?.xp || 0} / 2000 XP</div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${((user?.xp || 0) / 2000) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {2000 - (user?.xp || 0)} XP to next level
              </p>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned 
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' 
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        achievement.earned 
                          ? 'text-yellow-600 dark:text-yellow-400' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          achievement.earned 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}