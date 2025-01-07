import { BarChart, PieChart, TrendingUp } from 'lucide-react';

export default function DataVisual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Engagement Metrics</h3>
        </div>
        <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Engagement visualization will appear here</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Audience Demographics</h3>
        </div>
        <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Demographics data will appear here</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Growth Trends</h3>
        </div>
        <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Growth trend analysis will appear here</p>
        </div>
      </div>
    </div>
  );
}