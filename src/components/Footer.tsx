import React from 'react';
import { Flame, ShieldCheck, PhoneCall, Award, Users } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onOpenCertModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenReportModal,
  onOpenCertModal,
}) => {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Project Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-red-600 flex items-center justify-center text-white shadow-md">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-base font-black text-white">SANAD ALERT</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              نظام رقمي للإنذار المبكر والتعبئة الاجتماعية وإدارة العمل التطوعي داخل المؤسسات الشبانية لولاية جيجل.
            </p>
            <div className="text-[11px] text-amber-400 font-semibold">
              "من التطوع العفوي إلى التطوع المنظم... ومن انتظار الكارثة إلى الاستعداد لها"
            </div>
          </div>

          {/* Institutional Affiliation */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs">الهيئات المشرفة والرعائية</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>الجمهورية الجزائرية الديمقراطية الشعبية</li>
              <li>وزارة الشباب والرياضة</li>
              <li>مديرية الشباب والرياضة لولاية جيجل</li>
              <li>ديوان مؤسسات الشباب لولاية جيجل (ODEJ)</li>
              <li>المركب الرياضي الجواري حمدلو عبد السلام الميلية</li>
            </ul>
          </div>

          {/* Project Team DZ YOUNG LEADERS */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs">إعداد قادة برنامج DZ YOUNG LEADERS</h4>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>القائد / أحسن بوطالب</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>القائدة / نورة دسدوس</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>القائدة / حميمد آية</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                الهاكاثون الوطني الشبابي للحلول المبتكرة في العمل التطوعي
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-red-400" />
              <span>خطوط النجدة والطوارئ (مجاناً)</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-sans block">الحماية المدنية:</span>
                <span className="text-red-400 font-bold text-sm">14</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-sans block">الدرك الوطني:</span>
                <span className="text-emerald-400 font-bold text-sm">1055</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-sans block">الأمن الوطني:</span>
                <span className="text-blue-400 font-bold text-sm">1548</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-sans block">الرقم الأخضر للحماية:</span>
                <span className="text-amber-400 font-bold text-sm">1021</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مشروع SANAD ALERT — ولاية جيجل
          </div>
          <div className="flex gap-4">
            <button onClick={() => onNavigateTab('guides')} className="hover:text-slate-300">أدلة السلامة</button>
            <button onClick={onOpenCertModal} className="hover:text-slate-300">شهادة الـ 5000 ساعة</button>
            <button onClick={onOpenReportModal} className="text-red-400 hover:text-red-300 font-bold">إبلاغ عن حادث</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
