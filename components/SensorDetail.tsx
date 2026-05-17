import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { farmData, sensorDetailReadings } from '../services/mockData';
import { 
  ArrowRight, // Swapped for RTL
  Battery, 
  Signal, 
  Calendar, 
  RefreshCw, 
  Settings, 
  Download,
  AlertTriangle,
  Zap,
  Droplet,
  FlaskConical,
  Activity
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Helper to map 7-day trend arrays to objects for Recharts
const processTrendData = (trend: any) => {
  if (!trend || !trend.dates) return [];
  return trend.dates.map((date: string, i: number) => ({
    date,
    nitrogen: trend.nitrogen ? trend.nitrogen[i] : null,
    phosphorus: trend.phosphorus ? trend.phosphorus[i] : null,
    potassium: trend.potassium ? trend.potassium[i] : null,
    pH: trend.pH ? trend.pH[i] : null,
    moisture: trend.moisture ? trend.moisture[i] : null,
    EC_dS_per_m: trend.EC_dS_per_m ? trend.EC_dS_per_m[i] : null,
  }));
};

const getSparklineData = (trend: any, key: string) => {
  if (!trend || !trend.dates || !trend[key]) return [];
  return trend.dates.map((_: any, i: number) => ({ value: trend[key][i] }));
};

export default function SensorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');
  
  // Find sensor from mock data
  const sensor = farmData.sensors.find(s => s.id === id) || farmData.sensors[0];
  
  // Use detailed readings if available for NPK-001, else fallback to standard readings
  const readings = (id === 'NPK-001') ? sensorDetailReadings : {
     ...sensor.readings,
     nitrogen_target_min: 40, nitrogen_target_max: 60, nitrogen_status: 'optimal',
     phosphorus_target_min: 15, phosphorus_target_max: 25, phosphorus_status: 'unknown',
     potassium_target_min: 150, potassium_target_max: 200, potassium_status: 'optimal',
     moisture_target_min: 25, moisture_target_max: 35, moisture_status: 'optimal',
     pH_target_min: 6.5, pH_target_max: 7.0, pH_status: 'optimal',
     EC_target_min: 0.8, EC_target_max: 1.8, EC_status: 'optimal'
  };

  const trendData = processTrendData(sensor.trend_7day);

  // Status Badge Helper
  const StatusBadge = ({ status }: { status?: string }) => {
    if (status === 'optimal') {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">✓ مثالي</span>;
    } else if (status === 'low' || status === 'high') {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">⚠ انتباه</span>;
    } else {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">- غير معروف</span>;
    }
  };

  const MetricCard = ({ 
    label, 
    value, 
    unit, 
    targetMin, 
    targetMax, 
    status, 
    icon: Icon,
    colorClass,
    trendKey
  }: any) => {
    const sparkData = getSparklineData(sensor.trend_7day, trendKey);

    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:border-teal-500 transition-colors cursor-pointer group h-full">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
              <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="flex items-baseline gap-1 mt-1 mb-2">
            <span className="text-2xl font-bold text-slate-900">{value}</span>
            <span className="text-sm text-slate-400">{unit}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex justify-between items-end">
            <div>
               <div className="text-xs text-slate-500 mb-1">المستهدف</div>
               <div className="text-xs font-medium text-slate-700" dir="ltr">{targetMin} – {targetMax} {unit}</div>
            </div>
            <div className="h-8 w-16" dir="ltr">
               {sparkData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={sparkData}>
                        <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} dot={false} />
                     </LineChart>
                  </ResponsiveContainer>
               ) : (
                  <div className="h-full w-full bg-slate-100 rounded"></div>
               )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => navigate('/sensors')} 
             className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
           >
             <ArrowRight className="w-5 h-5 text-slate-600" />
           </button>
           <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{sensor.name}</h1>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">{sensor.id}</span>
              </div>
              <p className="text-slate-500 flex items-center gap-1 text-sm">
                <MapPinIcon className="w-3 h-3" /> {sensor.zone}, {farmData.farm.location}
              </p>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="text-left hidden md:block">
              <div className="text-sm text-slate-500">درجة الصحة</div>
              <div className="text-2xl font-bold text-green-600">{sensor.health_score}/100</div>
           </div>
           <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-50">
              <Activity className="w-6 h-6 text-green-600" />
           </div>
        </div>
      </div>

      {/* 2. Status Badge Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-6 items-center text-sm">
         <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-medium text-green-700 capitalize">متصل ({sensor.status === 'healthy' ? 'جيد' : 'تحذير'})</span>
         </div>
         <div className="h-4 w-px bg-slate-200"></div>
         <div className="flex items-center gap-2 text-slate-600">
            <Battery className="w-4 h-4" />
            <span>{sensor.battery_percent}% بطارية</span>
         </div>
         <div className="h-4 w-px bg-slate-200"></div>
         <div className="flex items-center gap-2 text-slate-600">
            <Signal className="w-4 h-4" />
            <span dir="ltr">{sensor.signal_strength_dbm} dBm</span>
         </div>
         <div className="h-4 w-px bg-slate-200"></div>
         <div className="flex items-center gap-2 text-slate-600">
            <RefreshCw className="w-4 h-4" />
            <span>مزامنة {new Date(sensor.last_sync || '').toLocaleTimeString('ar-DZ', {hour: '2-digit', minute:'2-digit'})}</span>
         </div>
      </div>

      {/* 3. Alerts Section */}
      {sensor.alerts && sensor.alerts.length > 0 && (
        <div className="space-y-3">
           {sensor.alerts.map(alert => (
             <div key={alert.id} className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-3">
                   <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                   <div>
                      <h3 className="font-bold text-orange-900">{alert.title}</h3>
                      <p className="text-orange-800 text-sm">{alert.description || alert.message}</p>
                   </div>
                </div>
                <button className="px-4 py-2 bg-white border border-orange-200 text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-100">
                   تجاهل
                </button>
             </div>
           ))}
        </div>
      )}

      {/* 4. Current Readings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {readings.nitrogen_mg_per_kg !== undefined && (
            <MetricCard 
               label="النيتروجين (N)" 
               value={readings.nitrogen_mg_per_kg} 
               unit="mg/kg" 
               targetMin={readings.nitrogen_target_min} 
               targetMax={readings.nitrogen_target_max} 
               status={readings.nitrogen_status}
               icon={FlaskConical}
               colorClass="bg-amber-500 text-amber-500"
               trendKey="nitrogen"
            />
         )}
         {readings.phosphorus_mg_per_kg !== undefined && (
            <MetricCard 
               label="الفوسفور (P)" 
               value={readings.phosphorus_mg_per_kg} 
               unit="mg/kg" 
               targetMin={readings.phosphorus_target_min} 
               targetMax={readings.phosphorus_target_max} 
               status={readings.phosphorus_status}
               icon={FlaskConical}
               colorClass="bg-amber-500 text-amber-500"
               trendKey="phosphorus"
            />
         )}
         {readings.potassium_mg_per_kg !== undefined && (
            <MetricCard 
               label="البوتاسيوم (K)" 
               value={readings.potassium_mg_per_kg} 
               unit="mg/kg" 
               targetMin={readings.potassium_target_min} 
               targetMax={readings.potassium_target_max} 
               status={readings.potassium_status}
               icon={FlaskConical}
               colorClass="bg-amber-500 text-amber-500"
               trendKey="potassium"
            />
         )}
         <MetricCard 
            label="الرطوبة" 
            value={readings.moisture_percent} 
            unit="%" 
            targetMin={readings.moisture_target_min} 
            targetMax={readings.moisture_target_max} 
            status={readings.moisture_status}
            icon={Droplet}
            colorClass="bg-cyan-500 text-cyan-500"
            trendKey="moisture"
         />
         <MetricCard 
            label="الحموضة (pH)" 
            value={readings.pH} 
            unit="" 
            targetMin={readings.pH_target_min} 
            targetMax={readings.pH_target_max} 
            status={readings.pH_status}
            icon={FlaskConical}
            colorClass="bg-purple-500 text-purple-500"
            trendKey="pH"
         />
         {readings.EC_dS_per_m !== undefined && (
            <MetricCard 
               label="الملوحة (EC)" 
               value={readings.EC_dS_per_m} 
               unit="dS/m" 
               targetMin={readings.EC_target_min} 
               targetMax={readings.EC_target_max} 
               status={readings.EC_status}
               icon={Zap}
               colorClass="bg-blue-500 text-blue-500"
               trendKey="EC_dS_per_m"
            />
         )}
      </div>

      {/* 5. Historical Data */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="font-bold text-slate-900">الاتجاهات التاريخية</h3>
            <div className="flex bg-slate-100 rounded-lg p-1">
               {['7d', '30d', '90d'].map(range => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === range ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                     {range === '7d' ? '7 أيام' : range === '30d' ? '30 يوم' : '90 يوم'}
                  </button>
               ))}
            </div>
         </div>
         
         <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textAlign: 'right' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="nitrogen" name="النيتروجين" stroke="#fbbf24" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="moisture" name="الرطوبة" stroke="#06b6d4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="pH" name="pH" stroke="#a855f7" strokeWidth={2} dot={false} />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 6. Info & Maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">معلومات الجهاز</h3>
            <div className="space-y-4">
               <InfoRow label="تاريخ النشر" value={new Date(sensor.deployment_date || '').toLocaleDateString('ar-DZ')} icon={Calendar} />
               <InfoRow label="آخر معايرة" value={new Date(sensor.calibration_last || '').toLocaleDateString('ar-DZ')} icon={Settings} />
               <InfoRow label="المعايرة القادمة" value={new Date(sensor.calibration_next_due || '').toLocaleDateString('ar-DZ')} icon={Settings} highlight />
            </div>
            <div className="mt-6 flex gap-3">
               <button className="flex-1 py-2 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                  تكوين التنبيهات
               </button>
               <button className="flex-1 py-2 px-4 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700">
                  معايرة المستشعر
               </button>
            </div>
         </div>
         
         <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
            <h3 className="font-bold text-slate-900 mb-2">هل تحتاج مساعدة؟</h3>
            <p className="text-slate-500 text-sm mb-4">اتصل بالدعم لمشاكل الأجهزة أو المساعدة في إعادة المعايرة.</p>
            <button className="text-teal-600 font-medium text-sm hover:underline">
               اتصل بالدعم
            </button>
            <div className="w-full h-px bg-slate-200 my-4"></div>
            <button className="flex items-center gap-2 text-slate-600 text-sm font-medium hover:text-slate-900">
               <Download className="w-4 h-4" /> تصدير بيانات CSV
            </button>
         </div>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value, icon: Icon, highlight }: any) => (
  <div className="flex justify-between items-center text-sm">
     <div className="flex items-center gap-2 text-slate-500">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
     </div>
     <span className={`font-medium ${highlight ? 'text-orange-600' : 'text-slate-900'}`}>{value}</span>
  </div>
);

// Icon component needed for header
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);