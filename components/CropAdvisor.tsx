import React, { useState } from 'react';
import { getCropRecommendations } from '../services/geminiService';
import { mockSensors } from '../services/mockData';
import { CropRecommendation } from '../types';
import { Sprout, Loader2, CheckCircle2 } from 'lucide-react';

export default function CropAdvisor() {
  const [selectedSensorId, setSelectedSensorId] = useState(mockSensors[0].id);
  const [recommendations, setRecommendations] = useState<CropRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedSensor = mockSensors.find(s => s.id === selectedSensorId) || mockSensors[0];

  const handleAnalysis = async () => {
    setLoading(true);
    setRecommendations(null);
    try {
      if (selectedSensor.data) {
        const results = await getCropRecommendations(selectedSensor.data);
        setRecommendations(results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">مستشار المحاصيل الذكي</h1>
        <p className="text-slate-500 mt-2">احصل على توصيات محاصيل مخصصة بناءً على ملف التربة الخاص بك.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <label className="block text-sm font-medium text-slate-700 mb-2">اختر مصدر التربة (المستشعر)</label>
        <div className="flex gap-4 items-end">
          <select 
            className="flex-1 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            value={selectedSensorId}
            onChange={(e) => setSelectedSensorId(e.target.value)}
          >
            {mockSensors.map(s => (
              <option key={s.id} value={s.id}>{s.name} - {s.location} (pH {s.data?.pH})</option>
            ))}
          </select>
          <button 
            onClick={handleAnalysis}
            disabled={loading}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sprout className="w-5 h-5" />}
            تحليل التربة
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-500">يقوم خبيرنا الزراعي بتحليل بيانات التربة...</p>
        </div>
      )}

      {recommendations && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">أهم التوصيات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((crop, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:border-teal-200 transition-colors">
                <div className="p-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{crop.cropName}</h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      تطابق {crop.matchScore}%
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{crop.reasoning}</p>
                  
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">المتطلبات</h4>
                    <p className="text-xs text-slate-700 leading-relaxed">{crop.requirements}</p>
                  </div>

                  <button className="w-full mt-6 flex items-center justify-center gap-2 text-teal-600 font-medium text-sm hover:bg-teal-50 py-2 rounded-lg transition-colors">
                    <CheckCircle2 className="w-4 h-4" /> اختر هذا المحصول
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}