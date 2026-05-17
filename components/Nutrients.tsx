import React, { useState } from 'react';
import { nutrientData } from '../services/mockData';
import { 
  FlaskConical, 
  ArrowLeft, // Swapped
  TrendingUp, 
  Printer, 
  Share2, 
  Download, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShoppingCart,
  Check
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function Nutrients() {
  const [selectedZone, setSelectedZone] = useState('الحقل الشمالي');
  const { current_nutrients, target_nutrients, optimization_plan, farm_optimized_scenario } = nutrientData;

  // Prepare comparison data for charts
  const comparisonData = [
    { name: 'النيتروجين', key: 'nitrogen' },
    { name: 'الفوسفور', key: 'phosphorus' },
    { name: 'البوتاسيوم', key: 'potassium' },
    { name: 'المغنيسيوم', key: 'magnesium' },
    { name: 'الكالسيوم', key: 'calcium' },
    { name: 'الكبريت', key: 'sulfur' }
  ].map(item => ({
    name: item.name,
    current: current_nutrients[item.key],
    target: target_nutrients[item.key],
    status: current_nutrients[item.key] < target_nutrients[item.key] ? 'deficit' : 
            current_nutrients[item.key] > target_nutrients[item.key] * 1.2 ? 'excess' : 'optimal'
  }));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'deficit': return 'text-orange-600 bg-orange-50';
      case 'excess': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'deficit': return <AlertTriangle className="w-4 h-4" />;
      case 'excess': return <Info className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
        case 'deficit': return 'نقص';
        case 'excess': return 'فائض';
        default: return 'مثالي';
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">خطة التحسين الغذائي</h1>
          <p className="text-slate-500">مستهدف لـ: <span className="font-semibold text-slate-700">القمح اللين</span> (المنطقة: {selectedZone})</p>
        </div>
        <div className="flex gap-2">
           <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
             <Printer className="w-5 h-5" />
           </button>
           <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
             <Share2 className="w-5 h-5" />
           </button>
           <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800">
             <Download className="w-4 h-4" /> تصدير PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* 2. Nutrient Comparison Table & Chart */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-teal-600" /> تحليل مقارن
              </h2>
              
              {/* Visual Chart */}
              <div className="h-64 w-full mb-6" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'right'}} />
                    <Bar dataKey="current" name="الحالي" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="target" name="المستهدف" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Table */}
              <div className="overflow-x-auto">
                 <table className="w-full text-sm text-right">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                       <tr>
                          <th className="px-4 py-3 rounded-r-lg">العنصر</th>
                          <th className="px-4 py-3">الحالي</th>
                          <th className="px-4 py-3">المستهدف</th>
                          <th className="px-4 py-3">الفرق</th>
                          <th className="px-4 py-3 rounded-l-lg">الحالة</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {comparisonData.map((item) => (
                          <tr key={item.name} className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                             <td className="px-4 py-3 font-mono">{item.current}</td>
                             <td className="px-4 py-3 font-mono text-slate-500">{item.target}</td>
                             <td className="px-4 py-3" dir="ltr">
                                <span className={item.current < item.target ? 'text-orange-600 font-bold' : 'text-slate-400'}>
                                   {item.current - item.target > 0 ? '+' : ''}{item.current - item.target}
                                </span>
                             </td>
                             <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(item.status)}`}>
                                   {getStatusIcon(item.status)} {getStatusLabel(item.status)}
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* 3. Application Timeline */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" /> جدول التطبيق
              </h2>
              <div className="relative border-r-2 border-slate-200 mr-3 space-y-8">
                 {optimization_plan.application_schedule.map((event, idx) => (
                    <div key={idx} className="relative pr-8">
                       <span className="absolute -right-[9px] top-0 h-4 w-4 rounded-full bg-white border-4 border-teal-500"></span>
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                          <h4 className="font-bold text-slate-900">اليوم {event.day}: {event.action}</h4>
                          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{event.fertilizer_type} ({event.quantity_kg} كغ)</span>
                       </div>
                       <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                          {event.instructions}
                       </p>
                    </div>
                 ))}
              </div>
           </div>

           {/* 4. Shopping List (Moved Here & Expanded) */}
           <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-sm">
              <h2 className="font-bold text-yellow-900 mb-4 flex items-center gap-2">
                 <ShoppingCart className="w-5 h-5 text-yellow-700" /> قائمة التسوق (Requisition List)
              </h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-sm text-right">
                    <thead className="bg-yellow-100/50 text-yellow-800 font-bold uppercase text-xs border-b border-yellow-200">
                       <tr>
                          <th className="px-4 py-3 rounded-r-lg w-8">#</th>
                          <th className="px-4 py-3">المنتج</th>
                          <th className="px-4 py-3">المورد</th>
                          <th className="px-4 py-3">الكمية</th>
                          <th className="px-4 py-3">سعر الوحدة</th>
                          <th className="px-4 py-3 rounded-l-lg text-left">الإجمالي</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-200/50">
                       {optimization_plan.fertilizers.map((fert, idx) => (
                          <tr key={idx} className="hover:bg-yellow-100/30 transition-colors">
                             <td className="px-4 py-3">
                                <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500" />
                             </td>
                             <td className="px-4 py-3 font-medium text-slate-900">{fert.type}</td>
                             <td className="px-4 py-3 text-slate-600 text-xs">{fert.supplier}</td>
                             <td className="px-4 py-3 font-bold">{fert.quantity_kg} كغ</td>
                             <td className="px-4 py-3 text-slate-600" dir="ltr">{fert.cost_per_kg_dzd} دج</td>
                             <td className="px-4 py-3 font-mono font-bold text-slate-900 text-left" dir="ltr">{fert.total_cost_dzd.toLocaleString()} دج</td>
                          </tr>
                       ))}
                       <tr className="bg-yellow-100/50 font-bold border-t-2 border-yellow-200">
                          <td colSpan={4} className="px-4 py-3 text-left">المجموع التقديري</td>
                          <td colSpan={2} className="px-4 py-3 text-left text-teal-800 text-lg" dir="ltr">
                             {optimization_plan.total_cost_dzd.toLocaleString()} DZD
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                 <button className="bg-white border border-yellow-300 text-yellow-800 font-bold py-2 px-6 rounded-lg hover:bg-yellow-100 transition-colors flex items-center gap-2">
                    <Printer className="w-4 h-4" /> طباعة
                 </button>
                 <button className="bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2">
                    <Check className="w-4 h-4" /> تأكيد الطلب
                 </button>
              </div>
           </div>

        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
           
           {/* 5. Recommended Fertilizers (Moved Here & Compacted) */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" /> الأسمدة الموصى بها
              </h2>
              <div className="space-y-3">
                 {optimization_plan.fertilizers.map((fert) => (
                    <div key={fert.rank} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                       <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-slate-800 text-sm">{fert.type}</h4>
                          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">اليوم {fert.application_day}</span>
                       </div>
                       <p className="text-xs text-slate-500 mb-2">{fert.notes}</p>
                       <div className="flex justify-between items-center text-xs">
                          <span className="font-medium bg-slate-100 px-2 py-1 rounded text-slate-700">{fert.quantity_kg} كغ</span>
                          <span className="font-mono text-slate-400" dir="ltr">~{fert.total_cost_dzd.toLocaleString()} دج</span>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-4 text-xs font-bold text-teal-600 hover:bg-teal-50 py-2 rounded transition-colors">
                 عرض التفاصيل الكاملة
              </button>
           </div>

           {/* 6. Financial Impact Card */}
           <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" /> الأثر المالي
              </h2>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                    <span className="text-slate-400 text-sm">تكلفة التحسين</span>
                    <span className="font-mono font-bold text-red-300" dir="ltr">-{optimization_plan.total_cost_dzd.toLocaleString()} DZD</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                    <span className="text-slate-400 text-sm">زيادة العائد (+15%)</span>
                    <span className="font-mono font-bold text-green-400" dir="ltr">+{farm_optimized_scenario.extra_profit_dzd.toLocaleString()} DZD</span>
                 </div>
                 <div className="pt-2">
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-slate-200 font-bold">صافي الربح المتوقع</span>
                       <span className="font-mono font-bold text-xl text-teal-400" dir="ltr">+{farm_optimized_scenario.net_gain_dzd.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                       <div className="bg-slate-800 p-2 rounded flex-1 text-center">
                          <div className="text-xs text-slate-400 uppercase">ROI</div>
                          <div className="font-bold text-teal-400" dir="ltr">{optimization_plan.roi_x}x</div>
                       </div>
                       <div className="bg-slate-800 p-2 rounded flex-1 text-center">
                          <div className="text-xs text-slate-400 uppercase">الاسترداد</div>
                          <div className="font-bold text-teal-400">{optimization_plan.payback_days} أيام</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* 7. Action Buttons */}
           <div className="space-y-3">
              <button className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                 <CheckCircle2 className="w-5 h-5" /> الموافقة على الخطة
              </button>
              <button className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-3 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                 اتصل بالموردين
              </button>
           </div>

        </div>

      </div>
    </div>
  );
}
