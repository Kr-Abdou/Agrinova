import React, { useState } from 'react';
import { settingsData } from '../services/mockData';
import { 
  User, 
  MapPin, 
  Bell, 
  CreditCard, 
  Smartphone, 
  HelpCircle, 
  Shield, 
  Save,
  Trash2,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, farm, notifications, subscription, connected_sensors, billing_history } = settingsData;

  const tabs = [
    { id: 'profile', label: 'ملف المزرعة', icon: MapPin },
    { id: 'user', label: 'المستخدم', icon: User },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'billing', label: 'الاشتراك', icon: CreditCard },
    { id: 'devices', label: 'الأجهزة', icon: Smartphone },
    { id: 'support', label: 'الدعم والقانونية', icon: HelpCircle },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">الإعدادات</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             {tabs.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-r-4 ${activeTab === tab.id ? 'bg-teal-50 text-teal-700 border-teal-500' : 'text-slate-600 hover:bg-slate-50 border-transparent'}`}
               >
                 <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-teal-600' : 'text-slate-400'}`} />
                 {tab.label}
               </button>
             ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* TAB: FARM PROFILE */}
          {activeTab === 'profile' && (
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">ملف المزرعة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">اسم المزرعة</label>
                      <input type="text" defaultValue={farm.name} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">المنطقة / الموقع</label>
                      <input type="text" defaultValue={farm.location.region} className="w-full p-2 border border-slate-300 rounded-lg" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">المساحة (هكتار)</label>
                      <input type="number" defaultValue={farm.size_hectares} className="w-full p-2 border border-slate-300 rounded-lg" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">نوع الزراعة</label>
                      <select className="w-full p-2 border border-slate-300 rounded-lg bg-white">
                         <option>زراعة تجارية</option>
                         <option>عضوية</option>
                         <option>معيشية</option>
                      </select>
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-slate-700">المحاصيل الرئيسية</label>
                      <div className="flex gap-4">
                         {['قمح لين', 'شعير', 'طماطم', 'حمضيات'].map(crop => (
                            <label key={crop} className="flex items-center gap-2 text-sm text-slate-600">
                               <input type="checkbox" defaultChecked={farm.crops.includes(crop.toLowerCase()) || (crop === 'قمح لين' || crop === 'شعير')} className="rounded text-teal-600 focus:ring-teal-500" />
                               {crop}
                            </label>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="pt-4 flex justify-end">
                   <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2">
                      <Save className="w-4 h-4" /> حفظ
                   </button>
                </div>
             </div>
          )}

          {/* TAB: USER SETTINGS */}
          {activeTab === 'user' && (
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">إعدادات المستخدم</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">الاسم الكامل</label>
                      <input type="text" defaultValue={user.name} className="w-full p-2 border border-slate-300 rounded-lg" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">البريد الإلكتروني</label>
                      <input type="email" defaultValue={user.email} className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50" readOnly />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">اللغة</label>
                      <select className="w-full p-2 border border-slate-300 rounded-lg bg-white" defaultValue="ar">
                         <option value="ar">العربية</option>
                         <option value="fr">Français</option>
                         <option value="en">English</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">الوحدات</label>
                      <select className="w-full p-2 border border-slate-300 rounded-lg bg-white" defaultValue={user.units}>
                         <option value="metric">متري (هكتار، كغ، °م)</option>
                         <option value="imperial">إمبراطوري (فدان، باوند، °ف)</option>
                      </select>
                   </div>
                </div>
                <div className="pt-4 flex justify-end">
                   <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2">
                      <Save className="w-4 h-4" /> حفظ
                   </button>
                </div>
             </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">تفضيلات الإشعارات</h2>
                
                <div className="space-y-4">
                   <div className="flex items-center justify-between py-2">
                      <div>
                         <h3 className="text-sm font-medium text-slate-900">إشعارات الدفع (Push)</h3>
                         <p className="text-xs text-slate-500">تلقي تنبيهات على جهازك المحمول</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" className="sr-only peer" defaultChecked={notifications.push_enabled} />
                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                   </div>
                   
                   <div className="flex items-center justify-between py-2 border-t border-slate-100">
                      <div>
                         <h3 className="text-sm font-medium text-slate-900">تنبيهات البريد الإلكتروني</h3>
                         <p className="text-xs text-slate-500">تلقي التقارير والملخصات عبر البريد</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" className="sr-only peer" defaultChecked={notifications.email_enabled} />
                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                   </div>

                   <div className="pt-4 space-y-3">
                      <h3 className="text-sm font-bold text-slate-900">أنواع التنبيهات</h3>
                      <label className="flex items-center gap-3">
                         <input type="checkbox" defaultChecked={notifications.disease_risk_alerts} className="rounded text-teal-600 focus:ring-teal-500" />
                         <span className="text-sm text-slate-700">مخاطر الأمراض</span>
                      </label>
                      <label className="flex items-center gap-3">
                         <input type="checkbox" defaultChecked={notifications.nutrient_deficiency_alerts} className="rounded text-teal-600 focus:ring-teal-500" />
                         <span className="text-sm text-slate-700">نقص العناصر الغذائية</span>
                      </label>
                      <label className="flex items-center gap-3">
                         <input type="checkbox" defaultChecked={notifications.sensor_offline_alerts} className="rounded text-teal-600 focus:ring-teal-500" />
                         <span className="text-sm text-slate-700">حالة المستشعرات (البطارية/غير متصل)</span>
                      </label>
                   </div>
                </div>
                <div className="pt-4 flex justify-end">
                   <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700">
                      حفظ التفضيلات
                   </button>
                </div>
             </div>
          )}

          {/* TAB: SUBSCRIPTION */}
          {activeTab === 'billing' && (
             <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <h2 className="text-lg font-bold text-slate-900">الاشتراك الحالي</h2>
                         <p className="text-sm text-slate-500">الخطة: <span className="font-bold text-slate-800">{subscription.plan}</span></p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">نشط</span>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-slate-50 p-4 rounded-lg">
                         <div className="text-xs text-slate-500 uppercase mb-1">التكلفة الشهرية</div>
                         <div className="text-xl font-bold text-slate-900" dir="ltr">{subscription.cost_per_month_dzd.toLocaleString()} DZD</div>
                         <div className="text-xs text-slate-400">التجديد: {new Date(subscription.renewal_date).toLocaleDateString('ar-DZ')}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                         <div className="text-xs text-slate-500 uppercase mb-1">طريقة الدفع</div>
                         <div className="text-lg font-medium text-slate-900 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-slate-400" /> {subscription.payment_method}
                         </div>
                         <button className="text-xs text-teal-600 hover:underline mt-1">تغيير</button>
                      </div>
                   </div>
                   <button className="text-teal-600 font-bold text-sm border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50">
                      ترقية الخطة
                   </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <h2 className="text-lg font-bold text-slate-900 mb-4">سجل المدفوعات</h2>
                   <table className="w-full text-sm text-right">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                         <tr>
                            <th className="px-4 py-3 rounded-r-lg">التاريخ</th>
                            <th className="px-4 py-3">المبلغ</th>
                            <th className="px-4 py-3 rounded-l-lg">الحالة</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {billing_history.map((bill, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                               <td className="px-4 py-3">{new Date(bill.date).toLocaleDateString('ar-DZ')}</td>
                               <td className="px-4 py-3 font-mono" dir="ltr">{bill.amount_dzd.toLocaleString()} DZD</td>
                               <td className="px-4 py-3 text-green-600 font-medium">{bill.status}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          )}

          {/* TAB: SENSORS */}
          {activeTab === 'devices' && (
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                   <h2 className="text-lg font-bold text-slate-900">الأجهزة المتصلة</h2>
                   <button className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800">
                      <Plus className="w-4 h-4" /> إضافة
                   </button>
                </div>
                
                <div className="space-y-4">
                   {connected_sensors.map(sensor => (
                      <div key={sensor.sensor_id} className="border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                         <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                               <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                               <h3 className="font-bold text-slate-900">{sensor.name}</h3>
                               <p className="text-xs text-slate-500">{sensor.sensor_id} • {sensor.zone}</p>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-4 text-sm w-full md:w-auto justify-between md:justify-end">
                            <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span> {sensor.status}</span>
                            <span className="text-slate-500">{sensor.battery_percent}% بطارية</span>
                            <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* TAB: SUPPORT & LEGAL */}
          {activeTab === 'support' && (
             <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <h2 className="text-lg font-bold text-slate-900 mb-4">هل تحتاج مساعدة؟</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-right">
                         <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><HelpCircle className="w-5 h-5" /></div>
                         <div>
                            <div className="font-bold text-slate-800">الأسئلة الشائعة</div>
                            <div className="text-xs text-slate-500">إجابات على الأسئلة الشائعة</div>
                         </div>
                      </button>
                      <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-right">
                         <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ExternalLink className="w-5 h-5" /></div>
                         <div>
                            <div className="font-bold text-slate-800">التوثيق</div>
                            <div className="text-xs text-slate-500">أدلة استخدام مفصلة</div>
                         </div>
                      </button>
                   </div>
                   <button className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700">
                      اتصل بالدعم
                   </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-slate-400" /> منطقة الخطر
                   </h2>
                   <p className="text-sm text-slate-500 mb-4">إجراءات لا رجعة فيها تتعلق بحسابك وبياناتك.</p>
                   <div className="flex flex-col sm:flex-row gap-4">
                      <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50">
                         تصدير بياناتي
                      </button>
                      <button className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg font-medium hover:bg-red-100">
                         حذف الحساب
                      </button>
                   </div>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}