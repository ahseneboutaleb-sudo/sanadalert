import React, { useState } from 'react';
import { AlertItem, AlertLevel } from '../types';
import { 
  Flame, 
  Wind, 
  Sun, 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert, 
  Share2, 
  MapPin, 
  Clock, 
  Filter,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AlertsFeedProps {
  alerts: AlertItem[];
  onSelectAlertOnMap?: (alert: AlertItem) => void;
}

export const AlertsFeed: React.FC<AlertsFeedProps> = ({ alerts, onSelectAlertOnMap }) => {
  const [selectedLevel, setSelectedLevel] = useState<AlertLevel | 'all'>('all');
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(alerts[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAlerts = alerts.filter(a => {
    if (selectedLevel === 'all') return true;
    return a.level === selectedLevel;
  });

  const getLevelBadge = (level: AlertLevel) => {
    switch (level) {
      case 'urgent':
        return {
          label: 'إنذار عاجل (خطر عالٍ جداً)',
          bg: 'bg-red-500/15 text-red-400 border-red-500/40',
          indicator: 'bg-red-500',
          icon: <Flame className="w-4 h-4 text-red-400" />
        };
      case 'warning':
        return {
          label: 'تحذير (خطر محتمل)',
          bg: 'bg-orange-500/15 text-orange-400 border-orange-500/40',
          indicator: 'bg-orange-500',
          icon: <Wind className="w-4 h-4 text-orange-400" />
        };
      case 'notice':
        return {
          label: 'تنبيه / انتباه (خطر متوسط)',
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
          indicator: 'bg-amber-500',
          icon: <Sun className="w-4 h-4 text-amber-400" />
        };
      case 'normal':
        return {
          label: 'عادي (مستوى مستقر)',
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
          indicator: 'bg-emerald-500',
          icon: <CheckCircle className="w-4 h-4 text-emerald-400" />
        };
    }
  };

  const handleShare = (alert: AlertItem) => {
    navigator.clipboard.writeText(`[SANAD ALERT]: ${alert.title}\nالموقع: ${alert.location}\nالتفاصيل: ${alert.description}`);
    setCopiedId(alert.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Overview & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-500" />
              <h2 className="text-xl font-black text-white">نظام الإنذار المبكر ونشرات الطوارئ</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              تصنيف النشرات حسب مقياس الخطورة الوطني المعتمد: عادي، تنبيه، تحذير، إنذار عاجل
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                selectedLevel === 'all'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              الكل ({alerts.length})
            </button>
            <button
              onClick={() => setSelectedLevel('urgent')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
                selectedLevel === 'urgent'
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-red-400 hover:bg-red-950/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span>عاجل</span>
            </button>
            <button
              onClick={() => setSelectedLevel('warning')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
                selectedLevel === 'warning'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'text-orange-400 hover:bg-orange-950/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              <span>تحذير</span>
            </button>
            <button
              onClick={() => setSelectedLevel('notice')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
                selectedLevel === 'notice'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-amber-400 hover:bg-amber-950/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>تنبيه</span>
            </button>
            <button
              onClick={() => setSelectedLevel('normal')}
              className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
                selectedLevel === 'normal'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-emerald-400 hover:bg-emerald-950/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>عادي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Cards Feed */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAlerts.map((alert) => {
          const badge = getLevelBadge(alert.level);
          const isExpanded = expandedAlertId === alert.id;

          return (
            <div
              key={alert.id}
              className={`rounded-2xl border transition shadow-lg overflow-hidden ${
                alert.level === 'urgent'
                  ? 'bg-gradient-to-r from-red-950/30 via-slate-900 to-slate-900 border-red-800/80'
                  : alert.level === 'warning'
                  ? 'bg-gradient-to-r from-orange-950/20 via-slate-900 to-slate-900 border-orange-800/60'
                  : alert.level === 'notice'
                  ? 'bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 border-amber-800/60'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Header stripe with severity indicator */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border ${badge.bg}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badge.bg} flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.indicator} animate-pulse`}></span>
                        {badge.label}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {alert.timestamp}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white hover:text-rose-300 transition">
                      {alert.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleShare(alert)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-xs flex items-center gap-1"
                    title="مشاركة أو نسخ البلاغ"
                  >
                    {copiedId === alert.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">مشاركة</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setExpandedAlertId(isExpanded ? null : alert.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location & Details Preview */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="font-semibold text-slate-200">النطاق الجغرافي:</span>
                  <span>{alert.location}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {alert.description}
                </p>

                {/* Recommendations expandable panel */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800/60 space-y-3 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>التوصيات والإجراءات الاحترازية العاجلة:</span>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {alert.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
                      <div>
                        <span>جهة الإصدار: </span>
                        <span className="text-slate-200 font-semibold">{alert.source}</span>
                      </div>

                      {alert.level === 'urgent' && (
                        <div className="flex gap-2">
                          <a
                            href="tel:14"
                            className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition text-xs shadow-lg shadow-red-950/40"
                          >
                            <span>خط نجدة الحماية المدنية (14)</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
