import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Play,
  Settings,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function TeacherDashboard() {
  const { user } = useAuth();

  const recentRecordings = [
    { id: '1', title: 'Physics Chapter 5 - Motion', duration: '23:45', students: 28, date: '2024-01-15' },
    { id: '2', title: 'Mathematics - Calculus Basics', duration: '31:20', students: 25, date: '2024-01-14' },
    { id: '3', title: 'Chemistry - Atomic Structure', duration: '27:15', students: 30, date: '2024-01-13' },
  ];

  const classStats = [
    { name: 'Physics 201', students: 28, avgScore: 87, struggling: 3 },
    { name: 'Math 101', students: 25, avgScore: 92, struggling: 1 },
    { name: 'Chemistry 301', students: 30, avgScore: 78, struggling: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening in your classroom today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link
            to="/teacher/record"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <Mic className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">Start Recording</h3>
                <p className="text-blue-100 text-sm">Create new summary</p>
              </div>
            </div>
          </Link>

          <Link
            to="/teacher/classroom"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">Manage Classes</h3>
                <p className="text-purple-100 text-sm">View & organize</p>
              </div>
            </div>
          </Link>

          <Link
            to="/teacher/insights"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">Student Insights</h3>
                <p className="text-emerald-100 text-sm">Progress tracking</p>
              </div>
            </div>
          </Link>

          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">Smart Mic</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-100 text-sm">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">83</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +5 this week
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Recordings</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">127</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +12 this month
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Engagement</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">94%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +2% from last week
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Recording Time</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45.2h</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              This month
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Recordings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Recordings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentRecordings.map((recording) => (
                  <div key={recording.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{recording.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {recording.duration} • {recording.students} students
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{recording.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/teacher/recordings"
                className="block mt-4 text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                View All Recordings
              </Link>
            </div>
          </div>

          {/* Class Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Class Performance</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {classStats.map((cls, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">{cls.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{cls.students} students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Avg: {cls.avgScore}%</span>
                      </div>
                      {cls.struggling > 0 && (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-yellow-600 dark:text-yellow-400">
                            {cls.struggling} need help
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Device Status */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Microphone Status</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Connected via Bluetooth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Battery: 89%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Signal: Strong</span>
                </div>
              </div>
            </div>
            <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors duration-200">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}