import React from 'react';
import { LineChart } from 'lucide-react';
import Bot from './components/Bot';
import DataVisual from './components/DataVisual';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">SocialMetrics AI</h1>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Bot */}
          <div className="h-[calc(100vh-12rem)]">
            <Bot />
          </div>

          {/* Right Column - Data Visualization */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Real-time Social Media Analytics</h2>
              <p className="text-gray-600">
                Get instant insights into your social media performance with our AI-powered analytics platform.
                Ask questions naturally and receive detailed analysis of your data.
              </p>
            </div>
            <DataVisual />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;