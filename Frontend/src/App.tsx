import { useState } from 'react';
import { LineChart, Sparkles, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Bot from './components/Bot';
import DataVisual from './components/DataVisual';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="w-8 h-8 text-purple-300" />
              <h1 className="text-xl font-bold text-white">SocialMetrics AI</h1>
            </div>
            <nav>
              <ul className="flex gap-8">
                <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-800/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-300 mr-2" />
              <span className="text-purple-200">AI-Powered Social Media Analytics</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Transform Your Social Media <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                Into Actionable Insights
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-purple-200">
              Harness the power of AI to understand your audience, track engagement, 
              and grow your social media presence with data-driven decisions.
            </p>

            <button
              onClick={() => setShowDashboard(true)}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-purple-700/20">
              <div className="w-12 h-12 rounded-lg bg-purple-400/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
              <p className="text-purple-200">Get instant AI-powered insights about your social media performance</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-purple-700/20">
              <div className="w-12 h-12 rounded-lg bg-purple-400/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Audience Insights</h3>
              <p className="text-purple-200">Understand your audience demographics and engagement patterns</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-purple-700/20">
              <div className="w-12 h-12 rounded-lg bg-purple-400/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Growth Tracking</h3>
              <p className="text-purple-200">Monitor your growth and track performance metrics in real-time</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="w-8 h-8 text-purple-300" />
              <h1 className="text-xl font-bold text-white">SocialMetrics AI</h1>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li><a href="#" className="text-purple-200 hover:text-white">Dashboard</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white">Settings</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white">Support</a></li>
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
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-700/20">
              <h2 className="text-2xl font-bold text-white mb-2">Real-time Analytics</h2>
              <p className="text-purple-200">
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