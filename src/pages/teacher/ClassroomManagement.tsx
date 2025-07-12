import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  UserPlus, 
  Settings,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical
} from 'lucide-react';

export default function ClassroomManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const classes = [
    {
      id: '1',
      name: 'Physics 201',
      subject: 'Physics',
      students: 28,
      activeStudents: 25,
      strugglingStudents: 3,
      lastActivity: '2 hours ago',
      description: 'Advanced Physics - Mechanics and Thermodynamics',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Math 101',
      subject: 'Mathematics',
      students: 25,
      activeStudents: 24,
      strugglingStudents: 1,
      lastActivity: '1 hour ago',
      description: 'Introduction to Calculus',
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Chemistry 301',
      subject: 'Chemistry',
      students: 30,
      activeStudents: 27,
      strugglingStudents: 5,
      lastActivity: '3 hours ago',
      description: 'Organic Chemistry Fundamentals',
      color: 'bg-emerald-500'
    },
  ];

  const students = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'active', progress: 92, struggling: false },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'active', progress: 78, struggling: true },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com', status: 'inactive', progress: 65, struggling: true },
    { id: '4', name: 'David Wilson', email: 'david@example.com', status: 'active', progress: 88, struggling: false },
  ];

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Classroom Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your classes and track student progress
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Create Class</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Classes List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Classes</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedClass === cls.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedClass(cls.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${cls.color}`}></div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {cls.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {cls.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {cls.students}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Total Students</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {cls.activeStudents}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <AlertCircle className="h-4 w-4 text-yellow-600 mr-1" />
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {cls.strugglingStudents}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Need Help</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="h-4 w-4 text-purple-600 mr-1" />
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {cls.lastActivity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Last Activity</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Class Details Sidebar */}
          <div className="space-y-6">
            {selectedClass ? (
              <>
                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                      <UserPlus className="h-4 w-4" />
                      <span>Add Students</span>
                    </button>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                      <BookOpen className="h-4 w-4" />
                      <span>Share Summary</span>
                    </button>
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                      <Settings className="h-4 w-4" />
                      <span>Class Settings</span>
                    </button>
                  </div>
                </div>

                {/* Students List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Students</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                              alt={student.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {student.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {student.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              student.struggling ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {student.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <p>Select a class to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Class Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowCreateModal(false)}></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Class</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Physics 201"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Physics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Brief description of the class"
                  ></textarea>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}