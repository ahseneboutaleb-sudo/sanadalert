import React, { useState } from 'react';
import { Volunteer, VolunteerSpecialty } from '../types';
import { 
  Users, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface VolunteerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterVolunteer: (newVolunteer: Volunteer) => void;
}

export const VolunteerRegisterModal: React.FC<VolunteerRegisterModalProps> = ({
  isOpen,
  onClose,
  onRegisterVolunteer,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [wilaya, setWilaya] = useState('جيجل');
  const [commune, setCommune] = useState('جيجل مركز');
  const [address, setAddress] = useState('');
  
  const [specialty, setSpecialty] = useState<VolunteerSpecialty>('first_aid');
  const [institution, setInstitution] = useState('ديوان مؤسسات الشباب لولاية جيجل');
  
  // Availability schedule
  const [satAvail, setSatAvail] = useState('متاح كامل اليوم');
  const [sunAvail, setSunAvail] = useState('متاح بعد 14:00');
  const [weekdaysAvail, setWeekdaysAvail] = useState('متاح في الفترات المسائية');

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const specialtiesMap: Record<VolunteerSpecialty, string> = {
    first_aid: 'إسعافات أولية وإنقاذ',
    psychological: 'دعم نفسي واجتماعي',
    logistics: 'لوجستيك وإغاثة ميدانية',
    media_pr: 'إعلام واتصال وتوعية',
    environment: 'بيئة وتشجير واستدامة',
    disaster_resp: 'الاستجابة للكوارث الطبيعية',
    search_rescue: 'بحث وإنقاذ متقدم',
    it_digital: 'إعلام آلي ورقمنة وتنسيق'
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newVol: Volunteer = {
      id: `vol-${Date.now()}`,
      nationalId: `DZ-VOL-18-${randomSuffix}`,
      name: name.trim() || 'متطوع جديد',
      phone: phone.trim() || '05 50 00 00 00',
      email: email.trim() || 'volunteer@sanad-alert.dz',
      wilaya,
      commune,
      address: address.trim() || `حي وسط المدينة، ${commune}`,
      specialty,
      specialtyLabel: specialtiesMap[specialty],
      rating: 5.0,
      totalHours: 0,
      isAvailableNow: true,
      availabilitySchedule: {
        saturday: satAvail,
        sunday: sunAvail,
        monday: weekdaysAvail,
        tuesday: weekdaysAvail,
        wednesday: weekdaysAvail,
        thursday: weekdaysAvail,
        friday: 'متاح صباحاً'
      },
      institution,
      interventionsCount: 0,
      certificationsCount: 1,
      distanceMeters: 550,
      coordinates: {
        x: commune === 'تاكسنة' ? 44 : commune === 'الميلية' ? 78 : commune === 'العوانة' ? 34 : 50,
        y: commune === 'تاكسنة' ? 62 : commune === 'الميلية' ? 58 : commune === 'العوانة' ? 46 : 40
      }
    };

    onRegisterVolunteer(newVol);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl text-slate-100 space-y-5 animate-in zoom-in-95 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-base">تسجيل متطوع جديد في السجل الرقمي</h3>
              <p className="text-[11px] text-slate-400">الحصول على الهوية والبطاقة الرقمية المعتمدة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Steps Tracker */}
        <div className="flex items-center justify-center gap-2 text-xs">
          <div className={`px-3 py-1 rounded-full font-bold ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
            1. البيانات الشخصية
          </div>
          <span className="text-slate-600">←</span>
          <div className={`px-3 py-1 rounded-full font-bold ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
            2. التخصص والمؤسسة
          </div>
          <span className="text-slate-600">←</span>
          <div className={`px-3 py-1 rounded-full font-bold ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
            3. أوقات الفراغ
          </div>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="font-black text-emerald-400 text-lg">أهلاً بك في شبكة المتطوعين المعتمدين!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              تم إصدار بطاقتك الرقمية ورمزك التسلسلي المعتمد، ويمكنك الآن المشاركة في الحملات وتلقي إشعارات التدخل القريبة.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFinish} className="space-y-4 text-xs">
            
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">الاسم الكامل:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: عبد القادر بن عيسى"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">رقم الهاتف:</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">البريد الإلكتروني:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">الولاية:</label>
                    <input
                      type="text"
                      disabled
                      value={wilaya}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">البلدية:</label>
                    <select
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                    >
                      <option value="جيجل مركز">جيجل مركز</option>
                      <option value="الميلية">الميلية</option>
                      <option value="تاكسنة">تاكسنة</option>
                      <option value="العوانة">العوانة</option>
                      <option value="الشقفة">الشقفة</option>
                      <option value="قاوس">قاوس</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">العنوان بالتفصيل:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="الحي أو الشارع..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!name || !phone) {
                        alert('يرجى كتابة الاسم ورقم الهاتف للمتابعة');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>التالي: التخصص والمؤسسة</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">مجال التخصص الرئيسي:</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                  >
                    <option value="first_aid">إسعافات أولية وإنقاذ 🩹</option>
                    <option value="search_rescue">بحث وإنقاذ واستجابة ميدانية 🚨</option>
                    <option value="psychological">دعم نفسي واجتماعي 🧠</option>
                    <option value="logistics">لوجستيك وإغاثة ميدانية 📦</option>
                    <option value="environment">بيئة وتشجير واستدامة 🌲</option>
                    <option value="disaster_resp">الاستجابة للكوارث الطبيعية 🌋</option>
                    <option value="it_digital">إعلام آلي ورقمنة وتنسيق 💻</option>
                    <option value="media_pr">إعلام واتصال وتوعية 📢</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">المؤسسة الشبانية التابع لها:</label>
                  <select
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                  >
                    <option value="ديوان مؤسسات الشباب لولاية جيجل">ديوان مؤسسات الشباب لولاية جيجل (ODEJ)</option>
                    <option value="المركب الرياضي الجواري حمدلو عبد السلام الميلية">المركب الرياضي الجواري حمدلو عبد السلام الميلية</option>
                    <option value="دار الشباب تاكسنة">دار الشباب تاكسنة</option>
                    <option value="دار الشباب العوانة">دار الشباب العوانة</option>
                    <option value="دار الشباب الشقفة">دار الشباب الشقفة</option>
                  </select>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition flex items-center gap-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>التالي: أوقات الفراغ</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-3 animate-in fade-in">
                <div className="bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl text-emerald-300 text-[11px]">
                  <strong>استثمار أوقات الفراغ:</strong> حدد متى تكون متاحاً ليقوم النظام بإشعارك بالحملات المطابقة لأوقات فراغك.
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">توفر يوم السبت:</label>
                  <input
                    type="text"
                    value={satAvail}
                    onChange={(e) => setSatAvail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">توفر يوم الأحد:</label>
                  <input
                    type="text"
                    value={sunAvail}
                    onChange={(e) => setSunAvail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">توفر باقي أيام الأسبوع:</label>
                  <input
                    type="text"
                    value={weekdaysAvail}
                    onChange={(e) => setWeekdaysAvail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition flex items-center gap-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 transition flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>تأكيد التسجيل وإصدار البطاقة</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
