import React, { useState } from 'react';
import { 
  AlertItem, 
  Volunteer, 
  IncidentReport, 
  Campaign, 
  VolunteerHourRecord 
} from '../types';
import { 
  Flame, 
  Wind, 
  Sun, 
  CheckCircle, 
  Bell, 
  MapPin, 
  Users, 
  Calendar, 
  User, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  Star, 
  Award, 
  Clock, 
  SlidersHorizontal, 
  Send, 
  CreditCard, 
  Info,
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';

interface MobileAppSimulatorProps {
  alerts: AlertItem[];
  volunteers: Volunteer[];
  reports: IncidentReport[];
  campaigns: Campaign[];
  onOpenReportModal: () => void;
  onOpenCardModal: (volunteer: Volunteer) => void;
  onOpenCertModal: () => void;
}

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({
  alerts,
  volunteers,
  reports,
  campaigns,
  onOpenReportModal,
  onOpenCardModal,
  onOpenCertModal,
}) => {
  const [mobileTab, setMobileTab] = useState<'home' | 'alerts' | 'map' | 'volunteers' | 'profile'>('home');
  const [alertFilter, setAlertFilter] = useState<'all' | 'urgent' | 'warning' | 'notice' | 'normal'>('all');
  const [mapFilter, setMapFilter] = useState<'all' | 'incidents' | 'volunteers' | 'centers'>('all');
  const [selectedMobileVolunteer, setSelectedMobileVolunteer] = useState<Volunteer>(volunteers[1] || volunteers[0]);
  const [requestedHelp, setRequestedHelp] = useState(false);

  // Current active user for profile screen
  const currentUser = volunteers[0];

  return (
    <div className="flex flex-col items-center justify-center py-4">
      
      {/* Mobile Device Frame Container */}
      <div className="relative w-full max-w-[390px] h-[810px] bg-slate-950 rounded-[48px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-700 select-none flex flex-col justify-between">
        
        {/* Device Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-3"></div>
          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
        </div>

        {/* Mobile Status Bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-mono text-slate-300 z-40">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">5G</span>
            <span>📶</span>
            <span>🔋 98%</span>
          </div>
        </div>

        {/* Inner Screen Scroll Area */}
        <div className="flex-1 overflow-y-auto rounded-[36px] bg-slate-900 text-slate-100 flex flex-col justify-between relative scrollbar-none">
          
          {/* TAB 1: HOME (الرئيسية - Replica of PDF page 2 mockup #1) */}
          {mobileTab === 'home' && (
            <div className="p-4 space-y-3 pb-16">
              
              {/* App Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm font-black text-white leading-tight">SANAD ALERT</h1>
                    <span className="text-[10px] text-slate-400">الحالة الحالية في جيجل</span>
                  </div>
                </div>
                <button
                  onClick={onOpenReportModal}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>بلاغ عاجل</span>
                </button>
              </div>

              {/* Big Status Alert Box (تنبيه: مستوى الخطر متوسط) */}
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 p-4 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold bg-black/15 px-2 py-0.5 rounded-full inline-block mb-1">
                      تنبيه: مستوى الخطر متوسط
                    </span>
                    <h3 className="text-base font-black leading-tight">ارتفاع في درجات الحرارة</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center text-xl">
                    🌡️
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-black/15 text-[11px] font-medium space-y-1">
                  <div className="font-bold">توصيات السلامة العاجلة:</div>
                  <div className="flex items-center gap-1">
                    <span>•</span>
                    <span>تجنب الخروج وقت الذروة (11:00 - 16:00)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>•</span>
                    <span>اشرب الماء بكثرة للأطفال وكبار السن</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>•</span>
                    <span>حافظ على تهوية الأماكن المغلقة</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setMobileTab('alerts')}
                  className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right space-y-1 hover:border-slate-700 transition"
                >
                  <Bell className="w-5 h-5 text-rose-500" />
                  <div className="font-bold text-white text-xs">تنبيهات فورية</div>
                  <div className="text-[10px] text-slate-400">آخر النشرات والإنذارات</div>
                </button>

                <button
                  onClick={() => setMobileTab('map')}
                  className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right space-y-1 hover:border-slate-700 transition"
                >
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <div className="font-bold text-white text-xs">خريطة المخاطر</div>
                  <div className="text-[10px] text-slate-400">تتبع البؤر والمتطوعين</div>
                </button>

                <button
                  onClick={() => setMobileTab('volunteers')}
                  className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right space-y-1 hover:border-slate-700 transition"
                >
                  <Users className="w-5 h-5 text-amber-400" />
                  <div className="font-bold text-white text-xs">أقرب متطوع إليك</div>
                  <div className="text-[10px] text-slate-400">إسعافات وتدخل سريع</div>
                </button>

                <button
                  onClick={onOpenCertModal}
                  className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right space-y-1 hover:border-slate-700 transition"
                >
                  <Award className="w-5 h-5 text-cyan-400" />
                  <div className="font-bold text-white text-xs">شهادة 5000 ساعة</div>
                  <div className="text-[10px] text-slate-400">السجل الوطني والخبرة</div>
                </button>
              </div>

              {/* Quick Stats (03 الحوادث النشطة | 24 المتطوعين متاحين | 12 تنبيهات اليوم) */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 mb-2 font-semibold">إحصائيات سريعة للولاية:</div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="border-l border-slate-800">
                    <span className="text-lg font-black text-red-500 font-mono block">03</span>
                    <span className="text-[10px] text-slate-400">الحوادث النشطة</span>
                  </div>
                  <div className="border-l border-slate-800">
                    <span className="text-lg font-black text-emerald-400 font-mono block">24</span>
                    <span className="text-[10px] text-slate-400">متطوع متاح</span>
                  </div>
                  <div>
                    <span className="text-lg font-black text-amber-400 font-mono block">12</span>
                    <span className="text-[10px] text-slate-400">تنبيهات اليوم</span>
                  </div>
                </div>
              </div>

              {/* Motto from PDF */}
              <div className="bg-rose-950/30 border border-rose-900/40 p-2.5 rounded-xl text-center text-xs text-rose-300 font-bold">
                "معاً.. نستجيب بسرعة ونحمي مجتمعنا"
              </div>
            </div>
          )}

          {/* TAB 2: ALERTS (التنبيهات - Replica of PDF page 2 mockup #2) */}
          {mobileTab === 'alerts' && (
            <div className="p-4 space-y-3 pb-16">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h2 className="text-base font-black text-white">التنبيهات والإنذارات</h2>
                <span className="text-xs text-slate-400 font-mono">{alerts.length} نشرات</span>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-1 overflow-x-auto text-[11px] pb-1">
                {[
                  { key: 'all', label: 'الكل' },
                  { key: 'urgent', label: 'عالي' },
                  { key: 'notice', label: 'متوسط' },
                  { key: 'normal', label: 'منخفض' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setAlertFilter(item.key as any)}
                    className={`px-3 py-1 rounded-full border transition whitespace-nowrap font-medium ${
                      alertFilter === item.key
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Alert items */}
              <div className="space-y-2">
                {alerts.map(a => (
                  <div
                    key={a.id}
                    className={`p-3 rounded-2xl border text-xs space-y-1.5 transition ${
                      a.level === 'urgent'
                        ? 'bg-red-950/40 border-red-800'
                        : a.level === 'warning'
                        ? 'bg-orange-950/30 border-orange-800'
                        : a.level === 'notice'
                        ? 'bg-amber-950/30 border-amber-800'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5">
                        {a.level === 'urgent' ? <Flame className="w-4 h-4 text-red-500" /> :
                         a.level === 'warning' ? <Wind className="w-4 h-4 text-orange-400" /> :
                         a.level === 'notice' ? <Sun className="w-4 h-4 text-amber-400" /> :
                         <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        <span className="font-bold text-white text-xs">{a.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{a.timestamp}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">{a.description}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px]">
                      <span className="text-slate-400">{a.location}</span>
                      <a href="tel:14" className="text-red-400 font-bold hover:underline">
                        الحماية 14
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MAP (الخريطة - Replica of PDF page 2 mockup #3) */}
          {mobileTab === 'map' && (
            <div className="h-full relative flex flex-col justify-between pb-16">
              
              {/* Map header */}
              <div className="p-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs z-20">
                <span className="font-bold text-white">خريطة جيجل التفاعلية</span>
                <div className="flex gap-1 text-[10px]">
                  <button onClick={() => setMapFilter('all')} className="px-2 py-0.5 rounded bg-rose-600 text-white">الكل</button>
                  <button onClick={() => setMapFilter('incidents')} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">الحوادث</button>
                  <button onClick={() => setMapFilter('volunteers')} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">المتطوعون</button>
                </div>
              </div>

              {/* Map Background visual */}
              <div className="relative flex-1 bg-slate-950 overflow-hidden">
                <svg viewBox="0 0 400 450" className="w-full h-full object-cover opacity-50">
                  <path d="M 0 0 L 400 0 L 400 90 Q 250 80 150 95 T 0 85 Z" fill="#0369a1" />
                  <path d="M 50 450 Q 150 250 250 300 T 400 450 Z" fill="#065f46" opacity="0.3" />
                  <path d="M 0 90 Q 150 100 250 90 T 400 95" stroke="#38bdf8" strokeWidth="2" fill="none" />
                </svg>

                {/* Simulated Pins */}
                {/* Fire Pin */}
                <div className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-red-600/40 animate-ping"></span>
                    <div className="w-8 h-8 rounded-full bg-red-600 border border-white flex items-center justify-center text-white text-xs shadow-lg">
                      🔥
                    </div>
                  </div>
                </div>

                {/* Volunteer Pin */}
                <div className="absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 border border-white flex items-center justify-center text-white text-xs shadow-lg">
                    👤
                  </div>
                </div>

                {/* Center Pin */}
                <div className="absolute top-[48%] left-[75%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 border border-white flex items-center justify-center text-white text-xs shadow-lg">
                    🏛️
                  </div>
                </div>
              </div>

              {/* Floating Bottom Card: Fire details */}
              <div className="p-3 bg-slate-950/95 border-t border-slate-800 space-y-2 z-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <div>
                      <h4 className="font-bold text-white text-xs">حريق غابات تاكسنة</h4>
                      <span className="text-[10px] text-slate-400">تاكسنة - جيجل | اليوم 10:45</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('تفاصيل الحريق: حريق غابي كثيف، فرق الحماية تتدخل')}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold rounded-lg"
                  >
                    تفاصيل
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: NEAREST VOLUNTEER (أقرب متطوع - Replica of PDF page 2 mockup #4) */}
          {mobileTab === 'volunteers' && (
            <div className="h-full relative flex flex-col justify-between pb-16">
              
              {/* Header */}
              <div className="p-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs z-20">
                <span className="font-bold text-white">أقرب متطوع متاح</span>
                <span className="text-[10px] text-emerald-400 font-bold">● متصل الآن</span>
              </div>

              {/* Map background showing proximity */}
              <div className="relative flex-1 bg-slate-950 overflow-hidden flex items-center justify-center">
                {/* Distance circles */}
                <div className="w-64 h-64 rounded-full border border-emerald-500/20 flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full border border-emerald-500/30 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-emerald-500/50 flex items-center justify-center animate-pulse">
                      {/* You pin */}
                      <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow"></div>
                    </div>
                  </div>
                </div>

                {/* Volunteer Pin */}
                <div className="absolute top-[38%] left-[58%] -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white text-sm shadow-xl font-bold">
                    {selectedMobileVolunteer.name.slice(0, 1)}
                  </div>
                  <span className="text-[9px] bg-slate-950 px-1 rounded text-emerald-300 font-bold">450 متر</span>
                </div>
              </div>

              {/* Bottom Volunteer Profile Card */}
              <div className="p-3.5 bg-slate-950 border-t border-slate-800 space-y-2.5 z-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-600 flex items-center justify-center font-bold text-white text-sm">
                      {selectedMobileVolunteer.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-xs">{selectedMobileVolunteer.name}</h4>
                        <span className="text-amber-400 text-[10px] flex items-center">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>4.9</span>
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-300 block">450 متر عنك • {selectedMobileVolunteer.commune}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    متاح
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-900 p-2 rounded-xl">
                  تخصص: <strong>{selectedMobileVolunteer.specialtyLabel}</strong>
                </div>

                {/* Call & Help Action Buttons */}
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setRequestedHelp(true);
                      setTimeout(() => setRequestedHelp(false), 2500);
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{requestedHelp ? 'تم إرسال الطلب بنجاح ✓' : 'طلب مساعدة فورية'}</span>
                  </button>

                  <a
                    href={`tel:${selectedMobileVolunteer.phone.replace(/\s+/g, '')}`}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 border border-slate-700"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                    <span>اتصال مباشر</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: PROFILE (ملفي الشخصي - Replica of PDF page 2 mockup #7) */}
          {mobileTab === 'profile' && (
            <div className="p-4 space-y-3.5 pb-16">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h2 className="text-base font-black text-white">ملفي الشخصي</h2>
                <button 
                  onClick={() => onOpenCardModal(currentUser)}
                  className="text-[11px] text-amber-400 flex items-center gap-1 hover:underline"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>بطاقتي الرقمية</span>
                </button>
              </div>

              {/* Profile Card Header */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-600 flex items-center justify-center font-black text-white text-xl mx-auto shadow-lg border-2 border-emerald-400">
                  {currentUser.name.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{currentUser.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-0.5 text-xs">
                    <span className="text-emerald-400 font-semibold">متطوع نشط</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-amber-400 flex items-center gap-0.5 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{currentUser.rating}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Details List */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">الموقع:</span>
                  <span className="text-slate-200 font-semibold">{currentUser.wilaya} — {currentUser.commune}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">التخصص:</span>
                  <span className="text-emerald-400 font-bold">{currentUser.specialtyLabel}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">رقم الهاتف:</span>
                  <span className="font-mono text-slate-200">{currentUser.phone}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">حالة التوفر:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>متاح الآن</span>
                  </span>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-lg font-black text-white font-mono block">12</span>
                  <span className="text-[11px] text-slate-400">سجل التدخلات</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-lg font-black text-amber-400 font-mono block">5</span>
                  <span className="text-[11px] text-slate-400">الشهادات والدورات</span>
                </div>
              </div>

              {/* National Cert Button */}
              <button
                onClick={onOpenCertModal}
                className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>الرصيد الوطني للخبرة ({currentUser.totalHours} / 5000 س)</span>
              </button>
            </div>
          )}

          {/* Bottom Mobile Tab Bar (Replica of PDF page 2) */}
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px] font-medium z-30">
            
            <button
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center gap-0.5 transition ${
                mobileTab === 'home' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>الرئيسية</span>
            </button>

            <button
              onClick={() => setMobileTab('alerts')}
              className={`flex flex-col items-center gap-0.5 transition ${
                mobileTab === 'alerts' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>تنبيهات</span>
            </button>

            <button
              onClick={() => setMobileTab('map')}
              className={`flex flex-col items-center gap-0.5 transition ${
                mobileTab === 'map' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>خريطة</span>
            </button>

            <button
              onClick={() => setMobileTab('volunteers')}
              className={`flex flex-col items-center gap-0.5 transition ${
                mobileTab === 'volunteers' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>المتطوعون</span>
            </button>

            <button
              onClick={() => setMobileTab('profile')}
              className={`flex flex-col items-center gap-0.5 transition ${
                mobileTab === 'profile' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>ملفي</span>
            </button>

          </div>

        </div>

        {/* Device Bottom Home Bar Indicator */}
        <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2"></div>

      </div>

      {/* Simulator Switcher Hint */}
      <div className="text-center text-xs text-slate-400 mt-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>محاكي تطبيق الهاتف الذكي (Mobile App PWA Preview) — متوافق مع نظامي Android و iOS</span>
      </div>

    </div>
  );
};
