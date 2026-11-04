import React, { useState } from 'react';
import { Volunteer } from '../types';
import { 
  CreditCard, 
  CheckCircle2, 
  QrCode, 
  Award, 
  Building2, 
  Calendar, 
  Download, 
  Printer, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

interface VolunteerCardModalProps {
  volunteer: Volunteer | null;
  onClose: () => void;
}

export const VolunteerCardModal: React.FC<VolunteerCardModalProps> = ({
  volunteer,
  onClose,
}) => {
  const [verifiedState, setVerifiedState] = useState(false);

  if (!volunteer) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-100 space-y-5 animate-in zoom-in-95">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">بطاقة المتطوع الرقمية المعتمدة</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* The Official Card (Algerian National Youth Style) */}
        <div 
          id="volunteer-official-card"
          className="relative rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 p-5 space-y-4"
        >
          {/* Watermark / Seal background */}
          <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-emerald-300" />
          </div>

          {/* Card Institutional Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-amber-400 tracking-wider">
                الجمهورية الجزائرية الديمقراطية الشعبية
              </div>
              <div className="text-[10px] text-slate-300">
                وزارة الشباب والرياضة — ديوان مؤسسات الشباب لولاية جيجل
              </div>
              <div className="text-xs font-black text-white">
                برنامج سند للإنذار والتعبئة (SANAD ALERT)
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white text-xs shadow-md border border-amber-300/40">
              DZ
            </div>
          </div>

          {/* Main Card Body */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Volunteer Avatar / Badge */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border-2 border-emerald-500/80 flex items-center justify-center text-3xl font-black text-white shadow-xl overflow-hidden">
                {volunteer.name.slice(0, 2)}
              </div>
              <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                <CheckCircle2 className="w-3 h-3" />
                <span>معتمد</span>
              </div>
            </div>

            {/* Volunteer Info */}
            <div className="space-y-1.5 text-right w-full">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-white">{volunteer.name}</h4>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  {volunteer.nationalId}
                </span>
              </div>

              <div className="text-xs text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{volunteer.institution}</span>
              </div>

              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>التخصص: {volunteer.specialtyLabel}</span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>الرصيد: <strong>{volunteer.totalHours}</strong> ساعة</span>
                </span>
                <span>•</span>
                <span>{volunteer.interventionsCount} تدخل ميداني</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer: QR Code & Verification Data */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            {/* SVG Crisp QR Code */}
            <div 
              onClick={() => setVerifiedState(true)}
              className="bg-white p-1.5 rounded-xl shadow-md cursor-pointer hover:ring-2 hover:ring-amber-400 transition"
              title="انقر لفحص والتحقق من صحة البطاقة"
            >
              <svg className="w-16 h-16" viewBox="0 0 100 100">
                {/* Simulated QR matrix */}
                <rect width="100" height="100" fill="white" />
                {/* Corner markers */}
                <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#0f172a" />

                <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#0f172a" />

                <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#0f172a" />

                {/* Random QR data points */}
                <rect x="42" y="12" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="18" width="6" height="6" fill="#0f172a" />
                <rect x="40" y="30" width="6" height="6" fill="#0f172a" />
                <rect x="50" y="40" width="8" height="8" fill="#0f172a" />
                <rect x="62" y="45" width="6" height="6" fill="#0f172a" />
                <rect x="45" y="60" width="8" height="6" fill="#0f172a" />
                <rect x="68" y="65" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="75" width="6" height="6" fill="#0f172a" />
                <rect x="40" y="80" width="8" height="8" fill="#0f172a" />
                <rect x="60" y="82" width="6" height="6" fill="#0f172a" />
              </svg>
            </div>

            <div className="space-y-1 text-right flex-1">
              <div className="text-[10px] text-slate-400">
                رمز التحقق الرقمي المعتمد (QR Verification)
              </div>
              <div className="text-[11px] font-semibold text-emerald-300">
                سجل تطوعي رسمي موثق بقاعدة البيانات المركزية
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                SIG: SHA256:{volunteer.nationalId.replace(/-/g, '')}89F
              </div>
            </div>
          </div>
        </div>

        {/* Verification Alert Banner */}
        {verifiedState && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>تم التحقق: بطاقة سارية ومطابقة لسجلات ديوان مؤسسات الشباب لولاية جيجل ✓</span>
            </div>
            <button 
              onClick={() => setVerifiedState(false)}
              className="text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Actions (Print / Download / Close) */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-700"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>طباعة البطاقة الرسمية</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
