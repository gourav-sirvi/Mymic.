import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import ClassroomManagement from './pages/teacher/ClassroomManagement';
import RecordingInterface from './pages/teacher/RecordingInterface';
import StudentInsights from './pages/teacher/StudentInsights';
import SummaryView from './pages/student/SummaryView';
import FlashcardPage from './pages/student/FlashcardPage';
import QuizBattle from './pages/student/QuizBattle';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import NotificationCenter from './components/NotificationCenter';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {user && <Navbar />}
      <NotificationCenter />
      
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} />} />
        <Route path="/forgot-password" element={!user ? <ForgotPasswordPage /> : <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher" element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } />
        <Route path="/teacher/classroom" element={
          <ProtectedRoute role="teacher">
            <ClassroomManagement />
          </ProtectedRoute>
        } />
        <Route path="/teacher/record" element={
          <ProtectedRoute role="teacher">
            <RecordingInterface />
          </ProtectedRoute>
        } />
        <Route path="/teacher/insights" element={
          <ProtectedRoute role="teacher">
            <StudentInsights />
          </ProtectedRoute>
        } />
        
        {/* Student Routes */}
        <Route path="/student" element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/summary/:id" element={
          <ProtectedRoute role="student">
            <SummaryView />
          </ProtectedRoute>
        } />
        <Route path="/student/flashcards/:id" element={
          <ProtectedRoute role="student">
            <FlashcardPage />
          </ProtectedRoute>
        } />
        <Route path="/student/quiz/:id" element={
          <ProtectedRoute role="student">
            <QuizBattle />
          </ProtectedRoute>
        } />
        
        {/* Shared Routes */}
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        
        {/* Default Redirects */}
        <Route path="/" element={
          user ? (
            <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <AppContent />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;