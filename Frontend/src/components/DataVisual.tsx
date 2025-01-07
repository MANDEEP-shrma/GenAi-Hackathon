import { BarChart, PieChart, TrendingUp } from 'lucide-react';

export default function DataVisual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-700/20">
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="w-5 h-5 text-purple-300" />
          <h3 className="font-semibold text-white">Engagement Metrics</h3>
        </div>
        <div className="h-40 flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-700/20">
          <p className="text-purple-300 p-2">Engagement visualization will appear here</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-700/20">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-purple-300" />
          <h3 className="font-semibold text-white">Audience Demographics</h3>
        </div>
        <div className="h-40 flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-700/20">
          <p className="text-purple-300 p-2">Demographics data will appear here</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-700/20 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-300" />
          <h3 className="font-semibold text-white">Growth Trends</h3>
        </div>
        <div className="h-40 flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-700/20">
          <p className="text-purple-300">Growth trend analysis will appear here</p>
        </div>
      </div>
    </div>
  );
}