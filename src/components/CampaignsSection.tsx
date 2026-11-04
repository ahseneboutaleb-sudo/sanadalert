import React, { useState } from 'react';
import { Campaign, VolunteerSpecialty } from '../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  PlusCircle, 
  CheckCircle2, 
  Send, 
  Trees, 
  Droplets, 
  Heart, 
  GraduationCap, 
  Sparkles,
  Building
} from 'lucide-react';

interface CampaignsSectionProps {
  campaigns: Campaign[];
  onJoinCampaign: (campaignId: string) => void;
  onCreateCampaign: (newCampaign: Campaign) => void;
}

export const CampaignsSection: React.FC<CampaignsSectionProps> = ({
  campaigns,
  onJoinCampaign,
  onCreateCampaign,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  // Create Campaign Form State
  const [title, setTitle] = useState('');
  const [commune, setCommune] = useState('تاكسنة');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<Campaign['category']>('afforestation');
  const [date, setDate] = useState('السبت القادم 09:00');
  const [durationHours, setDurationHours] = useState(5);
  const [neededVolunteers, setNeededVolunteers] = useState(20);
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('ديوان مؤسسات الشباب لولاية جيجل');

  const handleJoin = (id: string) => {
    onJoinCampaign(id);
    setJoinedIds(prev => [...prev, id]);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCamp: Campaign = {
      id: `cmp-${Date.now()}`,
      title,
      category,
      categoryLabel: 
        category === 'afforestation' ? 'حملة تشجير وإعادة تأهيل' :
        category === 'coastal' ? 'تنظيف الشواطئ والمحيط الساحلي' :
        category === 'blood_donation' ? 'حملة تبرع بالدم وتضامن صحي' :
        category === 'first_aid_training' ? 'دورات تكوين ومحاكاة كوارث' : 'مبادرة تضامنية مجتمعية',
      location: `${commune} — ${location}`,
      commune,
      date,
      time: '09:00 صباحاً',
      durationHours: Number(durationHours),
      neededVolunteers: Number(neededVolunteers),
      registeredVolunteers: 1, // creator registered
      organizer,
      description,
      targetSpecialties: ['environment', 'first_aid', 'logistics'],
      status: 'upcoming',
      coordinates: { x: 50, y: 50 }
    };

    onCreateCampaign(newCamp);
    setShowCreateModal(false);
    setTitle('');
    setLocation('');
    setDescription('');
  };

  const filteredCampaigns = campaigns.filter(c => {
    if (selectedCategory === 'all') return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-800/50 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
              <Calendar className="w-6 h-6" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">منصة تنظيم الحملات والمبادرات التطوعية</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            التطوع لا يقتصر على فترات الكوارث؛ بل يعمل النظام طوال السنة لاستثمار أوقات فراغ الشباب، وربط كل متطوع بالنشاط المناسب في التوقيت المناسب.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="self-start md:self-center px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-950/50 border border-teal-400/40 flex items-center gap-2 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إنشاء حملة تطوعية جديدة +</span>
        </button>
      </div>

      {/* Campaign Categories Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { key: 'all', label: 'كافة الحملات' },
          { key: 'afforestation', label: 'حملات التشجير 🌲' },
          { key: 'coastal', label: 'تنظيف الشواطئ والمحيط 🌊' },
          { key: 'blood_donation', label: 'التبرع بالدم 🩸' },
          { key: 'first_aid_training', label: 'دورات الإسعافات والمحاكاة 🩹' },
          { key: 'solidarity', label: 'الحملات التضامنية 🤝' },
        ].map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3 py-1.5 rounded-xl border transition whitespace-nowrap font-medium ${
              selectedCategory === cat.key
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map((camp) => {
          const isJoined = joinedIds.includes(camp.id);
          const percentFilled = Math.min(100, Math.round((camp.registeredVolunteers / camp.neededVolunteers) * 100));

          return (
            <div
              key={camp.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition hover:-translate-y-0.5 space-y-4"
            >
              <div className="space-y-3">
                {/* Badge & Organizer */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-800/80">
                    {camp.categoryLabel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{camp.durationHours} ساعات معتمدة</span>
                  </span>
                </div>

                {/* Campaign Title */}
                <h3 className="text-base font-bold text-white leading-snug">
                  {camp.title}
                </h3>

                {/* Location & Date */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{camp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 font-semibold">{camp.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>الجهة المنظمة: {camp.organizer}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                  {camp.description}
                </p>
              </div>

              {/* Progress Bar of Needed Volunteers */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-teal-400" />
                    <span>المتطوعون: <strong>{camp.registeredVolunteers}</strong> من أصل {camp.neededVolunteers}</span>
                  </span>
                  <span className="font-mono text-teal-400 font-bold">{percentFilled}%</span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${percentFilled}%` }}
                  ></div>
                </div>

                {/* Join Action */}
                <button
                  onClick={() => handleJoin(camp.id)}
                  disabled={isJoined}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    isJoined
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                      : 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-950/50'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>تم تسجيلك في هذه الحملة ✓</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>التسجيل والمشاركة الآن (+{camp.durationHours} ساعات في رصيدك)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to Create Campaign */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-100 space-y-4 animate-in zoom-in-95 my-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">إنشاء حملة تطوعية ومطابقة المتطوعين</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان الحملة:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: حملة تنظيف غابات تاكسنة وغرس الأشجار..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">نوع الحملة:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                  >
                    <option value="afforestation">حملة تشجير 🌲</option>
                    <option value="coastal">تنظيف شواطئ 🌊</option>
                    <option value="blood_donation">تبرع بالدم 🩸</option>
                    <option value="first_aid_training">تدريب وإسعاف 🩹</option>
                    <option value="solidarity">تضامنية مجتمعية 🤝</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">البلدية:</label>
                  <select
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                  >
                    <option value="تاكسنة">تاكسنة</option>
                    <option value="الميلية">الميلية</option>
                    <option value="العوانة">العوانة</option>
                    <option value="جيجل مركز">جيجل مركز</option>
                    <option value="الشقفة">الشقفة</option>
                    <option value="قاوس">قاوس</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الموقع المحدد بدقة:</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="المكان أو المؤسسة المستضيفة..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">الموعد:</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">المدة (ساعات):</label>
                  <input
                    type="number"
                    min="1"
                    max="48"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">العدد المطلوب:</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={neededVolunteers}
                    onChange={(e) => setNeededVolunteers(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">وصف المبادرة وأهدافها:</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ما الذي سينجزه المتطوعون؟ ما التجهيزات المتوفرة؟"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
                />
              </div>

              <div className="bg-teal-950/40 border border-teal-800/40 p-2.5 rounded-xl text-teal-300 text-[11px]">
                سيقوم النظام فور النشر بإرسال إشعارات فورية لجميع المتطوعين المتاحين بالقرب من الموقع المسجل!
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs transition"
                >
                  نشر وتعبئة المتطوعين
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-xs transition"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
