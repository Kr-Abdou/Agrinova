import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cropRecommendations, farmData } from '../services/mockData';
import { 
  CheckCircle2, 
  Droplets, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  Sprout,
  AlertTriangle,
  Bug,
  Leaf,
  Clock,
  Save,
  Layers,
  Zap,
  Share2,
  Globe
} from 'lucide-react';

export default function CropRecommendations() {
  const navigate = useNavigate();
  const { zones } = farmData;
  
  // State
  const [selectedZoneId, setSelectedZoneId] = useState(zones[0].id);
  // We'll initialize selectedCropId in a useEffect based on the zone
  const [selectedCropId, setSelectedCropId] = useState<string>(''); 
  const [showMoreCrops, setShowMoreCrops] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Accordion States
  const [accordions, setAccordions] = useState({
    suitability: true,
    metrics: true,
    requirements: false,
    pests: false,
    market: false
  });

  const toggleAccordion = (key: keyof typeof accordions) => {
    setAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- Dynamic Data Logic ---
  const getZoneCrops = (zoneId: string) => {
    // Clone the base data to avoid mutating the original import
    let baseCrops = JSON.parse(JSON.stringify(cropRecommendations));
    
    // Simulate algorithmic scoring based on Zone characteristics
    if (zoneId === 'Z-002') { 
        // South Field: Saline/Clay/Hot -> Favor Dates, Barley
        return baseCrops.map((c: any) => {
            if (c.crop_id === 'date_palm') return { ...c, suitability_score: 94, rank: 1 };
            if (c.crop_id === 'barley') return { ...c, suitability_score: 89, rank: 2 };
            if (c.crop_id === 'olive') return { ...c, suitability_score: 75, rank: 3 };
            return { ...c, suitability_score: Math.max(30, c.suitability_score - 20) };
        }).sort((a: any, b: any) => b.suitability_score - a.suitability_score);
    } 
    else if (zoneId === 'Z-003') {
        // Orchard: Loam/Good Water -> Favor Citrus, Tomato, Olive
         return baseCrops.map((c: any) => {
            if (c.crop_id === 'citrus') return { ...c, suitability_score: 96, rank: 1 };
            if (c.crop_id === 'tomato') return { ...c, suitability_score: 92, rank: 2 };
            if (c.crop_id === 'olive') return { ...c, suitability_score: 88, rank: 3 };
            return { ...c, suitability_score: Math.max(40, c.suitability_score - 15) };
        }).sort((a: any, b: any) => b.suitability_score - a.suitability_score);
    }
    
    // Default (North Field): Wheat, Barley
    return baseCrops.sort((a: any, b: any) => b.suitability_score - a.suitability_score);
  };

  const currentZoneCrops = getZoneCrops(selectedZoneId);
  const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0];
  
  // Effect to select the top crop when zone changes
  useEffect(() => {
      if (currentZoneCrops.length > 0) {
          setSelectedCropId(currentZoneCrops[0].crop_id);
      }
  }, [selectedZoneId]);

  const selectedCrop = currentZoneCrops.find((c: any) => c.crop_id === selectedCropId) || currentZoneCrops[0];
  
  const topCrops = currentZoneCrops.slice(0, 3);
  const extraCrops = currentZoneCrops.slice(3);
  const alternativeCrops = currentZoneCrops.filter((c: any) => c.crop_id !== selectedCropId);

  // --- Handlers ---
  const handleNutrientPlan = () => {
    navigate('/nutrients');
  };

  const handleSchedule = () => {
    navigate('/nutrients'); 
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // --- Benchmark Data Helper ---
  const getBenchmarks = (cropId: string) => {
    const standards: Record<string, any> = {
        'soft_wheat': {
            ph: { min: 6.0, max: 7.0, ideal: 6.5 },
            ec: { min: 0, max: 1.7, ideal: 1.0 },
            n: { min: 50, max: 70, ideal: 60 },
            p: { min: 20, max: 30, ideal: 25 },
            k: { min: 150, max: 200, ideal: 180 }
        },
        'barley': {
            ph: { min: 6.0, max: 7.5, ideal: 6.8 },
            ec: { min: 0, max: 2.5, ideal: 1.5 },
            n: { min: 40, max: 60, ideal: 50 },
            p: { min: 15, max: 25, ideal: 20 },
            k: { min: 120, max: 180, ideal: 150 }
        },
        'tomato': {
            ph: { min: 6.0, max: 6.8, ideal: 6.5 },
            ec: { min: 0, max: 1.5, ideal: 1.0 },
            n: { min: 80, max: 120, ideal: 100 },
            p: { min: 40, max: 60, ideal: 50 },
            k: { min: 200, max: 300, ideal: 250 }
        },
        'citrus': {
            ph: { min: 6.0, max: 7.5, ideal: 6.5 },
            ec: { min: 0, max: 1.2, ideal: 0.8 },
            n: { min: 100, max: 200, ideal: 150 },
            p: { min: 15, max: 30, ideal: 20 },
            k: { min: 100, max: 200, ideal: 150 }
        },
        'olive': {
            ph: { min: 5.5, max: 8.5, ideal: 7.0 },
            ec: { min: 0, max: 3.0, ideal: 1.5 },
            n: { min: 40, max: 80, ideal: 60 },
            p: { min: 10, max: 20, ideal: 15 },
            k: { min: 100, max: 250, ideal: 200 }
        },
        'date_palm': {
            ph: { min: 7.0, max: 8.5, ideal: 7.5 },
            ec: { min: 0, max: 8.0, ideal: 4.0 },
            n: { min: 150, max: 300, ideal: 220 },
            p: { min: 30, max: 60, ideal: 45 },
            k: { min: 200, max: 400, ideal: 300 }
        },
        // Default fallbacks
        'default': {
            ph: { min: 6.0, max: 7.0, ideal: 6.5 },
            ec: { min: 0.5, max: 1.5, ideal: 1.0 },
            n: { min: 50, max: 80, ideal: 65 },
            p: { min: 20, max: 40, ideal: 30 },
            k: { min: 150, max: 250, ideal: 200 }
        }
    };
    return standards[cropId] || standards['default'];
  };

  const benchmarks = getBenchmarks(selectedCropId);

  // Helpers
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 70) return 'bg-amber-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getScoreBadgeColor = (score: number) => {
     if (score >= 85) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
     if (score >= 70) return 'bg-amber-100 text-amber-800 border-amber-200';
     if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
     return 'bg-red-100 text-red-800 border-red-200';
  }

  const getSuitabilityLabel = (score: number) => {
    if (score >= 85) return 'ممتاز';
    if (score >= 70) return 'جيد';
    if (score >= 50) return 'مقبول';
    return 'ضعيف';
  };

  // If data isn't loaded yet
  if (!selectedCrop) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-32 font-sans text-slate-800 relative" dir="rtl">
      
      {/* COMPACT STICKY HEADER - SINGLE ROW */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
            
            {/* Zone Selector */}
            <div className="relative min-w-[220px] shrink-0">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <MapPin className="w-4 h-4" />
                </div>
                <select 
                    value={selectedZoneId}
                    onChange={(e) => setSelectedZoneId(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-sm font-bold text-slate-800 py-2 pr-9 pl-8 rounded-lg focus:outline-none focus:border-teal-500 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                    {zones.map(z => (
                    <option key={z.id} value={z.id}>{z.name} - {z.name_fr}</option>
                    ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-slate-200 shrink-0 hidden sm:block"></div>

            {/* Soil Stats Row */}
            <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-max px-2">
                <CompactSoilStat label="التربة" value={selectedZone.soil_foundation.soil_type} icon={Layers} />
                <CompactSoilStat label="pH" value={selectedZone.soil_foundation.pH} icon={FlaskIcon} />
                <CompactSoilStat label="EC" value={selectedZone.soil_foundation.EC_dS_per_m} icon={Zap} />
                <CompactSoilStat label="العضوية" value={`${selectedZone.soil_foundation.organic_matter_percent}%`} icon={Sprout} />
            </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* TOP RECOMMENDATIONS GRID */}
        <section>
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="bg-teal-100 p-1.5 rounded-lg text-teal-700"><Sprout className="w-4 h-4" /></div>
                <h2 className="text-base font-bold text-slate-800">أفضل المحاصيل لمنطقتك</h2>
             </div>
             <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {selectedZone.name}
             </span>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topCrops.map((crop: any, idx: number) => (
                 <CropCard 
                    key={crop.crop_id} 
                    crop={crop} 
                    rank={idx + 1} 
                    isSelected={selectedCropId === crop.crop_id}
                    onSelect={() => setSelectedCropId(crop.crop_id)}
                    getScoreColor={getScoreColor}
                    getSuitabilityLabel={getSuitabilityLabel}
                    getScoreBadgeColor={getScoreBadgeColor}
                 />
              ))}
              
              {showMoreCrops && extraCrops.map((crop: any, idx: number) => (
                 <CropCard 
                    key={crop.crop_id} 
                    crop={crop} 
                    rank={idx + 4} 
                    isSelected={selectedCropId === crop.crop_id}
                    onSelect={() => setSelectedCropId(crop.crop_id)}
                    getScoreColor={getScoreColor}
                    getSuitabilityLabel={getSuitabilityLabel}
                    getScoreBadgeColor={getScoreBadgeColor}
                    compact
                 />
              ))}
           </div>
           
           {/* Expand/Collapse Button */}
           <div className="mt-4 flex justify-center">
             {!showMoreCrops ? (
               <button 
                  onClick={() => setShowMoreCrops(true)}
                  className="px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-teal-600 transition-all flex items-center gap-2 shadow-sm"
               >
                  <ChevronDown className="w-3 h-3" /> عرض المزيد
               </button>
             ) : (
               <button 
                  onClick={() => setShowMoreCrops(false)}
                  className="px-6 py-2 bg-slate-100 rounded-full text-slate-500 font-bold text-xs hover:bg-slate-200 transition-all flex items-center gap-2"
               >
                  <ChevronUp className="w-3 h-3" /> إخفاء
               </button>
             )}
           </div>
        </section>

        {/* DETAILED ANALYSIS (SELECTED CROP) */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0">
              <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mb-1">التحليل المفصل</div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                     {selectedCrop.crop_name} <span className="hidden sm:inline text-slate-400 font-normal text-sm">/ {selectedCrop.crop_name_ar}</span>
                  </h2>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                  <img src={selectedCrop.image_url} alt={selectedCrop.crop_name} className="w-full h-full object-cover" />
              </div>
           </div>

           <div className="divide-y divide-slate-100">
               {/* 1. Suitability & Benchmark */}
               <AccordionSection 
                  title="تحليل التوافق والمعايير الدولية" 
                  subtitle="مقارنة تربتك مع المعايير العالمية المثالية لهذا المحصول"
                  icon={Globe}
                  isOpen={accordions.suitability}
                  onToggle={() => toggleAccordion('suitability')}
               >
                  <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                     <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        المقارنة المعيارية (Benchmark)
                     </h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <BenchmarkRow 
                           label="درجة الحموضة (pH)" 
                           current={selectedZone.soil_foundation.pH} 
                           ideal={benchmarks.ph.ideal} 
                           range={[benchmarks.ph.min, benchmarks.ph.max]}
                           unit=""
                        />
                        <BenchmarkRow 
                           label="الملوحة (EC)" 
                           current={selectedZone.soil_foundation.EC_dS_per_m} 
                           ideal={benchmarks.ec.ideal} 
                           range={[benchmarks.ec.min, benchmarks.ec.max]}
                           unit="dS/m"
                           inverse={true} // Lower is usually better for EC
                        />
                        <BenchmarkRow 
                           label="النيتروجين (N)" 
                           current={selectedZone.macronutrients.nitrogen_current_mg_per_kg} 
                           ideal={benchmarks.n.ideal} 
                           range={[benchmarks.n.min, benchmarks.n.max]}
                           unit="ppm"
                        />
                        <BenchmarkRow 
                           label="الفوسفور (P)" 
                           current={selectedZone.macronutrients.phosphorus_current_mg_per_kg} 
                           ideal={benchmarks.p.ideal} 
                           range={[benchmarks.p.min, benchmarks.p.max]}
                           unit="ppm"
                        />
                         <BenchmarkRow 
                           label="البوتاسيوم (K)" 
                           current={selectedZone.macronutrients.potassium_current_mg_per_kg} 
                           ideal={benchmarks.k.ideal} 
                           range={[benchmarks.k.min, benchmarks.k.max]}
                           unit="ppm"
                        />
                     </div>
                     <p className="text-xs text-slate-500 mt-4 text-center border-t border-slate-200 pt-3">
                        * المعايير المستندة إلى بيانات منظمة الأغذية والزراعة (FAO) للمناخ المتوسطي.
                     </p>
                  </div>
               </AccordionSection>

               {/* 2. Key Metrics */}
               <AccordionSection 
                  title="المؤشرات الاقتصادية والإنتاجية" 
                  subtitle="العائد المتوقع والربحية"
                  icon={TrendingUp}
                  isOpen={accordions.metrics}
                  onToggle={() => toggleAccordion('metrics')}
               >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                     <StatCard label="الإنتاجية المتوقعة" value={`${selectedCrop.expected_yield_tons_per_hectare || 4.5} طن`} sub="للهكتار" />
                     <StatCard label="مدة الموسم" value={`${selectedCrop.growing_season_days}`} sub="يوم" />
                     <StatCard label="سعر السوق" value={`${selectedCrop.market_price_dzd_per_kg || 190} دج`} sub="للكيلوغرام" />
                     <StatCard label="الربحية" value={selectedCrop.profitability} sub="التقدير" highlight />
                  </div>
               </AccordionSection>

               {/* 3. Requirements */}
               <AccordionSection 
                  title="المتطلبات الزراعية" 
                  subtitle="الري، التسميد، والجدول الزمني"
                  icon={Calendar}
                  isOpen={accordions.requirements}
                  onToggle={() => toggleAccordion('requirements')}
               >
                  <div className="space-y-6">
                     {/* Timeline */}
                     <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> الجدول الزمني</h4>
                        <div className="flex items-center gap-2 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                           <div className="flex-1 text-center border-l border-slate-200 pl-2">
                              <span className="block text-[10px] sm:text-xs text-slate-500 mb-1">البذر</span>
                              <span className="font-bold text-slate-800 text-xs sm:text-sm">{new Date(selectedCrop.planting_window_start || '').toLocaleDateString('ar-DZ', {month:'short', day:'numeric'})}</span>
                           </div>
                           <div className="flex-1 text-center border-l border-slate-200 pl-2">
                              <span className="block text-[10px] sm:text-xs text-slate-500 mb-1">الحصاد</span>
                              <span className="font-bold text-slate-800 text-xs sm:text-sm">{new Date(selectedCrop.harvest_window_end || '').toLocaleDateString('ar-DZ', {month:'short', day:'numeric'})}</span>
                           </div>
                           <div className="flex-1 text-center">
                              <span className="block text-[10px] sm:text-xs text-slate-500 mb-1">المدة</span>
                              <span className="font-bold text-slate-800 text-xs sm:text-sm">{selectedCrop.growing_season_days} يوم</span>
                           </div>
                        </div>
                     </div>

                     {/* Nutrients */}
                     <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Leaf className="w-4 h-4 text-slate-400" /> احتياجات التسميد (NPK)</h4>
                        <div className="flex gap-4">
                            <NutrientBadge label="N" value={benchmarks.n.ideal} name="نيتروجين" />
                            <NutrientBadge label="P" value={benchmarks.p.ideal} name="فوسفور" />
                            <NutrientBadge label="K" value={benchmarks.k.ideal} name="بوتاسيوم" />
                        </div>
                        <button 
                           onClick={handleNutrientPlan}
                           className="text-teal-600 text-sm font-bold mt-3 hover:underline"
                        >
                           عرض خطة التسميد الكاملة ←
                        </button>
                     </div>

                     {/* Water */}
                     <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Droplets className="w-4 h-4 text-slate-400" /> الري</h4>
                        <div className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                           يحتاج <strong>{selectedCrop.water_requirements}</strong>. يوصى بالري {selectedZone.water_resources.irrigation_method}.
                        </div>
                     </div>
                  </div>
               </AccordionSection>

               {/* 4. Risks */}
               <AccordionSection 
                  title="المخاطر والآفات" 
                  subtitle="الأمراض المحتملة واستراتيجيات الوقاية"
                  icon={Bug}
                  isOpen={accordions.pests}
                  onToggle={() => toggleAccordion('pests')}
               >
                  <div className="space-y-3">
                     {selectedCrop.disease_susceptibilities.map((disease: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
                           <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                           <div>
                              <h5 className="font-bold text-red-900 text-sm">{disease}</h5>
                              <p className="text-xs text-red-700 mt-1">المكافحة: رش وقائي في مرحلة الإزهار، تجنب الرطوبة العالية.</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </AccordionSection>
           </div>
        </section>

        {/* ALTERNATIVES CAROUSEL */}
        <section>
           <h2 className="text-lg font-bold text-slate-800 mb-4">بدائل أخرى قد تهمك</h2>
           <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide flex gap-4">
              {alternativeCrops.slice(0, 5).map((crop: any) => (
                 <div 
                    key={crop.crop_id} 
                    onClick={() => setSelectedCropId(crop.crop_id)}
                    className="min-w-[160px] bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center text-center cursor-pointer hover:border-teal-400 hover:shadow-md transition-all group"
                 >
                    <div className="w-16 h-16 rounded-full bg-slate-100 mb-3 overflow-hidden group-hover:scale-105 transition-transform">
                        <img src={crop.image_url} alt={crop.crop_name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{crop.crop_name}</h3>
                    <span className="text-xs text-slate-500 mb-2">{crop.crop_name_ar}</span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full mb-3">{crop.suitability_score}% جيد</span>
                    <button className="w-full mt-auto py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-200">
                       عرض التفاصيل
                    </button>
                 </div>
              ))}
           </div>
        </section>

      </div>

      {/* STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30 md:pl-64">
         <div className="max-w-4xl mx-auto flex flex-wrap gap-3 items-center justify-between">
            <div className="hidden sm:block">
                <div className="text-xs text-slate-500 font-medium">المحصول المحدد</div>
                <div className="font-bold text-slate-900">{selectedCrop.crop_name}</div>
            </div>
            
            <div className="flex gap-2 flex-1 sm:flex-none">
                <button 
                  onClick={handleSave}
                  className={`flex-1 sm:flex-none bg-white border ${isSaved ? 'border-teal-500 text-teal-600' : 'border-slate-300 text-slate-700'} h-12 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors`}
                >
                    <Save className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} /> 
                    <span className="hidden xs:inline">{isSaved ? 'تم الحفظ' : 'حفظ'}</span>
                </button>
                <button 
                  onClick={handleSchedule}
                  className="flex-1 sm:flex-none bg-amber-500 text-white h-12 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors shadow-sm shadow-amber-200"
                >
                    <Calendar className="w-4 h-4" /> جدولة
                </button>
                <button 
                  onClick={handleNutrientPlan}
                  className="flex-[2] sm:flex-none bg-teal-600 text-white h-12 px-8 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-sm shadow-teal-200"
                >
                    <Leaf className="w-4 h-4" /> خطة التغذية
                </button>
            </div>
         </div>
      </div>

    </div>
  );
}

// --- Component Helpers ---

function BenchmarkRow({ label, current, ideal, range, unit, inverse }: any) {
    const [min, max] = range;
    
    // Normalize values to percentage (0-100) relative to a bit wider than min/max
    const span = max - min;
    const padding = span * 0.5; // Add padding to view
    const displayMin = Math.max(0, min - padding);
    const displayMax = max + padding;
    const totalSpan = displayMax - displayMin;

    const toPercent = (val: number) => Math.min(100, Math.max(0, ((val - displayMin) / totalSpan) * 100));

    const currentPos = toPercent(current);
    const idealPos = toPercent(ideal);
    const rangeStart = toPercent(min);
    const rangeWidth = toPercent(max) - rangeStart;
    
    // Determine status
    const isOptimal = current >= min && current <= max;
    const statusText = isOptimal ? 'مثالي' : (inverse ? (current > max ? 'مرتفع' : 'منخفض') : (current < min ? 'منخفض' : 'مرتفع'));
    const statusColor = isOptimal ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-amber-600 bg-amber-50 border-amber-200';

    return (
        <div>
            <div className="flex justify-between items-end mb-1.5">
                <div>
                   <span className="text-xs font-bold text-slate-700 block">{label}</span>
                   <span className="text-[10px] text-slate-400">النطاق المثالي: {min} - {max}</span>
                </div>
                <div className="text-right">
                   <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-bold text-slate-900" dir="ltr">{current} {unit}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${statusColor}`}>{statusText}</span>
                   </div>
                </div>
            </div>
            
            {/* Visualization Bar */}
            <div className="relative h-6 w-full bg-slate-100 rounded-md overflow-hidden border border-slate-200">
                {/* Acceptable Range (Green Zone) */}
                <div 
                   className="absolute top-0 bottom-0 bg-emerald-200/50 border-x border-emerald-300"
                   style={{ left: `${rangeStart}%`, width: `${rangeWidth}%` }}
                ></div>
                
                {/* Ideal Marker */}
                <div 
                   className="absolute top-0 bottom-0 w-0.5 bg-emerald-600 z-10 opacity-60"
                   style={{ left: `${idealPos}%` }}
                ></div>
                
                {/* Your Value Marker */}
                <div 
                   className={`absolute top-1 bottom-1 w-1.5 rounded-full z-20 shadow-sm border border-white ${isOptimal ? 'bg-emerald-600' : 'bg-amber-500'}`}
                   style={{ left: `${currentPos}%`, transform: 'translateX(-50%)' }}
                ></div>
                
                {/* Legend Labels (Optional: Ideal vs You) */}
                <div 
                   className="absolute top-0 bottom-0 w-full flex items-center text-[8px] text-slate-400 font-bold px-1 pointer-events-none select-none"
                   style={{ opacity: 0 }} // Hidden visually but keeps structure if needed later
                >
                   Benchmark
                </div>
            </div>
            
            {/* Legend for context */}
            <div className="flex justify-between text-[9px] text-slate-400 mt-0.5 font-mono">
               <span>{displayMin.toFixed(1)}</span>
               <span>{displayMax.toFixed(1)}</span>
            </div>
        </div>
    );
}

function CompactSoilStat({ label, value, icon: Icon }: any) {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg">
            <Icon className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex flex-col leading-none">
               <span className="text-[10px] text-slate-400 font-medium">{label}</span>
               <span className="text-sm font-bold text-slate-700">{value}</span>
            </div>
        </div>
    );
}

function CropCard({ crop, rank, isSelected, onSelect, getScoreColor, getSuitabilityLabel, getScoreBadgeColor, compact }: any) {
   return (
      <div 
         onClick={onSelect}
         className={`relative bg-white border rounded-2xl flex flex-col sm:flex-row overflow-hidden cursor-pointer transition-all duration-200 group ${isSelected ? 'border-teal-500 ring-1 ring-teal-500 shadow-md' : 'border-slate-200 hover:border-teal-300 hover:shadow-md'}`}
      >
         {/* Rank Badge */}
         <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-slate-900/90 backdrop-blur text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
             #{rank}
         </div>

         {/* Image */}
         <div className={`sm:w-32 bg-slate-100 shrink-0 relative ${compact ? 'h-32 sm:h-auto' : 'h-40 sm:h-auto'}`}>
            <img src={crop.image_url} alt={crop.crop_name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden"></div>
            <div className="absolute bottom-3 right-3 text-white font-bold text-lg sm:hidden shadow-black drop-shadow-md">
                {crop.crop_name}
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 p-5 flex flex-col justify-center gap-3">
            <div className="hidden sm:flex justify-between items-start">
               <div>
                   <h3 className="text-lg font-bold text-slate-900">{crop.crop_name}</h3>
                   <p className="text-sm text-slate-500">{crop.crop_name_ar}</p>
               </div>
               <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadgeColor(crop.suitability_score)}`}>
                  {crop.suitability_score}% {getSuitabilityLabel(crop.suitability_score)}
               </span>
            </div>
            
            {/* Mobile Badge (visible only on small screens) */}
            <div className="sm:hidden flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadgeColor(crop.suitability_score)}`}>
                  {crop.suitability_score}% {getSuitabilityLabel(crop.suitability_score)}
               </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(crop.suitability_score)}`} style={{width: `${crop.suitability_score}%`}}></div>
            </div>

            {/* Details Grid */}
            {!compact && (
               <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-1">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">الربحية</span>
                     <span className="font-bold text-emerald-600">{crop.profitability}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">السعر</span>
                     <span className="font-bold text-slate-700">{crop.market_price_dzd_per_kg || 190} دج</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">الموسم</span>
                     <span className="font-bold text-slate-700">{crop.growing_season_days} يوم</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">الإنتاج</span>
                     <span className="font-bold text-slate-700">{crop.expected_yield_tons_per_hectare} طن</span>
                  </div>
               </div>
            )}
            
            {compact && (
                <div className="flex gap-3 text-xs text-slate-500">
                    <span>⏱ {crop.growing_season_days} يوم</span>
                    <span>💰 {crop.profitability}</span>
                </div>
            )}
         </div>
         
         {/* Action Area */}
         <div className="p-4 sm:p-5 sm:border-r border-slate-100 flex flex-col justify-center items-center bg-slate-50 sm:bg-transparent">
             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 transition-colors ${isSelected ? 'border-teal-500 bg-teal-500 text-white' : 'border-slate-300 text-transparent group-hover:border-teal-400'}`}>
                 <CheckCircle2 className="w-4 h-4" />
             </div>
             <span className={`text-xs font-bold ${isSelected ? 'text-teal-600' : 'text-slate-400'}`}>
                 {isSelected ? 'تم الاختيار' : 'اختيار'}
             </span>
         </div>
      </div>
   );
}

function AccordionSection({ title, subtitle, icon: Icon, isOpen, onToggle, children }: any) {
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button 
                onClick={onToggle}
                className={`w-full flex items-center justify-between p-5 text-right transition-colors ${isOpen ? 'bg-slate-50/50' : 'hover:bg-slate-50'}`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${isOpen ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className={`font-bold text-base ${isOpen ? 'text-teal-900' : 'text-slate-800'}`}>{title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-300" />}
            </button>
            
            {isOpen && (
                <div className="p-5 pt-2 animation-slide-down">
                    {children}
                </div>
            )}
        </div>
    );
}

function InfoCheck({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 text-sm text-slate-700">
            <div className="min-w-[5px] h-[5px] rounded-full bg-teal-500" />
            <span>{text}</span>
        </div>
    )
}

function StatCard({ label, value, sub, highlight }: any) {
    return (
        <div className={`p-4 rounded-xl border flex flex-col items-center text-center ${highlight ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <div className={`text-lg font-bold ${highlight ? 'text-emerald-700' : 'text-slate-900'}`}>{value}</div>
            {sub && <div className="text-[10px] text-slate-400">{sub}</div>}
        </div>
    )
}

function NutrientBadge({ label, value, name }: any) {
    return (
        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-slate-800">{value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">{label}</div>
            <div className="text-[10px] text-slate-500">{name}</div>
        </div>
    )
}

// Icons
const FlaskIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>;
