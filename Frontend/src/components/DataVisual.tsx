import { BarChart, PieChart, TrendingUp } from 'lucide-react';

export default function DataVisual() {
    const engagementData = [
        { label: 'Mon', likes: 65, comments: 45, shares: 30 },
        { label: 'Tue', likes: 75, comments: 55, shares: 40 },
        { label: 'Wed', likes: 85, comments: 65, shares: 50 },
        { label: 'Thu', likes: 95, comments: 75, shares: 60 },
        { label: 'Fri', likes: 80, comments: 60, shares: 45 },
    ];

    const demographicsData = [
        { label: '18-24', value: 30 },
        { label: '25-34', value: 40 },
        { label: '35-44', value: 20 },
        { label: 'Other', value: 10 },
    ];

    const growthData = [20, 35, 45, 60, 75, 85, 100];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Engagement Metrics */}
            <div className="bg-white/5 backdrop-blur-sm p-6 z-50 mb-9 rounded-lg border border-purple-700/20">
                <div className="flex items-center gap-2 mb-4">
                    <BarChart className="w-5 h-5 text-purple-300" />
                    <h3 className="font-semibold text-white">Engagement Metrics</h3>
                </div>
                <div className="h-48 flex flex-col">
                    <div className="flex-1 flex items-end justify-between gap-4 mb-4 pt-6">
                        {engagementData.map((day, index) => (
                            <div key={index} className="flex gap-1 h-full items-end flex-1">
                                <div className="flex-1 group">
                                    <div className="relative h-full flex items-end">
                                        <div
                                            className="w-full bg-purple-500 hover:bg-purple-400 transition-all duration-200"
                                            style={{ height: `${day.likes * 2}px` }}
                                        >
                                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-800 text-white px-1.5 py-0.5 rounded text-xs">
                                                {day.likes}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 group">
                                    <div className="relative h-full flex items-end">
                                        <div
                                            className="w-full bg-pink-500 hover:bg-pink-400 transition-all duration-200"
                                            style={{ height: `${day.comments}%` }}
                                        >
                                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-pink-800 text-white px-1.5 py-0.5 rounded text-xs">
                                                {day.comments}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 group">
                                    <div className="relative h-full flex items-end">
                                        <div
                                            className="w-full bg-indigo-500 hover:bg-indigo-400 transition-all duration-200"
                                            style={{ height: `${day.shares}%` }}
                                        >
                                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-800 text-white px-1.5 py-0.5 rounded text-xs">
                                                {day.shares}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-2">
                        {engagementData.map((day, index) => (
                            <div key={index} className="flex-1 text-center">
                                <span className="text-xs text-purple-300">{day.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Demographics Pie Chart */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-700/20">
                <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-purple-300" />
                    <h3 className="font-semibold text-white">Demographics</h3>
                </div>
                <div className="relative h-40 flex items-center justify-center">
                    <svg className="w-32 h-32" viewBox="0 0 32 32">
                        {demographicsData.reduce(
                            (acc, item, index) => {
                                const startAngle = acc.currentAngle;
                                const endAngle = startAngle + (item.value / 100) * 360;
                                const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                                const startX = 16 + 16 * Math.cos((startAngle * Math.PI) / 180);
                                const startY = 16 + 16 * Math.sin((startAngle * Math.PI) / 180);
                                const endX = 16 + 16 * Math.cos((endAngle * Math.PI) / 180);
                                const endY = 16 + 16 * Math.sin((endAngle * Math.PI) / 180);

                                if (!isNaN(startX) && !isNaN(startY) && !isNaN(endX) && !isNaN(endY)) {
                                    acc.paths.push(
                                        <path
                                            key={index}
                                            d={`M16,16 L${startX},${startY} A16,16 0 ${largeArc},1 ${endX},${endY} Z`}
                                            fill={["#E57373", "#64B5F6", "#81C784", "#FFD54F"][index]}
                                        />
                                    );
                                }
                                acc.currentAngle = endAngle;
                                return acc;
                            },
                            { paths: [], currentAngle: -90 }
                        ).paths}
                    </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        {demographicsData.map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"][index]
                                    }`}
                                />
                                <span className="text-purple-200">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Growth Trends */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-700/20 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-purple-300" />
                    <h3 className="font-semibold text-white">Growth Trends</h3>
                </div>
                <div className="h-48 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path
                            d={`M 0 ${50 - growthData[0] * 0.5} 
        ${growthData.map((value, index) => `L ${index * (100 / (growthData.length - 1))} ${50 - value * 0.5}`).join(' ')}`}
                            className="stroke-purple-500 stroke-2 fill-none"
                        />
                        <path
                            d={`M 0 ${50 - growthData[0] * 0.5} 
        ${growthData.map((value, index) => `L ${index * (100 / (growthData.length - 1))} ${50 - value * 0.5}`).join(' ')} 
        V 50 H 0 Z`}
                            className="fill-purple-500/20"
                        />
                        {growthData.map((value, index) => (
                            <g key={index}>
                                <circle
                                    cx={index * (100 / (growthData.length - 1))}
                                    cy={50 - value * 0.5}
                                    r="1.5"
                                    className="fill-purple-500"
                                />
                                <text
                                    x={index * (100 / (growthData.length - 1))}
                                    y={50 - value * 0.5 - 2}
                                    fontSize="2"
                                    textAnchor="middle"
                                    fill="#fff"
                                >
                                    {value}%
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}
