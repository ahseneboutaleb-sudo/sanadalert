import React, { useState } from 'react';
import { Volunteer, VolunteerSpecialty } from '../types';
import { 
  Users, 
  MapPin, 
  PhoneCall, 
  Star, 
  Clock, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Search, 
  CreditCard,
  Send,
  SlidersHorizontal,
  Shield
} from 'lucide-react';

interface NearestVolunteerProps {
  volunteers: Volunteer[];
  onOpenCardModal: (volunteer: Volunteer) => void;
  onOpenRegisterModal: () => void;
}

export const NearestVolunteer: React.FC<NearestVolunteerProps> = ({
  volunteers,
  onOpenCardModal,
  onOpenRegisterModal,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedVolunteerForHelp, setSelectedVolunteerForHelp] = useState<Volunteer | null>(null);
  const [helpMessage, setHelpMessage] = useState('');
  const [helpSent, setHelpSent] = useState(false);

  const specialtiesList: { key: VolunteerSpecialty | 'all'; label: string }[] = [
    { key: 'all', label: 'كافة الاختصاصات' },
    { key: 'first_aid', label: 'إسعافات أولية' },
    { key: 'search_rescue', label: 'بحث وإنقاذ' },
    { key: 'psychological', label: 'دعم نفسي' },
    { key: 'logistics', label: 'لوجستيك وإغاثة' },
    { key: 'environment', label: 'بيئة وتشجير' },
    { key: 'disaster_resp', label: 'استجابة للكوارث' },
    { key: 'it_digital', label: 'إعلام آلي ورقمنة' },
    { key: 'media_pr', label: 'إعلام واتصال' }
  ];

  const filteredVolunteers = volunteers.filter((vol) => {
    if (onlyAvailable && !vol.isAvailableNow) return false;
    if (selectedSpecialty !== 'all' && vol.specialty !== selectedSpecialty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = vol.name.toLowerCase().includes(q);
      const matchCommune = vol.commune.toLowerCase().includes(q);
      const matchSpec = vol.specialtyLabel.toLowerCase().includes(q);
      if (!matchName && !matchCommune && !matchSpec) return false;
    }
    return true;
  });

  const handleSendHelpRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setHelpSent(true);
    setTimeout(() => {
      setHelpSent(false);
      setSelectedVolunteerForHelp(null);
      setHelpMessage('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner & Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Users className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">نظام تحديد أقرب متطوع مؤهل إليك</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              وفق خوارزمية ذكية تجمع بين: <strong className="text-emerald-400">الأقرب جغرافياً</strong> + <strong className="text-emerald-400">المتاحين حالياً</strong> + <strong className="text-emerald-400">المؤهلين للاختصاص المطلوب</strong> لسرعة النجدة والإسناد الميداني.
            </p>
          </div>

          <button
            onClick={onOpenRegisterModal}
            className="self-start md:self-center px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 border border-emerald-400/40 flex items-center gap-2 transition"
          >
            <Shield className="w-4 h-4" />
            <span>تسجيل متطوع جديد +</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، البلدية (العوانة، الميلية، تاكسنة...) أو الاختصاص..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Availability Toggle */}
          <button
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              onlyAvailable
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyAvailable ? 'bg-white' : 'bg-emerald-500'}`}></span>
            <span>المتاحون الآن فقط</span>
          </button>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          {specialtiesList.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedSpecialty(item.key)}
              className={`px-3 py-1 rounded-lg border transition whitespace-nowrap font-medium ${
                selectedSpecialty === item.key
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVolunteers.map((vol) => (
          <div
            key={vol.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition hover:-translate-y-0.5"
          >
            <div>
              {/* Header: Photo, Name, Rating & Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-700 flex items-center justify-center font-bold text-white text-lg shadow-md border border-white/20">
                    {vol.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{vol.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800/60">
                        {vol.nationalId}
                      </span>
                      <div className="flex items-center text-amber-400 text-xs gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-bold">{vol.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability Badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                    vol.isAvailableNow
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${vol.isAvailableNow ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></span>
                  <span>{vol.isAvailableNow ? 'متاح الآن' : 'غير متاح'}</span>
                </span>
              </div>

              {/* Specialty & Location */}
              <div className="space-y-2 py-2 border-y border-slate-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">التخصص:</span>
                  <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                    {vol.specialtyLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الموقع والبلدية:</span>
                  <span className="text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>{vol.commune} — {vol.address}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">المسافة إليك:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {vol.distanceMeters ? `${vol.distanceMeters} متر` : 'قريب'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الرصيد التطوعي:</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{vol.totalHours} ساعة عمل</span>
                  </span>
                </div>
              </div>

              {/* Time Bank / Availability Schedule Snapshot */}
              <div className="my-2.5 bg-slate-950 p-2 rounded-xl border border-slate-800 text-[11px] space-y-1">
                <div className="text-slate-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>أوقات الفراغ والتوفر:</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-300">
                  <div>السبت: {vol.availabilitySchedule.saturday}</div>
                  <div>الأحد: {vol.availabilitySchedule.sunday}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedVolunteerForHelp(vol)}
                  className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>طلب مساعدة</span>
                </button>

                <a
                  href={`tel:${vol.phone.replace(/\s+/g, '')}`}
                  className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 border border-slate-700"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>اتصال مباشر</span>
                </a>
              </div>

              <button
                onClick={() => onOpenCardModal(vol)}
                className="py-1.5 w-full bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-[11px] transition flex items-center justify-center gap-1 border border-slate-800"
              >
                <CreditCard className="w-3 h-3 text-amber-400" />
                <span>عرض بطاقة المتطوع الرقمية والرمز QR</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Help Request Modal */}
      {selectedVolunteerForHelp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">إرسال طلب إسناد وتدخل للمتطوع</h3>
              </div>
              <button
                onClick={() => setSelectedVolunteerForHelp(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {helpSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-emerald-400 text-base">تم إرسال الإشعار بنجاح!</h4>
                <p className="text-xs text-slate-300">
                  تم إشعار المتطوع <strong className="text-white">{selectedVolunteerForHelp.name}</strong> بتفاصيل طلبك وموقعك، وسيتم التواصل معك مباشرة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendHelpRequest} className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block">المتطوع المستهدف:</span>
                    <strong className="text-white text-sm">{selectedVolunteerForHelp.name}</strong>
                  </div>
                  <span className="text-emerald-400 font-semibold">{selectedVolunteerForHelp.specialtyLabel}</span>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">طبيعة المساعدة المطلوبة:</label>
                  <textarea
                    rows={3}
                    required
                    value={helpMessage}
                    onChange={(e) => setHelpMessage(e.target.value)}
                    placeholder="مثال: نحتاج مساعدة في تقديم إسعافات أولية أو توفير وسيلة نقل لفرق الإغاثة..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-xl text-amber-300 text-[11px]">
                  ملاحظة: في حالات الحرائق أو الكوارث الكبرى، اتصل أولاً بالحماية المدنية على الرقم 14.
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition"
                  >
                    تأكيد وإرسال التنبيه
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVolunteerForHelp(null)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-xs transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
