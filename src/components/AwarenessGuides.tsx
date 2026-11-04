import React, { useState } from 'react';
import { AWARENESS_GUIDES } from '../data/mockData';
import { 
  BookOpen, 
  Flame, 
  Droplets, 
  Sun, 
  Wind, 
  PhoneCall, 
  Printer, 
  Share2, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  Check
} from 'lucide-react';

export const AwarenessGuides: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('guide-fire');
  const [copied, setCopied] = useState(false);

  const activeGuide = AWARENESS_GUIDES.find(g => g.id === selectedGuideId) || AWARENESS_GUIDES[0];

  const handleShare = () => {
    navigator.clipboard.writeText(`[دليل السلامة - SANAD ALERT]: ${activeGuide.title}\n${activeGuide.subtitle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/50 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
              <BookOpen className="w-6 h-6" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">قوالب وأدلة التوعية الجاهزة للمواطنين والمتطوعين</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            إرشادات وقائية مبسطة ومعتمدة من الحماية المدنية ومصالح الأرصاد والبيئة للتصرف السليم أثناء الطوارئ
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="self-start sm:self-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2 transition"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>طباعة المطوية التوعوية</span>
        </button>
      </div>

      {/* Guide Category Selectors (Page 13 replica) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'guide-fire', title: 'حرائق الغابات', icon: <Flame className="w-6 h-6" />, color: 'border-red-500 text-red-400 hover:bg-red-950/30', activeBg: 'bg-red-950/60 border-red-500 text-white' },
          { id: 'guide-flood', title: 'الأمطار والفيضانات', icon: <Droplets className="w-6 h-6" />, color: 'border-blue-500 text-blue-400 hover:bg-blue-950/30', activeBg: 'bg-blue-950/60 border-blue-500 text-white' },
          { id: 'guide-heatwave', title: 'موجات الحر الشديدة', icon: <Sun className="w-6 h-6" />, color: 'border-amber-500 text-amber-400 hover:bg-amber-950/30', activeBg: 'bg-amber-950/60 border-amber-500 text-white' },
          { id: 'guide-storm', title: 'العواصف والرياح', icon: <Wind className="w-6 h-6" />, color: 'border-purple-500 text-purple-400 hover:bg-purple-950/30', activeBg: 'bg-purple-950/60 border-purple-500 text-white' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedGuideId(item.id)}
            className={`p-4 rounded-2xl border-2 transition flex flex-col items-center justify-center gap-2 text-center shadow-lg ${
              selectedGuideId === item.id ? item.activeBg : `bg-slate-900 border-slate-800 ${item.color}`
            }`}
          >
            {item.icon}
            <span className="font-bold text-xs sm:text-sm">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Active Guide Detailed Sheet */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 inline-block mb-2">
              دليل السلامة الميداني المعتمد
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{activeGuide.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{activeGuide.subtitle}</p>
          </div>

          <button
            onClick={handleShare}
            className="self-start sm:self-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ الرابط' : 'مشاركة الدليل'}</span>
          </button>
        </div>

        {/* 3 Chronological Phases: قبل - أثناء - بعد */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Phase 1: Before */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm border-b border-slate-800 pb-2">
              <Shield className="w-4 h-4" />
              <span>1. قبل وقوع الخطر (الوقاية والاستعداد)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeGuide.instructions.before.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phase 2: During */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-rose-900/40 bg-gradient-to-b from-rose-950/20 to-slate-950 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm border-b border-slate-800 pb-2">
              <AlertCircle className="w-4 h-4" />
              <span>2. أثناء وقوع الخطر (التصرف السليم)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeGuide.instructions.during.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phase 3: After */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>3. بعد انتهاء الخطر (التعافي والإسناد)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeGuide.instructions.after.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Emergency Call Action strip */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span className="font-bold">أرقام الاتصال المباشرة الخاصة بهذه الحالة:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeGuide.emergencyNumbers.map((num, i) => (
              <a
                key={i}
                href={`tel:${num.number}`}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1.5 font-mono font-bold transition"
              >
                <span className="text-[11px] text-slate-400 font-sans">{num.label}:</span>
                <span className="text-amber-400 text-xs">{num.number}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
