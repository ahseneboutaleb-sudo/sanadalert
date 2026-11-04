import React from 'react';
import { AlertItem, Volunteer, Campaign } from '../types';
import { 
  Flame, 
  ShieldAlert, 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  Clock, 
  CheckCircle2, 
  Smartphone, 
  ArrowLeft,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface HomeHeroProps {
  urgentAlert: AlertItem | undefined;
  alertsCount: number;
  availableVolunteersCount: number;
  onNavigateTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onOpenCertModal: () => void;
  onViewModeToggle: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  urgentAlert,
  alertsCount,
  availableVolunteersCount,
  onNavigateTab,
  onOpenReportModal,
  onOpenCertModal,
  onViewModeToggle,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Urgent Emergency Ticker / Warning Banner */}
      {urgentAlert && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-red-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-white shrink-0 animate-pulse">
              <Flame className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-black/25 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  إنذار عاجل نشط
                </span>
                <span className="text-xs text-red-100 font-mono">{urgentAlert.timestamp}</span>
              </div>
              <h3 className="font-black text-sm sm:text-base leading-tight mt-0.5">{urgentAlert.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => onNavigateTab('alerts')}
              className="px-3.5 py-1.5 bg-white text-red-700 font-bold text-xs rounded-xl shadow hover:bg-red-50 transition"
            >
              عرض التوصيات
            </button>
            <a
              href="tel:14"
              className="px-3 py-1.5 bg-black/25 hover:bg-black/40 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>14</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Platform Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مشروع الهاكاثون الوطني الشبابي للعمل التطوعي — DZ YOUNG LEADERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            نظام <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400">SANAD ALERT</span> للإنذار المبكر والتعبئة المجتمعية
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            منصة وتطبيق رقمي موحد يربط بين الوقاية من المخاطر، التبليغ السريع، إدارة المتطوعين، وتنظيم الحملات الميدانية داخل المؤسسات الشبانية لولاية جيجل وعموم الوطن.
          </p>

          <blockquote className="border-r-4 border-rose-500 pr-3 text-xs sm:text-sm text-slate-300 font-medium italic">
            "من التطوع العفوي إلى التطوع المنظم... ومن انتظار الكارثة إلى الاستعداد الدائم لها."
          </blockquote>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onOpenReportModal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-950/60 border border-red-400/40 flex items-center gap-2 transition"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>إبلاغ عن خطر أو حادث</span>
            </button>

            <button
              onClick={() => onNavigateTab('volunteers')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-950/50 border border-emerald-400/40 flex items-center gap-2 transition"
            >
              <Users className="w-5 h-5" />
              <span>أقرب متطوع إليك ({availableVolunteersCount} متاح)</span>
            </button>

            <button
              onClick={onViewModeToggle}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>تجربة تطبيق الجوال</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono block">14,102</span>
            <span className="text-xs text-slate-400 font-medium">ساعة تطوع معتمدة</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">{availableVolunteersCount}</span>
            <span className="text-xs text-slate-400 font-medium">متطوع متاح للتدخل الآن</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">846</span>
            <span className="text-xs text-slate-400 font-medium">متطوع مسجل بالولاية</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono block">5000</span>
            <span className="text-xs text-slate-400 font-medium">ساعة للشهادة الوطنية</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid (Page 2 & 12 feature cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pillar 1: Early Warning */}
        <div
          onClick={() => onNavigateTab('alerts')}
          className="bg-slate-900 border border-slate-800 hover:border-red-500/50 rounded-2xl p-5 shadow-lg cursor-pointer transition hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-1">تنبيهات فورية ومصنفة</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            نظام إنذار مبكر بألوان معتمدة (عادي، تنبيه، تحذير، إنذار عاجل) مع توجيهات النجاة.
          </p>
          <div className="mt-3 text-red-400 text-xs font-bold flex items-center gap-1">
            <span>استعراض النشرات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 2: Interactive Map */}
        <div
          onClick={() => onNavigateTab('map')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-lg cursor-pointer transition hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-1">خريطة تفاعلية للمخاطر</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            رصد جغرافي دقيق لمناطق الخطر، مواقع المتطوعين، المراكز الشبانية، وحملات الاستجابة.
          </p>
          <div className="mt-3 text-emerald-400 text-xs font-bold flex items-center gap-1">
            <span>فتح الخريطة الميدانية</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 3: Nearest Volunteer */}
        <div
          onClick={() => onNavigateTab('volunteers')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-lg cursor-pointer transition hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-1">أقرب متطوع إليك</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            تحديد المتطوعين المؤهلين والمتاحين جغرافياً مع إمكانية الاتصال المباشر وطلب الإسناد.
          </p>
          <div className="mt-3 text-amber-400 text-xs font-bold flex items-center gap-1">
            <span>البحث عن متطوع</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 4: Campaigns & 5000h Cert */}
        <div
          onClick={() => onNavigateTab('campaigns')}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-lg cursor-pointer transition hover:-translate-y-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-1">تنظيم الحملات وبنك الوقت</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            استثمار أوقات فراغ الشباب في حملات التشجير والتنظيف، مع توثيق الساعات نحو شهادة الـ 5000 ساعة.
          </p>
          <div className="mt-3 text-cyan-400 text-xs font-bold flex items-center gap-1">
            <span>استكشاف الحملات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </div>
  );
};
