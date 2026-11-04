import React, { useState } from 'react';
import { 
  AlertItem, 
  Volunteer, 
  IncidentReport, 
  Campaign 
} from '../types';
import { 
  Flame, 
  Wind, 
  Sun, 
  Users, 
  Building2, 
  Calendar, 
  AlertTriangle, 
  PhoneCall, 
  Layers, 
  Compass, 
  CheckCircle2,
  Share2
} from 'lucide-react';

interface InteractiveMapProps {
  alerts: AlertItem[];
  volunteers: Volunteer[];
  reports: IncidentReport[];
  campaigns: Campaign[];
  onSelectVolunteer?: (v: Volunteer) => void;
  onOpenReportModal?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  alerts,
  volunteers,
  reports,
  campaigns,
  onSelectVolunteer,
  onOpenReportModal
}) => {
  const [filter, setFilter] = useState<'all' | 'incidents' | 'volunteers' | 'centers' | 'campaigns'>('all');
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'alert' | 'volunteer' | 'report' | 'campaign' | 'center';
    data: any;
  } | null>(null);

  // Notable Youth Centers in Jijel
  const youthCenters = [
    {
      id: 'yc-1',
      name: 'ديوان مؤسسات الشباب لولاية جيجل (ODEJ)',
      commune: 'جيجل مركز',
      type: 'مقر ولائي وتنسيق عمليات',
      coordinates: { x: 48, y: 32 },
      phone: '034 47 12 30',
      volunteersCount: 312
    },
    {
      id: 'yc-2',
      name: 'المركب الرياضي الجواري حمدلو عبد السلام',
      commune: 'الميلية',
      type: 'مركز تعبئة وتدريب شبابي',
      coordinates: { x: 82, y: 60 },
      phone: '034 52 80 15',
      volunteersCount: 218
    },
    {
      id: 'yc-3',
      name: 'دار الشباب تاكسنة',
      commune: 'تاكسنة',
      type: 'نقطة ارتكاز للتدخل والإنذار الغابي',
      coordinates: { x: 42, y: 64 },
      phone: '034 49 33 20',
      volunteersCount: 145
    },
    {
      id: 'yc-4',
      name: 'دار الشباب العوانة',
      commune: 'العوانة',
      type: 'مركز الإغاثة الساحلية',
      coordinates: { x: 28, y: 44 },
      phone: '034 48 11 90',
      volunteersCount: 171
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Filter Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">الخريطة التفاعلية للمخاطر والموارد الميدانية</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            رصد مباشر: الحوادث النشطة، مواقع المتطوعين، المراكز الشبانية، وحملات الاستجابة بإقليم ولاية جيجل
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { setFilter('all'); setSelectedEntity(null); }}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              filter === 'all' ? 'bg-rose-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => { setFilter('incidents'); setSelectedEntity(null); }}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
              filter === 'incidents' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-300" />
            <span>الحوادث والتنبيهات ({alerts.length + reports.length})</span>
          </button>
          <button
            onClick={() => { setFilter('volunteers'); setSelectedEntity(null); }}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
              filter === 'volunteers' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-300" />
            <span>المتطوعون المتاحون ({volunteers.filter(v => v.isAvailableNow).length})</span>
          </button>
          <button
            onClick={() => { setFilter('centers'); setSelectedEntity(null); }}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
              filter === 'centers' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span>المراكز الشبانية ({youthCenters.length})</span>
          </button>
          <button
            onClick={() => { setFilter('campaigns'); setSelectedEntity(null); }}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
              filter === 'campaigns' ? 'bg-cyan-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-300" />
            <span>الحملات ({campaigns.length})</span>
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative w-full h-[540px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden select-none">
        
        {/* SVG Topographical Coastline & Mountain Terrain Background */}
        <svg 
          viewBox="0 0 1000 650" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
        >
          <defs>
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#082f49" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Mediterranean Sea outline */}
          <path 
            d="M 0 0 L 1000 0 L 1000 160 Q 800 140 600 170 T 300 150 Q 150 160 0 140 Z" 
            fill="url(#seaGradient)" 
          />
          {/* Waves / Coastal contour lines */}
          <path d="M 0 140 Q 200 165 400 150 T 800 155 Q 900 145 1000 160" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 0 145 Q 250 170 500 155 T 900 165 Q 950 155 1000 165" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 4" fill="none" opacity="0.4" />

          {/* Mountains & Hills relief contours (Babor & Collo ranges around Jijel) */}
          <path d="M 100 650 Q 200 450 350 480 T 600 380 Q 750 420 900 650 Z" fill="#047857" opacity="0.08" />
          <path d="M 300 650 Q 450 350 550 400 T 850 650 Z" fill="#065f46" opacity="0.07" />
          <path d="M 50 550 Q 150 380 280 430 T 450 650 Z" fill="#064e3b" opacity="0.09" />

          {/* Road Network connections */}
          <path d="M 50 150 L 300 160 L 500 175 L 800 180 L 980 200" stroke="#475569" strokeWidth="3" fill="none" strokeDasharray="8 4" opacity="0.5" />
          <path d="M 500 175 L 450 380 L 420 520 L 400 650" stroke="#475569" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.4" />
          <path d="M 500 175 L 650 300 L 800 420 L 850 600" stroke="#475569" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.4" />

          {/* Region Boundaries */}
          <circle cx="500" cy="180" r="180" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" />
          <circle cx="800" cy="400" r="140" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" />
        </svg>

        {/* Region Labels */}
        <div className="absolute top-8 left-8 text-sky-400 font-mono text-xs flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-sky-900/60 pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
          <span>البحر الأبيض المتوسط — ساحل ولاية جيجل</span>
        </div>

        <div className="absolute top-[22%] left-[45%] text-slate-400 text-xs font-bold pointer-events-none tracking-widest">
          جيجل (مركز)
        </div>
        <div className="absolute top-[26%] left-[24%] text-slate-400 text-xs font-bold pointer-events-none">
          العوانة
        </div>
        <div className="absolute top-[26%] left-[62%] text-slate-400 text-xs font-bold pointer-events-none">
          الشقفة
        </div>
        <div className="absolute top-[48%] left-[78%] text-slate-400 text-xs font-bold pointer-events-none">
          الميلية
        </div>
        <div className="absolute top-[52%] left-[40%] text-slate-400 text-xs font-bold pointer-events-none">
          تاكسنة
        </div>
        <div className="absolute top-[42%] left-[50%] text-slate-400 text-xs font-bold pointer-events-none">
          قاوس
        </div>

        {/* --- MAP PINS LAYER --- */}

        {/* 1. Alerts & Reports Pins (Red / Orange / Yellow) */}
        {(filter === 'all' || filter === 'incidents') && (
          <>
            {/* Urgent Fire Alert Pin (Takseena) */}
            <div 
              style={{ top: '56%', left: '42%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => setSelectedEntity({ type: 'alert', data: alerts[0] })}
            >
              <div className="relative">
                <span className="absolute -inset-3 rounded-full bg-red-600/30 animate-ping"></span>
                <span className="absolute -inset-1.5 rounded-full bg-red-600/60 animate-pulse"></span>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 border-2 border-white flex items-center justify-center shadow-xl shadow-red-950/80 transform group-hover:scale-110 transition">
                  <Flame className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-950/90 text-red-200 border border-red-700/80 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                حريق غابات تاكسنة
              </div>
            </div>

            {/* Warning Wind Alert Pin (Coast/Aouana) */}
            <div 
              style={{ top: '24%', left: '30%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => setSelectedEntity({ type: 'alert', data: alerts[1] })}
            >
              <div className="relative">
                <span className="absolute -inset-2 rounded-full bg-amber-500/30 animate-pulse"></span>
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Wind className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-950/90 text-amber-200 border border-amber-700/80 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                رياح بحرية قوية
              </div>
            </div>

            {/* Notice Heat Alert Pin (El Milia) */}
            <div 
              style={{ top: '44%', left: '76%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => setSelectedEntity({ type: 'alert', data: alerts[2] })}
            >
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-600 border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-yellow-950/90 text-yellow-200 border border-yellow-700/80 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                ارتفاع درجات الحرارة
              </div>
            </div>

            {/* User Incident Reports Pins */}
            {reports.map((report) => (
              <div
                key={report.id}
                style={{ top: `${report.coordinates.y}%`, left: `${report.coordinates.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => setSelectedEntity({ type: 'report', data: report })}
              >
                <div className="relative">
                  <span className="absolute -inset-1 rounded-full bg-rose-500/40 animate-ping"></span>
                  <div className="w-7 h-7 rounded-full bg-rose-700 border-2 border-rose-200 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white border border-slate-700 text-[9px] px-1.5 py-0.2 rounded shadow">
                  بلاغ: {report.commune}
                </div>
              </div>
            ))}
          </>
        )}

        {/* 2. Volunteers Pins (Emerald Green) */}
        {(filter === 'all' || filter === 'volunteers') && (
          <>
            {volunteers.map((vol) => (
              <div
                key={vol.id}
                style={{ top: `${vol.coordinates.y}%`, left: `${vol.coordinates.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => {
                  setSelectedEntity({ type: 'volunteer', data: vol });
                  if (onSelectVolunteer) onSelectVolunteer(vol);
                }}
              >
                <div className="relative">
                  {vol.isAvailableNow && (
                    <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-pulse"></span>
                  )}
                  <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-xl transition group-hover:scale-125 ${
                    vol.isAvailableNow 
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-500' 
                      : 'bg-slate-700 opacity-60'
                  }`}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-emerald-300 border border-emerald-800/80 text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                  <span>{vol.name}</span>
                  {vol.isAvailableNow && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                </div>
              </div>
            ))}
          </>
        )}

        {/* 3. Youth Centers Pins (Blue) */}
        {(filter === 'all' || filter === 'centers') && (
          <>
            {youthCenters.map((center) => (
              <div
                key={center.id}
                style={{ top: `${center.coordinates.y}%`, left: `${center.coordinates.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => setSelectedEntity({ type: 'center', data: center })}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-950/95 text-blue-200 border border-blue-800 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {center.commune}
                </div>
              </div>
            ))}
          </>
        )}

        {/* 4. Campaigns Pins (Cyan/Purple) */}
        {(filter === 'all' || filter === 'campaigns') && (
          <>
            {campaigns.map((cmp) => (
              <div
                key={cmp.id}
                style={{ top: `${cmp.coordinates.y}%`, left: `${cmp.coordinates.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => setSelectedEntity({ type: 'campaign', data: cmp })}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-600 border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-teal-950/95 text-teal-200 border border-teal-800 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {cmp.categoryLabel}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Selected Entity Card Modal Overlay in Map bottom-left */}
        {selectedEntity && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 bg-slate-900/95 border border-slate-700 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-3">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5 mb-2.5">
              <div className="flex items-center gap-2">
                {selectedEntity.type === 'alert' && <Flame className="w-5 h-5 text-red-500" />}
                {selectedEntity.type === 'volunteer' && <Users className="w-5 h-5 text-emerald-400" />}
                {selectedEntity.type === 'center' && <Building2 className="w-5 h-5 text-blue-400" />}
                {selectedEntity.type === 'campaign' && <Calendar className="w-5 h-5 text-teal-400" />}
                {selectedEntity.type === 'report' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {selectedEntity.type === 'alert' && selectedEntity.data.title}
                    {selectedEntity.type === 'volunteer' && selectedEntity.data.name}
                    {selectedEntity.type === 'center' && selectedEntity.data.name}
                    {selectedEntity.type === 'campaign' && selectedEntity.data.title}
                    {selectedEntity.type === 'report' && selectedEntity.data.type}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {selectedEntity.data.commune || selectedEntity.data.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Body of selected entity */}
            {selectedEntity.type === 'alert' && (
              <div className="space-y-2 text-xs">
                <p className="text-slate-300 leading-relaxed">{selectedEntity.data.description}</p>
                <div className="bg-red-950/50 border border-red-900/60 p-2 rounded-lg text-red-300 text-[11px]">
                  <span className="font-bold">توصيات السلامة: </span>
                  {selectedEntity.data.recommendations[0]}
                </div>
                <div className="flex justify-between items-center pt-1 text-[11px] text-slate-400">
                  <span>المصدر: {selectedEntity.data.source}</span>
                  <a href="tel:14" className="text-red-400 font-bold hover:underline flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" />
                    <span>اتصل بـ 14</span>
                  </a>
                </div>
              </div>
            )}

            {selectedEntity.type === 'volunteer' && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">التخصص الأساسي:</span>
                  <span className="font-semibold text-emerald-400">{selectedEntity.data.specialtyLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الحالة الميدانية:</span>
                  <span className={`font-semibold ${selectedEntity.data.isAvailableNow ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {selectedEntity.data.isAvailableNow ? '● متاح حالياً للتدخل' : '○ غير متاح حالياً'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">المسافة المقدرة:</span>
                  <span className="font-mono text-cyan-400">{selectedEntity.data.distanceMeters || 650} متر</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${selectedEntity.data.phone.replace(/\s+/g, '')}`}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-center flex items-center justify-center gap-1 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>اتصال مباشر</span>
                  </a>
                  <button
                    onClick={() => {
                      alert(`تم إرسال إشعار طلب مساعدة فورية إلى المتطوع: ${selectedEntity.data.name}`);
                    }}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium text-center transition"
                  >
                    طلب مساعدة
                  </button>
                </div>
              </div>
            )}

            {selectedEntity.type === 'center' && (
              <div className="space-y-2 text-xs">
                <p className="text-slate-300">{selectedEntity.data.type}</p>
                <div className="flex items-center justify-between text-slate-400">
                  <span>المتطوعون المسجلون:</span>
                  <span className="font-bold text-blue-400">{selectedEntity.data.volunteersCount} متطوع</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>هاتف المؤسسة:</span>
                  <span className="font-mono text-slate-200">{selectedEntity.data.phone}</span>
                </div>
              </div>
            )}

            {selectedEntity.type === 'campaign' && (
              <div className="space-y-2 text-xs">
                <p className="text-slate-300">{selectedEntity.data.description}</p>
                <div className="flex items-center justify-between text-slate-400">
                  <span>الموعد:</span>
                  <span className="font-semibold text-teal-300">{selectedEntity.data.date}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>المشاركون:</span>
                  <span className="font-bold text-teal-400">{selectedEntity.data.registeredVolunteers} / {selectedEntity.data.neededVolunteers}</span>
                </div>
              </div>
            )}

            {selectedEntity.type === 'report' && (
              <div className="space-y-2 text-xs">
                <p className="text-slate-300">{selectedEntity.data.description}</p>
                <div className="flex items-center justify-between text-slate-400">
                  <span>توقيت البلاغ:</span>
                  <span className="font-mono text-amber-300">{selectedEntity.data.time}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>الحالة:</span>
                  <span className="font-bold text-emerald-400">تم التوجيه للجهات المختصة ✓</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Map Legend Overlay (Top Right) */}
        <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[11px] space-y-1.5 shadow-xl hidden sm:block">
          <div className="font-bold text-slate-300 text-xs mb-1">دليل الرموز:</div>
          <div className="flex items-center gap-2 text-red-400">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
            <span>إنذار عاجل / حريق</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span>تحذير / رياح قوية</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span>متطوع متاح</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <span className="w-3 h-3 rounded-md bg-blue-600 inline-block"></span>
            <span>مؤسسة شبانية</span>
          </div>
          <div className="flex items-center gap-2 text-teal-400">
            <span className="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>
            <span>حملة تطوعية</span>
          </div>
        </div>

        {/* Floating Quick Action inside Map */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {onOpenReportModal && (
            <button
              onClick={onOpenReportModal}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg shadow-red-950/50 flex items-center gap-1.5 transition"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>أبلغ عن حادث هنا</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
