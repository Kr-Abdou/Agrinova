import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { generateHistoricalData } from '../services/mockData';

const data = generateHistoricalData(7);

const nutrientData = [
  { name: 'النيتروجين (N)', value: 45, ideal: 50 },
  { name: 'الفوسفور (P)', value: 30, ideal: 40 },
  { name: 'البوتاسيوم (K)', value: 120, ideal: 150 },
];

export default function Analysis() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">تحليل التربة</h1>
        <p className="text-slate-500">الاتجاهات التاريخية وتكوين العناصر الغذائية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Moisture & pH Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">اتجاهات الرطوبة والحموضة</h3>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button 
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === '7d' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
              >
                7 أيام
              </button>
              <button 
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === '30d' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
              >
                30 يوم
              </button>
            </div>
          </div>
          <div className="h-72 w-full" dir="ltr"> {/* Charts render better LTR generally */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 14]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textAlign: 'right' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={2} dot={false} name="الرطوبة %" />
                <Line yAxisId="right" type="monotone" dataKey="ph" stroke="#10b981" strokeWidth={2} dot={false} name="درجة الحموضة" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NPK Composition */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="font-bold text-slate-800 mb-6">توازن العناصر الغذائية (NPK)</h3>
           <div className="h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutrientData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textAlign: 'right' }} />
                <Legend />
                <Bar dataKey="value" name="الحالي (ppm)" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="ideal" name="المستهدف (ppm)" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
           </div>
           <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="text-sm text-yellow-800 font-medium">تنبيه: مستويات الفوسفور أقل من المعدل المثالي بنسبة 25%.</p>
              <p className="text-xs text-yellow-600 mt-1">فكر في إضافة الفوسفات الصخري أو مسحوق العظام.</p>
           </div>
        </div>

      </div>
    </div>
  );
}