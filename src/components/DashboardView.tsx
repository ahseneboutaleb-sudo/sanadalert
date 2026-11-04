import React, { useState } from 'react';
import { 
  AlertItem, 
  Volunteer, 
  IncidentReport, 
  Campaign, 
  VolunteerHourRecord 
} from '../types';
import { INSTITUTION_STATS } from '../data/mockData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  ArrowRight, 
  TrendingUp, 
  Building2, 
  Award,
  Check,
  X
} from 'lucide-react';

interface DashboardViewProps {
  alerts: AlertItem[];
  volunteers: Volunteer[];
  reports: IncidentReport[];
  campaigns: Campaign[];
  hoursLog: VolunteerHourRecord[];
  onApproveHour: (recordId: string) => void;
  onOpenReportModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  alerts,
  volunteers,
  reports,
  campaigns,
  hoursLog,
  onApproveHour,
  onOpenReportModal,
}) => {
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<number>(3);

  const workflowSteps = [
    { num: 1, title: 'رصد', desc: 'مراقبة النشرات واستشعار المخاطر' },
    { num: 2, title: 'إبلاغ', desc: 'تلقي بلاغ المواطن والبيانات الميدانية' },
    { num: 3, title: 'تحقق', desc: 'تأكيد مصداقية الحادث والتنسيق' },
    { num: 4, title: 'إنذار', desc: 'إصدار تصنيف الخطر باللون المناسب' },
    { num: 5, title: 'تعبئة', desc: 'تحديد واستدعاء أقرب متطوعين متاحين' },
    { num: 6, title: 'استجابة', desc: 'توجيه الدعم اللوجستي والإغاثي' },
    { num: 7, title: 'متابعة', desc: 'رصد التطورات من لوحة القيادة' },
    { num: 8, title: 'توثيق', desc: 'تسجيل ساعات العمل وإصدار الشهادات' }
  ];

  const pendingHours = hoursLog.filter(h => !h.approved);
  const approvedHours = hoursLog.filter(h => h.approved);

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">لوحة القيادة والمتابعة للمؤسسة الشبانية</h2>
              <p className="text-xs text-slate-400">ديوان مؤسسات الشباب لولاية جيجل (ODEJ) — خلية العمليات والتعبئة الميدانية</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>نظام التعبئة متصل ومحدث</span>
          </span>
        </div>
      </div>

      {/* KPI Cards Row (from PDF page 9 & 13) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Incidents */}
        <div className="bg-slate-900 border border-red-900/40 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">الحوادث النشطة</span>
            <div className="text-2xl font-black text-red-400 font-mono mt-1">
              {reports.length + alerts.filter(a => a.active).length}
            </div>
            <span className="text-[10px] text-red-300">متابعة فورية</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Available Volunteers */}
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">المتطوعون المتاحون حالياً</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              {volunteers.filter(v => v.isAvailableNow).length}
            </div>
            <span className="text-[10px] text-emerald-300">جاهزون للإسناد الفوري</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Alerts Today */}
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">نشرات الإنذار اليوم</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {alerts.length}
            </div>
            <span className="text-[10px] text-amber-300">مصنفة حسب الخطورة</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Total Verified Hours */}
        <div className="bg-slate-900 border border-cyan-900/40 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">إجمالي الساعات المعتمدة</span>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
              {INSTITUTION_STATS.totalVolunteeringHours.toLocaleString('ar-DZ')}
            </div>
            <span className="text-[10px] text-cyan-300">مسجلة بالسجل الوطني</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 8-Step Emergency Lifecycle Flow (from PDF page 10) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>مسار ودورة الاستجابة المتكاملة في نظام SANAD ALERT</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            رصد ← إبلاغ ← تحقق ← إنذار ← تعبئة ← استجابة ← متابعة ← توثيق
          </p>
        </div>

        {/* Visual Workflow Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              onClick={() => setSelectedWorkflowStep(step.num)}
              className={`p-3 rounded-2xl border cursor-pointer transition text-center flex flex-col items-center justify-between ${
                selectedWorkflowStep === step.num
                  ? 'bg-gradient-to-b from-indigo-950/80 to-slate-950 border-indigo-400 text-white shadow-lg'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 ${
                selectedWorkflowStep === step.num ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {step.num}
              </span>
              <div className="font-bold text-xs">{step.title}</div>
              <div className="text-[10px] text-slate-400 mt-1 leading-tight">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Recent Reports & Hours Approval Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Reports Received by Institution */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>البلاغات الميدانية الواردة حديثاً</span>
            </h4>
            <span className="text-xs text-slate-400 font-mono">{reports.length} بلاغات</span>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-white text-sm">{rep.type}</h5>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {rep.time}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">{rep.description}</p>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-slate-900">
                  <span>الموقع: <strong className="text-slate-200">{rep.location}</strong></span>
                  <span className="text-emerald-400 font-semibold">موجّه لفرق الإسعاف ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Hour Certification & Approval Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>قائمة المصادقة على ساعات التطوع الميداني</span>
            </h4>
            <span className="text-xs text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
              {pendingHours.length > 0 ? `${pendingHours.length} بانتظار الاعتماد` : 'الكل معتمد'}
            </span>
          </div>

          <p className="text-xs text-slate-400">
            وفق النظام، تقوم المؤسسة الشبانية بالتحقق من مشاركة الشاب والمصادقة على الساعات لتُحتسب في رصيده نحو شهادة الـ 5000 ساعة:
          </p>

          <div className="space-y-2.5">
            {hoursLog.map((hr) => (
              <div
                key={hr.id}
                className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white">{hr.campaignTitle}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>التاريخ: {hr.date}</span>
                    <span>•</span>
                    <span className="text-cyan-400">{hr.institution}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-black text-amber-400 text-sm bg-amber-950/80 px-2 py-1 rounded-lg border border-amber-800/60">
                    +{hr.hours} س
                  </span>

                  {hr.approved ? (
                    <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-800/50">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>معتمد</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onApproveHour(hr.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>مصادقة</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
