import React, { useState, useEffect, useRef } from 'react';
import { farmData } from '../services/mockData';
import L from 'leaflet';
import { 
  MapPin, 
  Droplet, 
  FlaskConical, 
  Zap, 
  Layers, 
  AlertTriangle, 
  Info,
  Check,
  Thermometer,
  Sprout,
  BarChart3,
  ListTodo,
  TestTube2,
  Download,
  ChevronRight,
  CloudRain,
  Scale,
  Activity,
  ArrowUpRight,
  CircleDashed,
  Microscope
} from 'lucide-react';

// --- Theme Helper ---
const getTheme = (colorName: string) => {
  const map: Record<string, any> = {
    blue: { 
      bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', 
      bar: 'bg-blue-500', ring: 'ring-blue-500', badge: 'bg-blue-100 text-blue-800'
    },
    orange: { 
      bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', 
      bar: 'bg-orange-500', ring: 'ring-orange-500', badge: 'bg-orange-100 text-orange-800'
    },
    green: { 
      bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', 
      bar: 'bg-emerald-500', ring: 'ring-emerald-500', badge: 'bg-emerald-100 text-emerald-800'
    },
    red: { 
      bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', 
      bar: 'bg-red-500', ring: 'ring-red-500', badge: 'bg-red-100 text-red-800'
    },
  };
  return map[colorName] || map.blue;
};

export default function PrecisionSoilMap() {
  const { zones } = farmData;
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'chemistry' | 'physical' | 'biology' | 'actions'>('chemistry');
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const zonesLayerRef = useRef<L.LayerGroup | null>(null);

  const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0];
  const theme = getTheme(selectedZone?.color_name || 'blue');

  // --- Map Init ---
  useEffect(() => {
    let map: L.Map | null = null;
    if (mapContainerRef.current && !mapInstance) {
      map = L.map(mapContainerRef.current, {
        zoomControl: false, attributionControl: false, scrollWheelZoom: true 
      });
      
      const initialCenter: L.LatLngExpression = zones[0]?.coordinates?.polygon[0] 
        ? [zones[0].coordinates.polygon[0][0], zones[0].coordinates.polygon[0][1]] 
        : [36.402, 2.845];
        
      map.setView(initialCenter, 16);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '' }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      
      const layerGroup = L.layerGroup().addTo(map);
      zonesLayerRef.current = layerGroup;
      setMapInstance(map);
    }

    return () => {
      if (map) {
        map.remove();
        setMapInstance(null);
      }
    };
  }, []);

  // --- Draw Zones ---
  useEffect(() => {
    if (!mapInstance || !zonesLayerRef.current) return;
    zonesLayerRef.current.clearLayers();

    zones.forEach(zone => {
      const isSelected = zone.id === selectedZoneId;
      const polygon = L.polygon(zone.coordinates.polygon as L.LatLngExpression[], {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: isSelected ? 0.6 : 0.2,
        weight: isSelected ? 3 : 1,
        className: 'transition-all duration-300 cursor-pointer'
      });

      polygon.on('click', () => {
        setSelectedZoneId(zone.id);
        if (mapInstance) mapInstance.flyToBounds(zone.coordinates.polygon as L.LatLngExpression[], { padding: [20, 20], animate: true, duration: 0.8 });
      });
      
      if(isSelected) {
         polygon.bindTooltip(
            `<div class="font-bold text-xs text-center px-1" style="color:${zone.color}">${zone.name}</div>`,
            { permanent: true, direction: 'center', className: 'bg-white/95 border-0 shadow-md px-2 py-1 rounded' }
         ).openTooltip();
      }

      zonesLayerRef.current?.addLayer(polygon);
    });
  }, [mapInstance, selectedZoneId, zones]);

  return (
    <div className="flex h-[calc(100vh-1rem)] gap-5 overflow-hidden p-1">
      
      {/* COLUMN 1: MAP (Fixed, 40%) */}
      <div className="w-5/12 h-full flex flex-col gap-4">
        <div className="flex-1 relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group bg-white">
           <div ref={mapContainerRef} className="h-full w-full bg-slate-100" />
           
           {/* Internal Legend */}
           <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 p-3 min-w-[180px]">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-100 pb-2">المناطق المراقبة</h4>
              <div className="space-y-1">
                 {zones.map(z => (
                    <div key={z.id} onClick={() => setSelectedZoneId(z.id)} className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors ${selectedZoneId === z.id ? 'bg-slate-100 ring-1 ring-slate-300' : ''}`}>
                       <span className="w-3 h-3 rounded-md shadow-sm" style={{ backgroundColor: z.color }}></span>
                       <div className="flex-1">
                          <div className="text-sm font-bold text-slate-700 truncate">{z.name}</div>
                          <div className="text-xs text-slate-400">{z.hectares} هكتار</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           
           {/* Map Overlay Badge */}
           <div className="absolute top-4 left-4 z-[400] bg-white/90 text-slate-800 px-3 py-2 rounded-lg shadow-md backdrop-blur border border-slate-200">
              <div className="text-sm font-bold flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-teal-600" /> 
                 <span dir="ltr">{selectedZone.name_fr}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">آخر تحديث: 12:00 PM</div>
           </div>
        </div>

        {/* Mini Summary Card (Under Map) */}
        <div className="h-40 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-500">حالة المنطقة</span>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${selectedZone.health_score > 75 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                   {selectedZone.status === 'healthy' ? 'ممتازة' : 'تحتاج انتباه'}
                </span>
             </div>
             <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {selectedZone.zone_summary_notes}
             </p>
        </div>
      </div>

      {/* COLUMN 2: DATA PANEL (60%) */}
      <div className="w-7/12 h-full flex flex-col gap-4">
         
         {/* ROW A: Advanced Header & CEC Metrics */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 shrink-0">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${theme.bg} ${theme.text}`}>
                     <Layers className="w-7 h-7" />
                  </div>
                  <div>
                     <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">{selectedZone.name}</h2>
                     <div className="flex gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Sprout className="w-3.5 h-3.5" /> {selectedZone.soil_foundation.soil_type}</span>
                        <span className="w-px h-4 bg-slate-300"></span>
                        <span className="flex items-center gap-1"><Scale className="w-3.5 h-3.5" /> {selectedZone.hectares} Ha</span>
                     </div>
                  </div>
               </div>
               
               <div className="text-right">
                  <div className="flex flex-col items-end">
                     <span className="text-xs font-bold text-slate-400 uppercase mb-1">Health Index</span>
                     <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900">{selectedZone.health_score}</span>
                        <span className="text-sm text-slate-400">/100</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Expert Stats Grid - CEC & Base Saturation */}
            <div className="grid grid-cols-4 gap-4 border-t border-slate-100 pt-5">
               <ExpertStat 
                  label="CEC السعة التبادلية" 
                  value="24.5" 
                  unit="meq/100g" 
                  icon={Activity} 
                  desc="قدرة احتفاظ عالية"
                  status="optimal" 
               />
               <ExpertStat 
                  label="pH درجة الحموضة" 
                  value={selectedZone.soil_foundation.pH} 
                  unit="" 
                  icon={FlaskConical} 
                  desc={selectedZone.soil_foundation.pH_category}
                  status={selectedZone.soil_foundation.pH_status} 
               />
               <ExpertStat 
                  label="OM المادة العضوية" 
                  value={selectedZone.soil_foundation.organic_matter_percent} 
                  unit="%" 
                  icon={Sprout} 
                  desc={selectedZone.soil_foundation.organic_matter_category}
                  status="low" 
               />
               <ExpertStat 
                  label="EC الملوحة" 
                  value={selectedZone.soil_foundation.EC_dS_per_m} 
                  unit="dS/m" 
                  icon={Zap} 
                  desc={selectedZone.soil_foundation.EC_category}
                  status={selectedZone.soil_foundation.EC_status} 
               />
            </div>
         </div>

         {/* ROW B: Detailed Tabs */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 shrink-0 px-2">
               <TabButton id="chemistry" label="الكيمياء والخصوبة" icon={TestTube2} active={activeTab} onClick={setActiveTab} />
               <TabButton id="physical" label="الفيزياء والمياه" icon={Layers} active={activeTab} onClick={setActiveTab} />
               <TabButton id="biology" label="البيولوجيا" icon={Microscope} active={activeTab} onClick={setActiveTab} />
               <TabButton id="actions" label="التوصيات والتدخلات" icon={ListTodo} active={activeTab} onClick={setActiveTab} />
            </div>

            {/* Tab Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
               
               {/* TAB 1: CHEMISTRY (Nutrients & CEC) */}
               {activeTab === 'chemistry' && (
                  <div className="space-y-8">
                     {/* Macronutrients */}
                     <div>
                        <SectionHeader title="العناصر الكبرى (Macronutrients)" icon={CircleDashed} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                           <LargeNutrientBar 
                              label="النيتروجين (N)" 
                              value={selectedZone.macronutrients.nitrogen_current_mg_per_kg} 
                              target={selectedZone.macronutrients.nitrogen_target_mg_per_kg} 
                              unit="mg/kg"
                              color="bg-emerald-500"
                           />
                           <LargeNutrientBar 
                              label="الفوسفور (P)" 
                              value={selectedZone.macronutrients.phosphorus_current_mg_per_kg} 
                              target={selectedZone.macronutrients.phosphorus_target_mg_per_kg} 
                              unit="mg/kg"
                              color="bg-rose-500"
                              alert
                           />
                           <LargeNutrientBar 
                              label="البوتاسيوم (K)" 
                              value={selectedZone.macronutrients.potassium_current_mg_per_kg} 
                              target={selectedZone.macronutrients.potassium_target_mg_per_kg} 
                              unit="mg/kg"
                              color="bg-amber-500"
                           />
                        </div>
                     </div>

                     <div className="h-px bg-slate-100"></div>

                     {/* Base Saturation & Secondaries */}
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                           <SectionHeader title="تشبع القواعد (Base Saturation)" icon={Scale} />
                           <div className="mt-4 space-y-4">
                              <div className="flex h-6 rounded-full overflow-hidden bg-slate-100 font-bold text-[10px] text-white text-center shadow-inner">
                                 <div className="bg-blue-500 flex items-center justify-center" style={{width: '65%'}}>Ca 65%</div>
                                 <div className="bg-purple-500 flex items-center justify-center" style={{width: '15%'}}>Mg 15%</div>
                                 <div className="bg-amber-500 flex items-center justify-center" style={{width: '5%'}}>K 5%</div>
                                 <div className="bg-slate-400 flex items-center justify-center" style={{width: '15%'}}>H+ & Al</div>
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                 <BaseStat label="Calcium (Ca)" val="65%" target="65-75%" status="optimal" />
                                 <BaseStat label="Magnesium (Mg)" val="15%" target="10-15%" status="optimal" />
                                 <BaseStat label="Potassium (K)" val="5%" target="2-5%" status="optimal" />
                              </div>
                           </div>
                        </div>

                        <div>
                           <SectionHeader title="العناصر الدقيقة (Micronutrients)" icon={TestTube2} />
                           <div className="mt-4 grid grid-cols-2 gap-3">
                              <MicroRow label="الحديد (Fe)" val={selectedZone.micronutrients.iron_mg_per_kg} target={60} unit="ppm" status={selectedZone.micronutrients.iron_status} />
                              <MicroRow label="الزنك (Zn)" val={selectedZone.micronutrients.zinc_mg_per_kg} target={5} unit="ppm" status={selectedZone.micronutrients.zinc_status} />
                              <MicroRow label="المنغنيز (Mn)" val={selectedZone.micronutrients.manganese_mg_per_kg} target={15} unit="ppm" status={selectedZone.micronutrients.manganese_status} />
                              <MicroRow label="النحاس (Cu)" val={selectedZone.micronutrients.copper_mg_per_kg} target={1.2} unit="ppm" status={selectedZone.micronutrients.copper_status} />
                              <MicroRow label="البورون (B)" val={selectedZone.micronutrients.boron_mg_per_kg} target={1.0} unit="ppm" status={selectedZone.micronutrients.boron_status} />
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* TAB 2: PHYSICAL (Texture & Water) */}
               {activeTab === 'physical' && (
                  <div className="space-y-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Texture */}
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                           <SectionHeader title="نسيج التربة (Texture)" icon={Layers} />
                           <div className="mt-4 flex items-center justify-between">
                              <div className="text-center w-1/3 border-r border-slate-200">
                                 <div className="text-2xl font-bold text-amber-700">20%</div>
                                 <div className="text-xs text-slate-500 font-bold uppercase">رمل (Sand)</div>
                              </div>
                              <div className="text-center w-1/3 border-r border-slate-200">
                                 <div className="text-2xl font-bold text-slate-700">45%</div>
                                 <div className="text-xs text-slate-500 font-bold uppercase">طمى (Silt)</div>
                              </div>
                              <div className="text-center w-1/3">
                                 <div className="text-2xl font-bold text-orange-700">35%</div>
                                 <div className="text-xs text-slate-500 font-bold uppercase">طين (Clay)</div>
                              </div>
                           </div>
                           <div className="mt-4 text-center">
                              <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-sm font-bold text-slate-800 shadow-sm">
                                 {selectedZone.soil_foundation.texture}
                              </span>
                           </div>
                        </div>

                        {/* Hydraulic Properties */}
                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                           <SectionHeader title="الخصائص المائية" icon={Droplet} />
                           <div className="mt-4 space-y-4">
                              <div className="flex justify-between items-center text-sm">
                                 <span className="text-slate-600">السعة الحقلية (Field Capacity)</span>
                                 <span className="font-bold text-blue-800">32% VWC</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                 <span className="text-slate-600">نقطة الذبول (Wilting Point)</span>
                                 <span className="font-bold text-slate-800">18% VWC</span>
                              </div>
                              <div className="w-full bg-blue-200 h-3 rounded-full relative mt-2">
                                 <div className="absolute top-0 bottom-0 bg-blue-600 rounded-full" style={{left: '18%', width: '14%'}}></div>
                                 <div className="absolute -top-1 bottom-0 w-1 bg-slate-900" style={{left: `${selectedZone.water_resources.moisture_surface_percent}%`}}></div>
                              </div>
                              <div className="text-xs text-center text-blue-700 mt-1 font-medium">
                                 الماء الميسر للنبات (Available Water): 14%
                              </div>
                           </div>
                        </div>
                     </div>

                     <div>
                        <SectionHeader title="البنية والانضغاط" icon={ArrowUpRight} />
                        <div className="grid grid-cols-2 gap-4 mt-4">
                           <InfoCard label="الكثافة الظاهرية (Bulk Density)" value="1.45 g/cm³" desc="مرتفع قليلاً - خطر انضغاط" status="warning" />
                           <InfoCard label="معدل الارتشاح" value={`${selectedZone.water_resources.infiltration_rate_mm_per_hour} mm/hr`} desc={selectedZone.water_resources.infiltration_interpretation} status={selectedZone.water_resources.infiltration_rate_mm_per_hour < 10 ? 'warning' : 'optimal'} />
                        </div>
                     </div>
                  </div>
               )}

               {/* TAB 3: BIOLOGY (Organic Matter) */}
               {activeTab === 'biology' && (
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                           <SectionHeader title="المادة العضوية (SOM)" icon={Sprout} />
                           <div className="mt-4">
                              <div className="flex items-end gap-2">
                                 <span className="text-4xl font-bold text-green-800">{selectedZone.soil_foundation.organic_matter_percent}%</span>
                                 <span className="text-sm text-green-700 font-medium mb-1">نسبة مئوية</span>
                              </div>
                              <p className="text-sm text-green-700 mt-2">{selectedZone.soil_foundation.organic_matter_category}</p>
                              <div className="mt-4 bg-white/60 p-3 rounded-lg text-sm text-green-800">
                                 الهدف المستقبلي: <strong>3.5%</strong>
                              </div>
                           </div>
                        </div>
                        
                        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                           <SectionHeader title="نسبة الكربون:النيتروجين (C:N)" icon={Activity} />
                           <div className="mt-4">
                              <div className="flex items-end gap-2">
                                 <span className="text-4xl font-bold text-amber-800">12:1</span>
                                 <span className="text-sm text-amber-700 font-medium mb-1">نسبة</span>
                              </div>
                              <p className="text-sm text-amber-700 mt-2">مثالية للتحلل المعدني (Mineralization)</p>
                              <div className="w-full bg-amber-200 h-2 rounded-full mt-4 overflow-hidden">
                                 <div className="bg-amber-600 h-full w-[60%]"></div>
                              </div>
                              <div className="flex justify-between text-[10px] text-amber-600 mt-1">
                                 <span>سريع (10:1)</span>
                                 <span>بطيء (25:1)</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div>
                        <h4 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                           <Microscope className="w-4 h-4 text-slate-500" /> النشاط الميكروبي (تقديري)
                        </h4>
                        <div className="bg-white border border-slate-200 rounded-xl p-4">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                 <Activity className="w-6 h-6 text-slate-400" />
                              </div>
                              <div className="flex-1">
                                 <div className="flex justify-between mb-1">
                                    <span className="text-sm font-bold text-slate-700">تنفس التربة</span>
                                    <span className="text-sm font-bold text-green-600">متوسط-جيد</span>
                                 </div>
                                 <div className="w-full bg-slate-100 h-2 rounded-full">
                                    <div className="bg-green-500 h-full w-[70%] rounded-full"></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* TAB 4: ACTIONS */}
               {activeTab === 'actions' && (
                  <div className="space-y-4">
                     <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide">التدخلات المقترحة</h4>
                     {selectedZone.action_plan.map((action, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors bg-white group shadow-sm">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-sm ${i===0 ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                              {i+1}
                           </div>
                           <div className="flex-1">
                              <p className="text-sm text-slate-900 font-medium leading-relaxed">{action}</p>
                              {i===0 && <span className="inline-block mt-2 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">أولوية قصوى</span>}
                           </div>
                           <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight className="w-5 h-5 text-slate-400" />
                           </div>
                        </div>
                     ))}
                     
                     <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-3">
                        <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                           <h5 className="font-bold text-yellow-800 text-sm mb-1">ملاحظة الخبير</h5>
                           <p className="text-sm text-yellow-700 italic leading-relaxed">
                              {selectedZone.zone_summary_notes}
                           </p>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>

      </div>
    </div>
  );
}

// --- Enhanced Sub-Components ---

function ExpertStat({ label, value, unit, icon: Icon, desc, status }: any) {
   const getStatusColor = (s: string) => {
      if (s === 'optimal' || s === 'high') return 'bg-green-50 border-green-100 text-green-700';
      if (s === 'warning' || s === 'low') return 'bg-orange-50 border-orange-100 text-orange-700';
      return 'bg-red-50 border-red-100 text-red-700';
   };

   return (
      <div className={`flex flex-col justify-between p-3 rounded-xl border ${getStatusColor(status)}`}>
         <div className="flex items-center gap-2 mb-2 opacity-80">
            <Icon className="w-4 h-4" />
            <span className="text-xs uppercase font-bold tracking-tight">{label}</span>
         </div>
         <div>
            <div className="flex items-baseline gap-1">
               <span className="text-2xl font-bold">{value}</span>
               <span className="text-xs font-medium opacity-70">{unit}</span>
            </div>
            <p className="text-[11px] font-medium mt-1 opacity-80 truncate">{desc}</p>
         </div>
      </div>
   );
}

function SectionHeader({ title, icon: Icon }: any) {
   return (
      <h3 className="flex items-center gap-2 text-base font-bold text-slate-800 border-b border-slate-100 pb-2">
         <Icon className="w-5 h-5 text-teal-600" />
         {title}
      </h3>
   );
}

function LargeNutrientBar({ label, value, target, unit, color, alert }: any) {
   const percent = Math.min((value / (target * 1.5)) * 100, 100);
   const targetPercent = (target / (target * 1.5)) * 100;
   
   return (
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-colors">
         <div className="flex justify-between items-end mb-2">
            <span className={`text-sm font-bold ${alert ? 'text-red-600' : 'text-slate-700'}`}>{label}</span>
            <div className="text-right">
               <span className="text-xl font-bold text-slate-900 block leading-none">{value}</span>
               <span className="text-xs text-slate-400">{unit} (Target: {target})</span>
            </div>
         </div>
         <div className="h-4 bg-slate-100 rounded-full relative overflow-hidden">
             {/* Target Marker */}
            <div className="absolute top-0 bottom-0 w-1 bg-slate-400 z-10" style={{left: `${targetPercent}%`}}></div>
            <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{width: `${percent}%`}}></div>
         </div>
         <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-medium">
            <span>منخفض</span>
            <span>مثالي</span>
            <span>مرتفع</span>
         </div>
      </div>
   );
}

function BaseStat({ label, val, target, status }: any) {
   return (
      <div className="bg-white p-2 rounded border border-slate-200 text-center">
         <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{label}</div>
         <div className="text-lg font-bold text-slate-800">{val}</div>
         <div className="text-[10px] text-green-600 font-medium bg-green-50 rounded px-1">Target: {target}</div>
      </div>
   );
}

function MicroRow({ label, val, target, unit, status }: any) {
   const isLow = val < target * 0.8;
   return (
      <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
         <span className="text-sm font-bold text-slate-700">{label}</span>
         <div className="text-right">
            <div className="text-sm font-mono font-bold text-slate-900">{val} <span className="text-[10px] text-slate-400">{unit}</span></div>
            {isLow && <span className="text-[10px] text-red-600 font-bold">Deficit (Target: {target})</span>}
         </div>
      </div>
   );
}

function InfoCard({ label, value, desc, status }: any) {
   return (
      <div className={`p-4 rounded-xl border ${status === 'warning' ? 'bg-orange-50 border-orange-100' : 'bg-white border-slate-200'}`}>
         <div className="text-xs font-bold text-slate-500 uppercase mb-1">{label}</div>
         <div className="text-lg font-bold text-slate-900">{value}</div>
         <div className={`text-xs mt-1 font-medium ${status === 'warning' ? 'text-orange-700' : 'text-slate-500'}`}>{desc}</div>
      </div>
   );
}

function TabButton({ id, label, icon: Icon, active, onClick }: any) {
   return (
      <button 
         onClick={() => onClick(id)}
         className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 text-sm font-bold transition-all border-b-[3px] ${active === id ? 'border-teal-600 text-teal-700 bg-teal-50/50' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
      >
         <Icon className={`w-4 h-4 ${active === id ? 'text-teal-600' : 'text-slate-400'}`} /> 
         <span className="text-center">{label}</span>
      </button>
   );
}
