import React, { useState } from 'react';
import { diseaseData } from '../services/mockData';
import { 
  Bug, 
  ShieldCheck, 
  AlertTriangle, 
  Thermometer, 
  Droplets, 
  Calendar, 
  Download,
  Phone,
  ArrowLeft, // Swapped
  ChevronDown,
  ChevronUp,
  Eye,
  Store,
  FlaskConical
} from 'lucide-react';

export default function Disease() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>('fusarium_head_blight');
  const { overall_disease_risk, disease_risks, disease_history } = diseaseData;

  const toggleRisk = (id: string) => {
    setSelectedRisk(selectedRisk === id ? null : id);
  };

  const getSeverityColor = (level: string) => {
    switch(level) {
      case 'HAUT': return 'bg-red-100 text-red-800 border-red-200';
      case 'MOYEN': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'FAIBLE': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  // Helper to get current risk object for the sidebar
  const currentRiskData = disease_risks.find(r => r.disease_id === selectedRisk) || disease_risks[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-2xl font-bold text-slate-900">توقعات الأمراض</h1>
             <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
               المخاطر الإجمالية: {overall_disease_risk}
             </span>
          </div>
          <p className="text-slate-500">المحصول: <span className="font-semibold text-slate-700">القمح اللين</span> • توقعات 60 يوم</p>
        </div>
        <div className="flex gap-3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
           <button className="px-4 py-2 text-sm font-medium bg-slate-100 rounded-md text-slate-900">الحالي</button>
           <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900">7 أيام</button>
           <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900">14 يوم</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* 2. Disease Risk Cards (Left Column) */}
         <div className="lg:col-span-2 space-y-4">
            {disease_risks.map((risk) => (
               <div 
                 key={risk.disease_id} 
                 className={`bg-white rounded-xl shadow-sm border transition-all duration-200 overflow-hidden ${selectedRisk === risk.disease_id ? 'border-teal-500 ring-1 ring-teal-500' : 'border-slate-200 hover:border-teal-300'}`}
               >
                  {/* Card Header */}
                  <div 
                    className="p-5 cursor-pointer flex flex-col md:flex-row gap-4 justify-between"
                    onClick={() => toggleRisk(risk.disease_id)}
                  >
                     <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${risk.risk_level === 'HAUT' ? 'bg-red-50' : risk.risk_level === 'MOYEN' ? 'bg-orange-50' : 'bg-green-50'}`}>
                           <Bug className={`w-6 h-6 ${risk.risk_level === 'HAUT' ? 'text-red-500' : risk.risk_level === 'MOYEN' ? 'text-orange-500' : 'text-green-500'}`} />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg text-slate-900">{risk.disease_name_fr}</h3>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getSeverityColor(risk.risk_level)}`}>
                                 {risk.risk_level}
                              </span>
                           </div>
                           <p className="text-sm text-slate-500 italic">{risk.disease_name_ar}</p>
                           
                           {/* Risk Meters */}
                           <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                 <AlertTriangle className="w-3.5 h-3.5" /> الاحتمالية: {risk.risk_score}%
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                 <ShieldCheck className="w-3.5 h-3.5" /> الثقة: {risk.confidence_percent}%
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="md:text-left flex flex-col justify-center">
                        {selectedRisk === risk.disease_id ? <ChevronUp className="mr-auto text-slate-400" /> : <ChevronDown className="mr-auto text-slate-400" />}
                     </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {selectedRisk === risk.disease_id && (
                     <div className="border-t border-slate-100 bg-slate-50 p-6 animation-fade-in">
                        
                        {/* Visual Reference & Triggers */}
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                           {/* Disease Image */}
                           <div className="w-full md:w-1/3 shrink-0">
                              <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm relative group">
                                 <img 
                                    src={risk.image_url} 
                                    alt={risk.disease_name_fr}
                                    className="w-full h-40 object-cover"
                                 />
                                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-bold flex items-center gap-1">
                                       <Eye className="w-4 h-4" /> مثال للأعراض
                                    </span>
                                 </div>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 text-center">صورة توضيحية للأعراض</p>
                           </div>

                           {/* Triggers */}
                           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-white p-3 rounded-lg border border-slate-200">
                                 <span className="block text-xs text-slate-500 uppercase font-bold mb-1">الظروف المحفزة</span>
                                 <div className="flex flex-wrap gap-1">
                                    {risk.trigger_factors?.map(t => (
                                       <span key={t} className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">{t.replace(/_/g, ' ')}</span>
                                    ))}
                                 </div>
                              </div>
                              {risk.weather_triggers && (
                                <div className="bg-white p-3 rounded-lg border border-slate-200">
                                   <span className="block text-xs text-slate-500 uppercase font-bold mb-1">الطقس الحالي</span>
                                   <div className="text-sm space-y-0.5">
                                      <div className="flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-500" /> {risk.weather_triggers.humidity_percent}% رطوبة</div>
                                      <div className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-red-500" /> {risk.weather_triggers.temperature_range_celsius}°C</div>
                                   </div>
                                </div>
                              )}
                              {risk.critical_window && (
                                <div className="bg-white p-3 rounded-lg border border-slate-200 sm:col-span-2">
                                   <span className="block text-xs text-slate-500 uppercase font-bold mb-1">الفترة الحرجة</span>
                                   <div className="text-sm font-medium text-slate-800">
                                      الأيام {risk.critical_window.start_day} - {risk.critical_window.end_day}
                                   </div>
                                   <div className="text-xs text-slate-500">{risk.critical_window.description}</div>
                                </div>
                              )}
                           </div>
                        </div>

                        {/* 3. Products & Suppliers (Moved Here) */}
                        <div className="space-y-4">
                             <h4 className="font-bold text-slate-900 text-sm uppercase flex items-center gap-2">
                               <Store className="w-4 h-4 text-teal-600" /> الموردين والمنتجات الموصى بها
                             </h4>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {risk.prevention_actions?.filter(a => a.product_name).map((action, idx) => (
                                   <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-teal-300 transition-colors">
                                      <div className="flex justify-between items-start mb-2">
                                         <div className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                            {action.action_name_fr}
                                         </div>
                                         <div className="text-xs font-mono font-bold text-slate-500">
                                            {action.product_code}
                                         </div>
                                      </div>
                                      <h5 className="font-bold text-slate-900 text-sm mb-1">{action.product_name}</h5>
                                      <div className="text-xs text-slate-500 mb-3">{action.product_name_local}</div>
                                      
                                      <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                                         <div className="flex justify-between">
                                            <span className="text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" /> المورد:</span>
                                            <span className="font-bold text-teal-700">{action.supplier}</span>
                                         </div>
                                         <div className="flex justify-between">
                                            <span className="text-slate-500">الجرعة:</span>
                                            <span className="font-bold">{action.quantity_liters} لتر/هكتار</span>
                                         </div>
                                         <div className="flex justify-between">
                                            <span className="text-slate-500">التكلفة:</span>
                                            <span className="font-mono">{action.total_cost_dzd?.toLocaleString()} دج</span>
                                         </div>
                                      </div>
                                   </div>
                                ))}
                             </div>
                        </div>

                     </div>
                  )}
               </div>
            ))}
         </div>

         {/* Right Sidebar */}
         <div className="space-y-6">
            
            {/* 4. Disease History */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-slate-400" /> السجل التاريخي
               </h3>
               <div className="space-y-4">
                  {disease_history.map((hist, idx) => (
                     <div key={idx} className="text-sm border-r-2 border-slate-300 pr-3">
                        <div className="font-bold text-slate-800">{new Date(hist.date).toLocaleDateString('ar-DZ')}</div>
                        <div className="text-red-600 font-medium">{hist.disease_fr} ({hist.severity})</div>
                        <div className="text-slate-500 mt-1 text-xs">{hist.treatment_fr}</div>
                        <div className="mt-1 inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">
                           {hist.recovered ? 'تعافى' : 'خسارة'} ({hist.yield_impact_percent}%)
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* 5. Prevention Plan (Moved Here) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" /> جدول الوقاية ({currentRiskData.disease_name_ar})
               </h3>
               <div className="relative border-r-2 border-slate-100 mr-2 space-y-6">
                  {currentRiskData.prevention_actions?.map((action, idx) => (
                     <div key={idx} className="relative pr-6">
                        <span className="absolute -right-[9px] top-0 h-4 w-4 rounded-full bg-white border-2 border-teal-500"></span>
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">اليوم {action.day}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{action.action_name_fr}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{action.instructions_fr}</p>
                     </div>
                  ))}
               </div>
               
               {currentRiskData.total_prevention_cost_dzd && (
                   <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-500">التكلفة التقديرية</span>
                         <span className="font-mono font-bold text-slate-900">{currentRiskData.total_prevention_cost_dzd.toLocaleString()} دج</span>
                      </div>
                   </div>
               )}
            </div>

            {/* Actions */}
            <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg">
               <h3 className="font-bold text-lg mb-2">تحتاج مساعدة؟</h3>
               <p className="text-slate-400 text-sm mb-4">اتصل بخبير زراعي للتحقق من صحة خطة المعالجة الخاصة بك.</p>
               <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition-colors mb-2">
                  اتصل بالمهندس الزراعي
               </button>
               <button className="w-full bg-transparent border border-slate-600 hover:border-slate-400 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> تقرير PDF
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
