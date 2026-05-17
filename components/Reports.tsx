import React, { useState } from 'react';
import { reportData, farmData } from '../services/mockData';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Filter, 
  Calendar,
  CheckSquare,
  Square,
  FileSpreadsheet,
  File,
  X,
  Printer
} from 'lucide-react';

export default function Reports() {
  const { reports_available, report_archive } = reportData;
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [customSections, setCustomSections] = useState<string[]>([]);
  const [viewingReport, setViewingReport] = useState<any | null>(null);

  const toggleSection = (section: string) => {
    if (customSections.includes(section)) {
      setCustomSections(customSections.filter(s => s !== section));
    } else {
      setCustomSections([...customSections, section]);
    }
  };

  const getFormatIcon = (format: string) => {
    switch(format) {
      case 'PDF': return <FileText className="w-4 h-4 text-red-500" />;
      case 'Excel': return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
      case 'CSV': return <FileText className="w-4 h-4 text-blue-500" />;
      default: return <File className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleViewReport = (report: any) => {
    setViewingReport(report);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">التقارير والتصدير</h1>
           <p className="text-slate-500">قم بإنشاء وتخصيص وتنزيل تحليلاتك.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-white border border-slate-200 rounded-lg p-1">
              {['PDF', 'Excel', 'CSV'].map(fmt => (
                 <button 
                   key={fmt}
                   onClick={() => setSelectedFormat(fmt)}
                   className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${selectedFormat === fmt ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   {fmt}
                 </button>
              ))}
           </div>
           <button className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50">
              <Calendar className="w-5 h-5 text-slate-600" />
           </button>
        </div>
      </div>

      {/* 2. Available Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {reports_available.map((report) => (
            <div key={report.report_id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col hover:border-teal-300 transition-colors group">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-teal-50 rounded-lg text-teal-600 group-hover:bg-teal-100 transition-colors">
                     <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                     {new Date(report.generated_date).toLocaleDateString('ar-DZ')}
                  </span>
               </div>
               <h3 className="font-bold text-lg text-slate-900 mb-2">{report.report_name_fr}</h3>
               <p className="text-sm text-slate-500 mb-6 flex-1">{report.description_fr}</p>
               
               <div className="flex flex-wrap gap-2 mb-6">
                  {report.content_sections.slice(0, 3).map((sec, idx) => (
                     <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                        {sec}
                     </span>
                  ))}
                  {report.content_sections.length > 3 && (
                     <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                        +{report.content_sections.length - 3}
                     </span>
                  )}
               </div>

               <div className="flex gap-2 border-t border-slate-100 pt-4">
                  <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                     <Download className="w-4 h-4" /> {selectedFormat}
                  </button>
                  <button 
                    onClick={() => handleViewReport(report)}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                  >
                     <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
         ))}
         
         {/* Custom Report Builder Card */}
         <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 flex flex-col justify-center items-center text-center hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
               <span className="text-2xl text-teal-600 font-light">+</span>
            </div>
            <h3 className="font-bold text-slate-900">تقرير مخصص</h3>
            <p className="text-sm text-slate-500 mt-2 mb-4">حدد أقساماً محددة لإنشاء تقرير فريد.</p>
            <button className="text-teal-600 font-bold text-sm hover:underline">
               ابدأ الإنشاء
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* 3. Custom Builder Panel (Mockup) */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-1">
            <h3 className="font-bold text-slate-900 mb-4">الأقسام المتاحة</h3>
            <div className="space-y-3">
               {[
                  "الملخص التنفيذي", "تحليل التربة", "توصيات المحاصيل", 
                  "الخطة الغذائية", "وقاية الأمراض", "توقعات الإنتاجية"
               ].map(section => (
                  <div 
                    key={section} 
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer"
                    onClick={() => toggleSection(section)}
                  >
                     {customSections.includes(section) 
                       ? <CheckSquare className="w-5 h-5 text-teal-600" /> 
                       : <Square className="w-5 h-5 text-slate-300" />}
                     <span className="text-sm text-slate-700">{section}</span>
                  </div>
               ))}
            </div>
            <button className="w-full mt-6 bg-slate-800 text-white font-bold py-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={customSections.length === 0}>
               إنشاء تقرير ({customSections.length})
            </button>
         </div>

         {/* 4. Archive Table */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 lg:col-span-2 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-900">الأرشيف الحديث</h3>
               <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800">
                  <Filter className="w-4 h-4" /> تصفية
               </button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-right">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                     <tr>
                        <th className="px-6 py-3">اسم التقرير</th>
                        <th className="px-6 py-3">التاريخ</th>
                        <th className="px-6 py-3">الصيغة</th>
                        <th className="px-6 py-3">الحجم</th>
                        <th className="px-6 py-3 text-left">إجراءات</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {report_archive.map((arch) => (
                        <tr key={arch.report_id} className="hover:bg-slate-50">
                           <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                              {getFormatIcon(arch.format)}
                              {arch.name}
                           </td>
                           <td className="px-6 py-4 text-slate-500">{new Date(arch.generated_date).toLocaleDateString('ar-DZ')}</td>
                           <td className="px-6 py-4">
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{arch.format}</span>
                           </td>
                           <td className="px-6 py-4 text-slate-500 font-mono" dir="ltr">{arch.file_size_mb} MB</td>
                           <td className="px-6 py-4 text-left flex gap-2">
                              <button 
                                className="text-teal-600 font-medium hover:underline" 
                                onClick={() => handleViewReport({...arch, report_name_fr: arch.name, description_fr: 'تقرير مؤرشف'})}
                              >
                                عرض
                              </button>
                              <button className="text-red-400 hover:text-red-600">X</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 border-t border-slate-100 text-center">
               <button className="text-sm text-slate-500 hover:text-slate-800 font-medium">عرض كل التاريخ</button>
            </div>
         </div>
      </div>

      {/* REPORT VIEWER MODAL */}
      {viewingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-teal-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{viewingReport.report_name_fr}</h3>
                  <p className="text-xs text-slate-500">{new Date(viewingReport.generated_date).toLocaleDateString('ar-DZ', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg">
                  <Printer className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg">
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewingReport(null)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content - Document View */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-100">
              <div className="max-w-3xl mx-auto bg-white min-h-[1000px] shadow-sm border border-slate-200 p-12">
                {/* Document Header */}
                <div className="flex justify-between items-end border-b-2 border-teal-600 pb-6 mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">أجري سمارت</h1>
                    <p className="text-sm text-slate-500">منصة ذكاء زراعي متقدمة</p>
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-slate-800">{viewingReport.report_name_fr}</h2>
                    <p className="text-sm text-slate-500">رقم التقرير: {viewingReport.report_id}</p>
                  </div>
                </div>

                {/* Farm Info */}
                <div className="grid grid-cols-2 gap-8 mb-8 bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">المزرعة</h4>
                    <p className="font-bold text-slate-900">{farmData.farm.name}</p>
                    <p className="text-sm text-slate-600">{farmData.farm.location}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">المالك</h4>
                    <p className="font-bold text-slate-900">{farmData.farm.owner}</p>
                    <p className="text-sm text-slate-600">{new Date().toLocaleDateString('ar-DZ')}</p>
                  </div>
                </div>

                {/* Dynamic Content based on report type (Mocked) */}
                <div className="space-y-6">
                  {viewingReport.report_type === 'nutrient_optimization' ? (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">تحليل العناصر الغذائية</h3>
                      <table className="w-full text-sm text-right mb-6">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="p-2">العنصر</th>
                            <th className="p-2">الحالي</th>
                            <th className="p-2">المستهدف</th>
                            <th className="p-2">الحالة</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="p-2">النيتروجين</td>
                            <td className="p-2">45</td>
                            <td className="p-2">60</td>
                            <td className="p-2 text-orange-600 font-bold">منخفض</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-2">الفوسفور</td>
                            <td className="p-2">12</td>
                            <td className="p-2">20</td>
                            <td className="p-2 text-orange-600 font-bold">منخفض</td>
                          </tr>
                          <tr>
                            <td className="p-2">البوتاسيوم</td>
                            <td className="p-2">180</td>
                            <td className="p-2">150</td>
                            <td className="p-2 text-green-600 font-bold">جيد</td>
                          </tr>
                        </tbody>
                      </table>

                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">توصيات التسميد</h3>
                      <div className="space-y-4">
                        <div className="bg-white border border-slate-200 p-4 rounded">
                          <h4 className="font-bold text-slate-800">NPK 15:10:20</h4>
                          <p className="text-sm text-slate-600">الكمية: 500 كغ</p>
                          <p className="text-sm text-slate-600">التكلفة المقدرة: 17,500 دج</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded">
                          <h4 className="font-bold text-slate-800">نترات الكالسيوم</h4>
                          <p className="text-sm text-slate-600">الكمية: 100 كغ</p>
                          <p className="text-sm text-slate-600">التكلفة المقدرة: 4,500 دج</p>
                        </div>
                      </div>
                    </>
                  ) : viewingReport.report_type === 'disease_prevention' ? (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">تقييم المخاطر</h3>
                      <div className="p-4 bg-red-50 border-r-4 border-red-500 rounded mb-4">
                        <h4 className="font-bold text-red-800">خطر عالي: لفحة السنابل الفيوزارية</h4>
                        <p className="text-sm text-red-700 mt-1">تم اكتشاف ظروف مواتية (رطوبة عالية + حرارة دافئة).</p>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mt-6">جدول الوقاية</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                        <li><strong>اليوم 5:</strong> رشة وقائية بمبيد تيبوكونازول.</li>
                        <li><strong>اليوم 25:</strong> فحص ميداني للأعراض.</li>
                        <li><strong>اليوم 40:</strong> رشة ثانية (أزوكسي ستروبين) إذا استمرت الرطوبة.</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">ملخص تنفيذي</h3>
                      <p className="text-sm text-slate-700 leading-relaxed mb-4">
                        تظهر المزرعة أداءً عاماً جيداً بنتيجة صحة تربة تبلغ 78/100. ومع ذلك، هناك مؤشرات على نقص في النيتروجين والفوسفور في الحقل الشمالي قد تؤثر على محصول القمح القادم إذا لم تتم معالجتها.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed mb-6">
                        نوصي بالبدء الفوري في خطة التسميد المقترحة ومراقبة مستويات الرطوبة لتجنب تفشي الأمراض الفطرية المتوقعة.
                      </p>
                      
                      <div className="h-64 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                        [مخطط بياني لصحة التربة]
                      </div>
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
                  <p>تم إنشاء هذا التقرير آلياً بواسطة منصة أجري سمارت.</p>
                  <p>للمزيد من المعلومات، يرجى زيارة موقعنا أو الاتصال بالدعم الفني.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}