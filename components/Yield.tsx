import React, { useState } from 'react';
import { yieldData } from '../services/mockData';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowLeft, 
  Download, 
  FileText,
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, Area, ComposedChart
} from 'recharts';

export default function Yield() {
  const [scenario, setScenario] = useState<'baseline' | 'optimized'>('optimized');
  const { scenarios, financial_impact, yield_improvement, soil_health_projection_5year, key_insights } = yieldData;

  const currentScenario = scenarios[scenario];
  const isOptimized = scenario === 'optimized';

  // Chart Data Preparation
  const soilHealthData = soil_health_projection_5year.years.map((year, idx) => ({
    year: `سنة ${year}`,
    current: soil_health_projection_5year.current_practice_score[idx],
    optimized: soil_health_projection_5year.optimized_practice_score[idx]
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">توقعات الإنتاجية</h1>
          <p className="text-slate-500">
            المزرعة: 45 هكتار • المحصول: <span className="font-semibold text-slate-700">القمح اللين</span>
          </p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setScenario('baseline')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!isOptimized ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            السيناريو الحالي
          </button>
          <button 
            onClick={() => setScenario('optimized')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isOptimized ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}
          >
            مع التحسين
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. Scenario Comparison Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Baseline Card */}
          <div className={`p-6 rounded-xl border ${!isOptimized ? 'bg-white border-slate-300 ring-2 ring-slate-200' : 'bg-slate-50 border-slate-200 opacity-70 hover:opacity-100 transition-opacity'}`}>
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-slate-700">الممارسة الحالية</h3>
                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase">الأساس</span>
             </div>
             <div className="mb-4">
                <span className="block text-4xl font-bold text-slate-900">{scenarios.baseline.estimated_yield_tons_per_hectare} طن/هكتار</span>
                <span className="text-sm text-slate-500">الإجمالي: {scenarios.baseline.total_yield_tons} طن</span>
             </div>
             <div className="pt-4 border-t border-slate-200 space-y-2 text-sm">
                <div className="flex justify-between">
                   <span className="text-slate-500">العائد المقدر</span>
                   <span className="font-mono font-medium" dir="ltr">{scenarios.baseline.total_revenue_dzd.toLocaleString()} DZD</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 italic">"{scenarios.baseline.assumptions}"</p>
             </div>
          </div>

          {/* Optimized Card */}
          <div className={`p-6 rounded-xl border ${isOptimized ? 'bg-white border-teal-500 ring-2 ring-teal-100' : 'bg-slate-50 border-slate-200 opacity-70 hover:opacity-100 transition-opacity'}`}>
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-teal-800">مع التحسين</h3>
                <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded uppercase">موصى به</span>
             </div>
             <div className="mb-4">
                <div className="flex items-baseline gap-2">
                   <span className="block text-4xl font-bold text-teal-600">{scenarios.optimized.estimated_yield_tons_per_hectare} طن/هكتار</span>
                   <span className="text-sm font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded" dir="ltr">+{yield_improvement.percentage}%</span>
                </div>
                <span className="text-sm text-slate-500">الإجمالي: {scenarios.optimized.total_yield_tons} طن</span>
             </div>
             <div className="pt-4 border-t border-teal-100 space-y-2 text-sm">
                <div className="flex justify-between">
                   <span className="text-slate-500">العائد المقدر</span>
                   <span className="font-mono font-bold text-slate-900" dir="ltr">{scenarios.optimized.total_revenue_dzd.toLocaleString()} DZD</span>
                </div>
                <div className="flex justify-between text-green-700">
                   <span className="font-medium">صافي الربح (مقارنة بالأساس)</span>
                   <span className="font-mono font-bold" dir="ltr">+{scenarios.optimized.net_profit_dzd?.toLocaleString()} DZD</span>
                </div>
             </div>
          </div>
        </div>

        {/* 3. Metrics Box */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
           <div>
              <h3 className="text-slate-400 font-bold uppercase text-xs mb-4">تحليل الأثر</h3>
              <div className="space-y-6">
                 <div>
                    <div className="text-3xl font-bold text-green-400">+{yield_improvement.absolute_tons_farm} طن</div>
                    <div className="text-slate-400 text-sm">إجمالي مكسب الإنتاج</div>
                 </div>
                 <div>
                    <div className="text-3xl font-bold text-teal-400" dir="ltr">{scenarios.optimized.roi_x}x</div>
                    <div className="text-slate-400 text-sm">العائد على الاستثمار (ROI)</div>
                 </div>
                 <div>
                    <div className="text-3xl font-bold text-white">{financial_impact.payback_period_days} أيام</div>
                    <div className="text-slate-400 text-sm">فترة الاسترداد</div>
                 </div>
              </div>
           </div>
           <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> تقرير PDF
           </button>
        </div>

        {/* 4. Charts Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
             <TrendingUp className="w-5 h-5 text-teal-600" /> توقعات صحة التربة (5 سنوات)
           </h3>
           <div className="h-72 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={soilHealthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'right'}} />
                    <Legend />
                    <Line type="monotone" dataKey="current" name="الممارسة الحالية" stroke="#94a3b8" strokeWidth={2} dot={{r:4}} />
                    <Line type="monotone" dataKey="optimized" name="مع التحسين" stroke="#10b981" strokeWidth={3} dot={{r:4}} />
                 </LineChart>
              </ResponsiveContainer>
           </div>
           <p className="mt-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
             <Info className="w-4 h-4 inline ml-2 text-teal-500" />
             يحافظ التحسين على صحة التربة قريبة من 100%، بينما تؤدي الممارسة الحالية إلى تدهور تدريجي في العناصر الغذائية والبنية.
           </p>
        </div>

        {/* 5. Key Insights */}
        <div className="space-y-4">
           {key_insights.map((insight, idx) => (
             <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-teal-300 transition-colors">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <span className="text-teal-700 font-bold">{idx + 1}</span>
                   </div>
                   <div>
                      <p className="text-sm font-medium text-slate-800">{insight.insight_ar}</p>
                   </div>
                </div>
             </div>
           ))}
           
           <button className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
              مقارنة سيناريوهات بديلة
           </button>
        </div>

      </div>
    </div>
  );
}