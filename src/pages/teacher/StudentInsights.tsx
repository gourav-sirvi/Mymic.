import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Target,
  Eye,
  EyeOff,
  Filter,
  Download,
  BarChart3
} from 'lucide-react';

export default function StudentInsights() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [showStrugglingOnly, setShowStrugglingOnly] = useState(false);
  const [timeRange, setTimeRange] = useState('week');

  const classes = [
    { id: 'all', name: 'All Classes' },
    { id: '1', name: 'Physics 201' },
    { id: '2', name: 'Math 101' },
    { id: '3', name: 'Chemistry 301' },
  ];

  const students = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      class: 'Physics 201',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Alice Johnson',
      struggling: false,
      stats: {
        avgScore: 92,
        summariesRead: 15,
        timeSpent: '12.5h',
        lastActive: '2 hours ago',
        engagement: 'high',
        difficulty: 'medium',
        trend: 'up'
      },
      privateNotes: 'Excellent student, shows great understanding of complex concepts.'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      class: 'Math 101',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bob Smith',
      struggling: true,
      stats: {
        avgScore: 68,
        summariesRead: 8,
        timeSpent: '6.2h',
        lastActive: '1 day ago',
        engagement: 'low',
        difficulty: 'easy',
        trend: 'down'
      },
      privateNotes: 'Needs additional support with calculus fundamentals. Consider one-on-one sessions.'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      class: 'Chemistry 301',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Carol Davis',
      struggling: true,
      stats: {
        avgScore: 74,
        summariesRead: 12,
        timeSpent: '9.1h',
        lastActive: '5 hours ago',
        engagement: 'medium',
        difficulty: 'easy',
        trend: 'up'
      },
      privateNotes: 'Improving steadily. Responds well to visual learning aids.'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@example.com',
      class: 'Physics 201',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=David Wilson',
      struggling: false,
      stats: {
        avgScore: 88,
        summariesRead: 18,
        timeSpent: '15.3h',
        lastActive: '1 hour ago',
        engagement: 'high',
        difficulty: 'detailed',
        trend: 'up'
      },
      privateNotes: 'Highly motivated student. Could benefit from advanced materials.'
    },
  ];

  const filteredStudents = students.filter(student => {
    const classMatch = selectedClass === 'all' || student.class === classes.find(c => c.id === selectedClass)?.name;
    const strugglingMatch = !showStrugglingOnly || student.struggling;
    return classMatch && strugglingMatch;
  });

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Student Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Monitor student progress and identify those who need support
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
            </select>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showStrugglingOnly}
                onChange={(e) => setShowStrugglingOnly(e.target.checked)}
                className="text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Show struggling students only</span>
            </label>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredStudents.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Struggling Students</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredStudents.filter(s => s.struggling).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Score</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(filteredStudents.reduce((acc, s) => acc + s.stats.avgScore, 0) / filteredStudents.length)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Students</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredStudents.filter(s => s.stats.engagement !== 'low').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Student Performance</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {student.name}
                          </h3>
                          {student.struggling && (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 text-xs rounded-full">
                              Needs Support
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{student.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(student.stats.trend)}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {student.stats.lastActive}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {student.stats.avgScore}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Average Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {student.stats.summariesRead}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Summaries Read</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {student.stats.timeSpent}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Time Spent</p>
                    </div>
                    <div className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(student.stats.engagement)}`}>
                        {student.stats.engagement.charAt(0).toUpperCase() + student.stats.engagement.slice(1)}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Engagement</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {student.stats.difficulty}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty Level</p>
                    </div>
                  </div>

                  {/* Private Notes Section */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        Private Teacher Notes
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {student.privateNotes}
                    </p>
                    <button className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
                      Edit Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}