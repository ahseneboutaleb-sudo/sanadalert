import React, { useState } from 'react';
import { 
  Bell, 
  Smartphone, 
  Monitor, 
  Flame, 
  PhoneCall, 
  PlusCircle, 
  Award, 
  MapPin, 
  Users, 
  Calendar, 
  BookOpen, 
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  viewMode: 'desktop' | 'mobile';
  onViewModeToggle: () => void;
  onOpenReportModal: () => void;
  onOpenCertModal: () => void;
  urgentAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  viewMode,
  onViewModeToggle,
  onOpenReportModal,
  onOpenCertModal,
  urgentAlertCount,
}) => {
  const [showHotlines, setShowHotlines] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      {/* Algerian Official Institutional Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-200">الجمهورية الجزائرية الديمقراطية الشعبية</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden md:inline">وزارة الشباب والرياضة — ديوان مؤسسات الشباب لولاية جيجل</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowHotlines(!showHotlines)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>أرقام النجدة والطوارئ</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <button
              onClick={() => setShowAbout(true)}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>حول المشروع</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation & Branding Bar */}
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('home')}>
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-600 to-red-600 flex items-center justify-center shadow-lg shadow-rose-950/40 border border-rose-400/30">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider text-white">SANAD ALERT</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-700/50">
                  سند ألرت
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                الإنذار المبكر والتعبئة الاجتماعية وإدارة العمل التطوعي
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 text-sm">
            <button
              onClick={() => onTabChange('home')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                currentTab === 'home'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => onTabChange('alerts')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                currentTab === 'alerts'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>التنبيهات</span>
              {urgentAlertCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-bounce">
                  {urgentAlertCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onTabChange('map')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                currentTab === 'map'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>الخريطة التفاعلية</span>
            </button>
            <button
              onClick={() => onTabChange('volunteers')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                currentTab === 'volunteers'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>أقرب متطوع</span>
            </button>
            <button
              onClick={() => onTabChange('campaigns')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                currentTab === 'campaigns'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>الحملات</span>
            </button>
            <button
              onClick={() => onTabChange('guides')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                currentTab === 'guides'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>أدلة التوعية</span>
            </button>
            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
                currentTab === 'dashboard'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>لوحة القيادة</span>
            </button>
          </div>

          {/* Action buttons (Right) */}
          <div className="flex items-center gap-2">
            
            {/* View Mode Toggle: Platform vs Mobile App View */}
            <button
              onClick={onViewModeToggle}
              title={viewMode === 'desktop' ? 'التحويل إلى وضع تطبيق الجوال الذكي' : 'التحويل إلى وضع منصة الويب'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                viewMode === 'mobile'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {viewMode === 'mobile' ? (
                <>
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">عرض المنصة الكاملة</span>
                  <span className="sm:hidden">المنصة</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">تحويل لتطبيق جوال</span>
                  <span className="sm:hidden">تطبيق</span>
                </>
              )}
            </button>

            {/* 5000h Certificate Button */}
            <button
              onClick={onOpenCertModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white text-xs font-bold shadow-md shadow-amber-950/30 border border-amber-400/40 transition"
            >
              <Award className="w-4 h-4" />
              <span>شهادة 5000 ساعة</span>
            </button>

            {/* Quick Report Emergency Button */}
            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg shadow-red-950/60 border border-red-400/50 animate-pulse-subtle transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إبلاغ عن خطر</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Emergency Hotlines Dropdown Drawer */}
      {showHotlines && (
        <div className="bg-amber-950/90 border-b border-amber-800 text-amber-100 p-3 shadow-2xl transition animate-in fade-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-500 text-slate-950 font-black text-xs">طوارئ</span>
              <span className="font-semibold">الأرقام الخضراء الرسمية المجانية للتدخل والنجدة:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono font-bold">
              <a href="tel:14" className="hover:underline bg-red-900/60 px-3 py-1 rounded border border-red-700/60 flex items-center gap-1.5">
                <span className="text-red-400 text-xs">الحماية المدنية:</span>
                <span className="text-white text-base">14</span>
              </a>
              <a href="tel:1021" className="hover:underline bg-red-950/60 px-3 py-1 rounded border border-red-800/60 flex items-center gap-1.5">
                <span className="text-red-300 text-xs">الرقم الأخضر للحماية:</span>
                <span className="text-white text-base">1021</span>
              </a>
              <a href="tel:1055" className="hover:underline bg-emerald-950/60 px-3 py-1 rounded border border-emerald-800/60 flex items-center gap-1.5">
                <span className="text-emerald-300 text-xs">الدرك الوطني:</span>
                <span className="text-white text-base">1055</span>
              </a>
              <a href="tel:1548" className="hover:underline bg-blue-950/60 px-3 py-1 rounded border border-blue-800/60 flex items-center gap-1.5">
                <span className="text-blue-300 text-xs">الشرطة الوطنية:</span>
                <span className="text-white text-base">1548</span>
              </a>
            </div>
            <button 
              onClick={() => setShowHotlines(false)}
              className="text-xs text-amber-300 hover:text-white px-2 py-1 rounded bg-amber-900/40"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 text-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-rose-500" />
                <h3 className="text-lg font-bold text-white">مشروع SANAD ALERT - سند ألرت</h3>
              </div>
              <button 
                onClick={() => setShowAbout(false)}
                className="text-slate-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              نظام رقمي للإنذار المبكر والتعبئة الاجتماعية وإدارة العمل التطوعي داخل المؤسسات الشبانية. 
              يجمع في منصة وتطبيق موحد بين الوقاية من المخاطر، التبليغ السريع، إدارة المتطوعين، تنظيم الحملات، والاستجابة الميدانية للأزمات.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="text-amber-400 font-bold">الهاكاثون الوطني الشبابي للعمل التطوعي</div>
              <div>الجمهورية الجزائرية الديمقراطية الشعبية — وزارة الشباب والرياضة</div>
              <div>مديرية الشباب والرياضة لولاية جيجل — ديوان مؤسسات الشباب (ODEJ)</div>
              <div>المركب الرياضي الجواري حمدلو عبد السلام الميلية</div>
              <div className="pt-2 border-t border-slate-800 text-slate-400">
                <span className="text-slate-200 font-semibold">إعداد القادة الشباب لبرنامج DZ YOUNG LEADERS:</span>
                <div className="mt-1 flex flex-wrap gap-2 text-cyan-400">
                  <span>• القائد / أحسن بوطالب</span>
                  <span>• القائدة / نورة دسدوس</span>
                  <span>• القائدة / حميمد آية</span>
                </div>
              </div>
            </div>

            <div className="bg-rose-950/40 border border-rose-800/40 p-3 rounded-xl text-xs text-rose-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                "من التطوع العفوي إلى التطوع المنظم... ومن انتظار الكارثة إلى الاستعداد الدائم لها."
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowAbout(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
