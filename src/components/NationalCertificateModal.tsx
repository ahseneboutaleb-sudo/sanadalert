import React, { useState } from 'react';
import { Volunteer } from '../types';
import { RECOGNITION_TIERS } from '../data/mockData';
import { 
  Award, 
  CheckCircle, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Star, 
  Download,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NationalCertificateModalProps {
  volunteer: Volunteer;
  allVolunteers: Volunteer[];
  onClose: () => void;
}

export const NationalCertificateModal: React.FC<NationalCertificateModalProps> = ({
  volunteer,
  allVolunteers,
  onClose,
}) => {
  const [activeVolunteer, setActiveVolunteer] = useState<Volunteer>(volunteer);
  const [showCertificateView, setShowCertificateView] = useState(false);

  const currentHours = activeVolunteer.totalHours;
  const targetHours = 5000;
  const progressPercent = Math.min(100, Math.round((currentHours / targetHours) * 100));

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl text-slate-100 space-y-6 animate-in zoom-in-95 my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-white text-lg">شهادة الكفاءة والتميز الوطني في التطوع</h3>
              <p className="text-xs text-slate-400">نظام الاعتراف المؤسساتي واحتساب الساعات التراكمية (5000 ساعة)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Volunteer Selector */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">اختر متطوعاً لعرض سجله وشهاداته:</span>
          <div className="flex flex-wrap gap-1.5">
            {allVolunteers.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVolunteer(v);
                  if (v.totalHours >= 5000) triggerCelebration();
                }}
                className={`px-3 py-1 rounded-lg transition font-medium flex items-center gap-1 ${
                  activeVolunteer.id === v.id
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                <span>{v.name}</span>
                <span className="font-mono text-[10px] text-amber-300">({v.totalHours}س)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Towards 5000 Hours */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 border border-amber-800/60 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>الرصيد التراكمي المعتمد للمتطوع: {activeVolunteer.name}</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {currentHours} <span className="text-sm font-normal text-slate-400">من أصل 5000 ساعة مطلوبة للشهادة الوطنية</span>
              </div>
            </div>

            <div className="text-left">
              <span className="text-2xl font-black text-amber-400 font-mono">{progressPercent}%</span>
              <span className="text-xs text-slate-400 block">نسبة الإنجاز</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Philosophy Banner */}
          <div className="text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>فلسفة البرنامج:</strong> كل ساعة تطوع هي خبرة ميدانية، وكل خبرة تستحق التوثيق والاعتراف الرسمي في السيرة الذاتية (CV).
            </span>
          </div>
        </div>

        {/* Tier Recognition Milestones */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-200">مستويات التقدير والتحفيز المقترحة:</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {RECOGNITION_TIERS.map((tier) => {
              const achieved = currentHours >= tier.hours;
              return (
                <div
                  key={tier.hours}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                    achieved
                      ? 'bg-gradient-to-b from-slate-900 to-amber-950/30 border-amber-500/60 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-1">{tier.badge}</div>
                  <div className="font-bold text-xs text-white leading-tight">{tier.title}</div>
                  <div className="font-mono text-xs font-semibold text-amber-400 my-1">{tier.hours} ساعة</div>
                  
                  {achieved ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-0.5 mt-1 bg-emerald-950/50 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3" />
                      <span>مكتمل</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 block mt-1">
                      متبقي {tier.hours - currentHours} س
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Certificate Preview Toggle */}
        <div className="pt-2">
          <button
            onClick={() => {
              setShowCertificateView(!showCertificateView);
              if (!showCertificateView) triggerCelebration();
            }}
            className="w-full py-3 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-amber-950/40 border border-amber-400/40 flex items-center justify-center gap-2 transition"
          >
            <Award className="w-5 h-5" />
            <span>{showCertificateView ? 'إخفاء معاينة الشهادة الرسمية' : 'معاينة نموذج الشهادة الوطنية المعتمدة'}</span>
          </button>
        </div>

        {/* The Printable Official Certificate Display */}
        {showCertificateView && (
          <div 
            id="official-national-certificate"
            className="bg-stone-50 text-stone-900 rounded-3xl p-8 border-8 border-double border-amber-700/60 shadow-2xl space-y-6 relative select-none animate-in fade-in"
          >
            {/* Algerian Coat of Arms / Header */}
            <div className="text-center space-y-1 border-b-2 border-stone-300 pb-4">
              <div className="text-xs font-bold text-stone-700 tracking-wider">
                الجمهورية الجزائرية الديمقراطية الشعبية
              </div>
              <div className="text-sm font-black text-stone-900">
                وزارة الشباب والرياضة — ديوان مؤسسات الشباب لولاية جيجل
              </div>
              <div className="text-xs font-semibold text-amber-800">
                برنامج الهاكاثون الوطني للعمل التطوعي (DZ YOUNG LEADERS)
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center space-y-2 py-2">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-wide font-serif">
                شهادة التميز والخبرة الميدانية في العمل التطوعي
              </h2>
              <div className="inline-block bg-amber-100 text-amber-900 px-4 py-1 rounded-full text-xs font-bold border border-amber-300">
                رقم السجل الوطني: ALG-2026-VOL-05000-{activeVolunteer.id}
              </div>
            </div>

            {/* Certificate Text */}
            <div className="text-center text-sm text-stone-800 leading-loose max-w-xl mx-auto">
              يشهد ديوان مؤسسات الشباب لولاية جيجل بأن المتطوع / القائد:
              <div className="text-2xl font-black text-amber-900 my-1 underline decoration-amber-500">
                {activeVolunteer.name}
              </div>
              قد استوفى بنجاح كافة معايير وساعات التطوع الميداني برصيد إجمالي قدره:
              <strong className="text-stone-950 font-black text-base mx-1 font-mono">
                {activeVolunteer.totalHours} ساعة عمل تطوعي معتمدة
              </strong>
              في مجالات: {activeVolunteer.specialtyLabel}، الإغاثة، ومجابهة الكوارث الطبيعية.
            </div>

            {/* Footer: QR Code, Signatures and Stamps */}
            <div className="grid grid-cols-3 items-end pt-6 border-t border-stone-300 text-xs">
              
              <div className="text-center space-y-1">
                <div className="font-bold text-stone-800">توقيع منسق البرنامج</div>
                <div className="text-[11px] text-stone-500 font-serif italic">القادة الشباب DZ Young Leaders</div>
                <div className="text-amber-800 font-mono text-[10px]">ختم معتمد ✓</div>
              </div>

              {/* QR Verification */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-2 rounded-xl border border-stone-300 shadow">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="25" height="25" fill="#1c1917" />
                    <rect x="15" y="15" width="15" height="15" fill="white" />
                    <rect x="18" y="18" width="9" height="9" fill="#1c1917" />
                    <rect x="65" y="10" width="25" height="25" fill="#1c1917" />
                    <rect x="70" y="15" width="15" height="15" fill="white" />
                    <rect x="73" y="18" width="9" height="9" fill="#1c1917" />
                    <rect x="10" y="65" width="25" height="25" fill="#1c1917" />
                    <rect x="15" y="70" width="15" height="15" fill="white" />
                    <rect x="18" y="73" width="9" height="9" fill="#1c1917" />
                    <rect x="45" y="45" width="10" height="10" fill="#b45309" />
                  </svg>
                </div>
                <span className="text-[9px] text-stone-500 mt-1 font-mono">SCAN TO VERIFY</span>
              </div>

              <div className="text-center space-y-1">
                <div className="font-bold text-stone-800">مدير ديوان مؤسسات الشباب</div>
                <div className="text-[11px] text-stone-500">ولاية جيجل</div>
                <div className="text-emerald-800 font-mono text-[10px]">مُصادق رسمياً ✓</div>
              </div>

            </div>

            {/* Print Button inside view */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>طباعة الشهادة الرسمية (PDF)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
