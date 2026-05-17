import React, { useEffect, useRef, useState } from 'react';
import { farmData } from '../services/mockData';
import { Sensor } from '../types';
import { 
  CloudRain, 
  MapPin, 
  Calendar, 
  User, 
  AlertTriangle, 
  Droplet,
  Thermometer,
  Zap,
  FlaskConical,
  Activity,
  Layers,
  Menu,
  RefreshCw,
  Search,
  Check,
  MoreHorizontal,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import L from 'leaflet';

export default function Dashboard() {
  const { farm, weather, sensors } = farmData;
  const [selectedSensor, setSelectedSensor] = useState<Sensor>(sensors[0]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circlesRef = useRef<L.Circle[]>([]);

  // Initialize Map
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const centerLat = sensors[0]?.coordinates.lat || 36.4028;
      const centerLng = sensors[0]?.coordinates.lng || 2.8527;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: ''
      }).addTo(map);

      mapInstanceRef.current = map;
    }
  }, []);

  // Update Map Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    circlesRef.current.forEach(c => c.remove());
    circlesRef.current = [];

    sensors.forEach(sensor => {
      const isSelected = sensor.id === selectedSensor.id;
      const color = sensor.health_score >= 70 ? '#10b981' : sensor.health_score >= 40 ? '#f59e0b' : '#ef4444';
      
      const circle = L.circle([sensor.coordinates.lat, sensor.coordinates.lng], {
        color: isSelected ? '#ffffff' : color,
        fillColor: color,
        fillOpacity: isSelected ? 0.8 : 0.5,
        radius: sensor.radius_meters,
        weight: isSelected ? 3 : 2,
        className: 'cursor-pointer transition-all'
      }).addTo(map);

      circle.bindTooltip(`
        <div class="font-sans text-xs font-bold p-1">${sensor.name}</div>
      `, { direction: 'top', offset: [0, -10], opacity: 0.95, className: 'border-0 bg-white shadow-md rounded-md px-2 py-1 text-slate-800' });

      circle.on('click', () => {
        setSelectedSensor(sensor);
        map.flyTo([sensor.coordinates.lat, sensor.coordinates.lng], 17, { animate: true, duration: 0.8 });
      });

      circlesRef.current.push(circle);
    });
  }, [sensors, selectedSensor]);

  // Color helpers
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-50';
    if (score >= 40) return 'text-orange-500 bg-orange-50';
    return 'text-red-500 bg-red-50';
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f8f9fa] text-slate-800 font-sans">
      
      {/* HEADER: Standard Height, Proper Spacing */}
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
             <h1 className="text-lg font-bold text-slate-900 tracking-tight">{farm.name}</h1>
             <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
               <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {farm.location}</span>
               <span className="w-1 h-1 rounded-full bg-slate-300"></span>
               <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date().toLocaleDateString('ar-DZ', {weekday:'long', day:'numeric', month:'long'})}</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Weather Widget */}
          <div className="hidden md:flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
             <div className="flex items-center gap-2">
               <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
                 <CloudRain className="w-4 h-4" />
               </div>
               <div>
                 <div className="text-sm font-bold text-slate-800 leading-none" dir="ltr">{weather.current_temp_c}°C</div>
                 <div className="text-[10px] text-slate-500 font-medium">غائم جزئياً</div>
               </div>
             </div>
             <div className="w-px h-6 bg-slate-200"></div>
             <div className="flex gap-3 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-blue-400" /> {weather.humidity_percent}%</span>
                <span className="flex items-center gap-1"><CloudRain className="w-3 h-3 text-slate-400" /> {weather.rainfall_forecast_mm}mm</span>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
             <button className="p-2.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors relative">
                <AlertTriangle className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <button className="p-2.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                <User className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT: Padded Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* TIER 1: Map + Summary (Split Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[450px]">
          
          {/* 1.1 MAP Card */}
          <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[350px] lg:h-full group">
             <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-xs font-bold text-slate-700 pointer-events-none">
                خريطة الحقل المباشرة
             </div>
             
             <div ref={mapContainerRef} className="flex-1 z-0" />
             
             {/* Map Legend */}
             <div className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur rounded-xl border border-slate-200 p-3 shadow-lg max-w-[180px]">
                <h4 className="font-bold text-xs text-slate-800 mb-2">المناطق النشطة</h4>
                <div className="space-y-1.5">
                   {sensors.map(s => (
                      <div 
                        key={s.id} 
                        onClick={() => setSelectedSensor(s)} 
                        className={`flex items-center gap-2 cursor-pointer p-1.5 rounded-lg transition-all ${selectedSensor.id === s.id ? 'bg-slate-100 ring-1 ring-slate-300' : 'hover:bg-slate-50'}`}
                      >
                         <span className={`w-2.5 h-2.5 rounded-full ${s.health_score >= 70 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : s.health_score >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                         <span className="text-xs font-medium text-slate-700 truncate flex-1">{s.zone}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Zoom Controls */}
             <div className="absolute bottom-4 left-4 z-[400] flex flex-col gap-2">
                <button 
                  onClick={() => mapInstanceRef.current?.setZoom(mapInstanceRef.current.getZoom() + 1)}
                  className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 shadow-md hover:bg-slate-50 transition-colors"
                >
                   +
                </button>
                <button 
                  onClick={() => mapInstanceRef.current?.setZoom(mapInstanceRef.current.getZoom() - 1)}
                  className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 shadow-md hover:bg-slate-50 transition-colors"
                >
                   -
                </button>
             </div>
          </div>

          {/* 1.2 SUMMARY PANEL */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
             
             {/* Header Section */}
             <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/30">
                <div className="flex justify-between items-start mb-3">
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <span className={`w-2 h-2 rounded-full ${selectedSensor.health_score >= 70 ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                         <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">نظرة عامة</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedSensor.name}</h2>
                      <p className="text-sm text-slate-500 mt-1">{selectedSensor.zone} (15 Ha) • آخر تحديث: منذ 5 دقائق</p>
                   </div>
                   <div className={`px-4 py-2 rounded-xl flex flex-col items-center ${getScoreColor(selectedSensor.health_score)}`}>
                      <span className="text-2xl font-bold leading-none">{selectedSensor.health_score}</span>
                      <span className="text-[10px] font-bold uppercase mt-1">Health Score</span>
                   </div>
                </div>
             </div>

             {/* Content Section */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                {/* Soil & Suitability */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-slate-500">
                         <Layers className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase">نوع التربة</span>
                      </div>
                      <div className="text-lg font-bold text-slate-800">{selectedSensor.soil_type_summary?.soil_type || 'Unknown'}</div>
                      <div className="text-xs text-slate-500 mt-1">نسيج طمي متوازن</div>
                   </div>
                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-slate-500">
                         <Activity className="w-4 h-4" />
                         <span className="text-xs font-bold uppercase">الملاءمة</span>
                      </div>
                      <div className="flex gap-1 h-2 mt-3">
                         <div className="flex-1 bg-green-500 rounded-full opacity-80" title="فاكهة"></div>
                         <div className="flex-1 bg-green-400 rounded-full opacity-60" title="خضر"></div>
                         <div className="flex-1 bg-orange-300 rounded-full opacity-40" title="حبوب"></div>
                      </div>
                      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
                         <span>عالية</span>
                         <span>متوسطة</span>
                         <span>منخفضة</span>
                      </div>
                   </div>
                </div>

                {/* Key Metrics Grid */}
                <div>
                   <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">المؤشرات الحيوية</h4>
                   <div className="grid grid-cols-3 gap-4">
                      <CompactStatusItem icon={FlaskConical} label="pH" value={selectedSensor.readings.pH} unit="" status="optimal" />
                      <CompactStatusItem icon={Zap} label="EC" value={selectedSensor.readings.EC_dS_per_m} unit="dS/m" status="normal" />
                      <CompactStatusItem icon={Thermometer} label="Temp" value={selectedSensor.readings.temperature_celsius} unit="°C" status="normal" />
                   </div>
                </div>

                {/* Nutrient Bars */}
                <div className="pt-2">
                   <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">توازن NPK</h4>
                      <button className="text-[10px] font-bold text-teal-600 hover:underline flex items-center gap-1">
                         التفاصيل <ArrowUpRight className="w-3 h-3" />
                      </button>
                   </div>
                   <div className="space-y-3">
                      <CompactBar label="N" value={selectedSensor.readings.nitrogen_mg_per_kg || 0} max={80} target={[40, 60]} color="bg-emerald-500" />
                      <CompactBar label="P" value={selectedSensor.readings.phosphorus_mg_per_kg || 0} max={40} target={[15, 25]} color="bg-rose-500" />
                      <CompactBar label="K" value={selectedSensor.readings.potassium_mg_per_kg || 0} max={300} target={[150, 200]} color="bg-amber-500" />
                   </div>
                </div>

             </div>
          </div>
        </div>

        {/* TIER 2: Key Readings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <ReadingCard label="النيتروجين" value={selectedSensor.readings.nitrogen_mg_per_kg} unit="mg/kg" status="low" />
           <ReadingCard label="الفوسفور" value={selectedSensor.readings.phosphorus_mg_per_kg} unit="mg/kg" status="critical" />
           <ReadingCard label="البوتاسيوم" value={selectedSensor.readings.potassium_mg_per_kg} unit="mg/kg" status="high" />
           <ReadingCard label="المادة العضوية" value="2.5" unit="%" status="medium" />
        </div>

        {/* TIER 3: Detailed Metrics & Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
           {/* NPK Detailed */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-slate-400" /> تحليل العناصر
                 </h3>
                 <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">محدث للتو</span>
              </div>
              <div className="space-y-6">
                 <DetailedRow label="النيتروجين" value={selectedSensor.readings.nitrogen_mg_per_kg} target={60} unit="mg/kg" />
                 <DetailedRow label="الفوسفور" value={selectedSensor.readings.phosphorus_mg_per_kg} target={25} unit="mg/kg" alert />
                 <DetailedRow label="البوتاسيوم" value={selectedSensor.readings.potassium_mg_per_kg} target={150} unit="mg/kg" />
              </div>
           </div>

           {/* Soil Structure */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-slate-400" /> البنية والخصوبة
                 </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                    <span className="block text-xs font-bold text-teal-700 uppercase mb-2">الخصوبة</span>
                    <div className="flex items-end gap-2 mb-2">
                       <span className="text-3xl font-bold text-teal-900">72%</span>
                       <span className="text-sm font-medium text-teal-600 mb-1">جيد</span>
                    </div>
                    <div className="w-full bg-teal-200 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-teal-600 h-full w-[72%]"></div>
                    </div>
                 </div>
                 <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <span className="block text-xs font-bold text-amber-700 uppercase mb-2">الانضغاط</span>
                    <div className="flex items-end gap-2 mb-2">
                       <span className="text-3xl font-bold text-amber-900">50%</span>
                       <span className="text-sm font-medium text-amber-600 mb-1">متوسط</span>
                    </div>
                    <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-amber-500 h-full w-[50%]"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* TIER 4: Alerts */}
        <div className="space-y-4">
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">التنبيهات والإجراءات</h3>
           {selectedSensor.alerts && selectedSensor.alerts.length > 0 ? (
              selectedSensor.alerts.map(alert => (
                 <div key={alert.id} className="bg-white rounded-xl shadow-sm border-r-4 border-red-500 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-2 bg-red-50 rounded-lg text-red-600 shrink-0">
                       <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-slate-900 text-sm mb-1">{alert.title}</h4>
                       <p className="text-slate-600 text-xs">{alert.description}</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                       إتخاذ إجراء
                    </button>
                 </div>
              ))
           ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4 text-slate-500">
                 <div className="p-2 bg-green-50 rounded-full text-green-600">
                    <Check className="w-5 h-5" />
                 </div>
                 <span>لا توجد تنبيهات نشطة. النظام يعمل بشكل مثالي.</span>
              </div>
           )}
        </div>

      </div>
    </div>
  );
}

// --- MICRO COMPONENTS ---

function CompactStatusItem({ icon: Icon, label, value, unit, status }: any) {
   const color = status === 'optimal' ? 'text-green-600 bg-green-50 border-green-100' : 'text-slate-700 bg-slate-50 border-slate-100';
   return (
      <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${color}`}>
         <div className="flex items-center gap-1.5 mb-1 opacity-70">
            <Icon className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">{label}</span>
         </div>
         <span className="font-bold text-lg leading-none">
            {value}<span className="text-[10px] font-normal opacity-70 ml-0.5">{unit}</span>
         </span>
      </div>
   );
}

function CompactBar({ label, value, max, target, color }: any) {
   const percent = Math.min((value / max) * 100, 100);
   const [minT, maxT] = target;
   const minTp = (minT / max) * 100;
   const maxTp = (maxT / max) * 100;

   return (
      <div className="flex items-center gap-3">
         <span className="w-4 text-xs font-bold text-slate-500">{label}</span>
         <div className="flex-1 h-2 bg-slate-100 rounded-full relative overflow-hidden">
            {/* Target Zone */}
            <div className="absolute top-0 bottom-0 bg-slate-300/30 border-x border-slate-300 z-0" style={{left: `${minTp}%`, width: `${maxTp - minTp}%`}}></div>
            {/* Value Bar */}
            <div className={`absolute top-0 bottom-0 ${color} rounded-full z-10 transition-all duration-700 ease-out`} style={{width: `${percent}%`}}></div>
         </div>
         <span className="w-8 text-right text-xs font-bold text-slate-700">{value}</span>
      </div>
   );
}

function ReadingCard({ label, value, unit, status }: any) {
   const getStatusStyles = (s: string) => {
      if (s === 'critical') return 'text-red-600 bg-red-50 border-red-100';
      if (s === 'low' || s === 'high') return 'text-orange-600 bg-orange-50 border-orange-100';
      return 'text-green-600 bg-green-50 border-green-100';
   };

   const styles = getStatusStyles(status);

   return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group">
         <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</span>
            <span className={`w-2 h-2 rounded-full ${status === 'critical' ? 'bg-red-500' : status === 'low' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
         </div>
         <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{value}</span>
            <span className="text-sm font-medium text-slate-400">{unit}</span>
         </div>
         <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase ${styles}`}>
            {status}
         </span>
      </div>
   );
}

function DetailedRow({ label, value, target, unit, alert }: any) {
   const percent = Math.min((value / (target * 2)) * 100, 100);
   
   return (
      <div className="group">
         <div className="flex justify-between text-xs mb-1.5">
            <span className={`font-bold ${alert ? 'text-red-600' : 'text-slate-600'}`}>{label}</span>
            <span className="font-mono text-slate-500">{value} / {target} {unit}</span>
         </div>
         <div className="h-2.5 bg-slate-100 rounded-full relative overflow-hidden">
            <div className="absolute top-0 bottom-0 w-0.5 bg-slate-800/20 z-20" style={{left: '50%'}}></div>
            <div 
               className={`absolute top-0 bottom-0 rounded-full transition-all duration-1000 ${alert ? 'bg-red-500' : 'bg-blue-500'}`} 
               style={{width: `${percent}%`}}
            ></div>
         </div>
      </div>
   );
}
