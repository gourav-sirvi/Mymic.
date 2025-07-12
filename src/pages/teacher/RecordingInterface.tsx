import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Square, Save, Settings, Volume2, Wifi, Battery, Signal, FileText, AudioWaveform as Waveform, Clock, Users, Send } from 'lucide-react';

export default function RecordingInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryStyle, setSummaryStyle] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(89);
  const [signalStrength, setSignalStrength] = useState(4);
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Simulate audio level
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Simulate real-time transcription
  useEffect(() => {
    if (isRecording && !isPaused) {
      const sampleTexts = [
        "Today we're going to discuss the fundamental principles of motion in physics.",
        "Newton's first law states that an object at rest stays at rest and an object in motion stays in motion.",
        "This concept is also known as the law of inertia, which is a crucial foundation for understanding mechanics.",
        "Let's explore how this applies to real-world scenarios and everyday examples.",
        "Consider a ball rolling on a flat surface - without friction, it would continue rolling indefinitely."
      ];
      
      const interval = setInterval(() => {
        if (transcription.split(' ').length < 50) {
          const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
          setTranscription(prev => prev + (prev ? ' ' : '') + randomText);
        }
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isRecording, isPaused, transcription]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setTranscription('');
    setSummary('');
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    generateSummary();
  };

  const generateSummary = () => {
    const summaries = {
      short: "Physics lesson covering Newton's first law of motion and inertia with practical examples.",
      medium: "Today's physics lesson focused on Newton's first law of motion, also known as the law of inertia. We discussed how objects at rest remain at rest and objects in motion continue moving unless acted upon by an external force. The lesson included real-world examples like a rolling ball to illustrate these fundamental principles of mechanics.",
      detailed: "This comprehensive physics lesson provided an in-depth exploration of Newton's first law of motion, fundamentally known as the law of inertia. We began by establishing the core principle that objects at rest will remain at rest, and objects in motion will continue in motion at constant velocity, unless acted upon by an unbalanced external force. The discussion included detailed analysis of real-world applications, such as the behavior of a ball rolling on various surfaces, demonstrating how friction and other forces affect motion. Students learned to identify and analyze different scenarios where inertia plays a crucial role in everyday physics phenomena."
    };
    
    setTimeout(() => {
      setSummary(summaries[summaryStyle]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Smart Recording Studio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Record, transcribe, and create AI-powered summaries for your students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recording Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Device Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Microphone Status</h2>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    deviceConnected ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    <Wifi className={`h-6 w-6 ${
                      deviceConnected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`} />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {deviceConnected ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Battery className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{batteryLevel}%</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Signal className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Strong</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Clear</p>
                </div>
              </div>
            </div>

            {/* Recording Interface */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <button
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white shadow-lg transform hover:scale-105`}
                  >
                    {isRecording ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                  </button>
                  
                  {isRecording && (
                    <div className="absolute -inset-2 border-4 border-red-300 rounded-full animate-ping"></div>
                  )}
                </div>
                
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatTime(recordingTime)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isRecording ? (isPaused ? 'Recording Paused' : 'Recording...') : 'Ready to Record'}
                  </p>
                </div>
              </div>

              {/* Audio Waveform Visualization */}
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-1 h-16 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-full transition-all duration-100"
                      style={{
                        width: '2px',
                        height: isRecording && !isPaused 
                          ? `${Math.random() * audioLevel + 10}%` 
                          : '10%'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Recording Controls */}
              <div className="flex items-center justify-center space-x-4">
                {isRecording && (
                  <button
                    onClick={handlePauseRecording}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  </button>
                )}
                
                <button
                  onClick={handleStopRecording}
                  disabled={!isRecording}
                  className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors duration-200"
                >
                  <Square className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Real-time Transcription */}
            {transcription && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Live Transcription
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Live</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {transcription}
                    {isRecording && !isPaused && (
                      <span className="inline-block w-2 h-5 bg-blue-500 ml-1 animate-pulse"></span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Summary and Settings */}
          <div className="space-y-6">
            {/* Summary Style Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary Style</h3>
              <div className="space-y-3">
                {[
                  { value: 'short', label: 'Short', desc: 'Brief overview' },
                  { value: 'medium', label: 'Medium', desc: 'Balanced detail' },
                  { value: 'detailed', label: 'Detailed', desc: 'Comprehensive' }
                ].map((style) => (
                  <label key={style.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="summaryStyle"
                      value={style.value}
                      checked={summaryStyle === style.value}
                      onChange={(e) => setSummaryStyle(e.target.value as any)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{style.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{style.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            {summary && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Summary</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <p className="text-gray-900 dark:text-white leading-relaxed">{summary}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                    <Send className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatTime(recordingTime)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Words</span>
                  <span className="font-medium text-gray-900 dark:text-white">{transcription.split(' ').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quality</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}