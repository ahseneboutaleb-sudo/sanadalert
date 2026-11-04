import React, { useState } from 'react';
import { IncidentReport, AlertLevel } from '../types';
import { 
  AlertTriangle, 
  MapPin, 
  Camera, 
  Clock, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Info
} from 'lucide-react';

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: IncidentReport) => void;
}

export const IncidentReportModal: React.FC<IncidentReportModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<'fire' | 'flood' | 'accident' | 'heat' | 'weather' | 'other'>('fire');
  const [type, setType] = useState('انبعاث دخان أو حريق غابي مبكر');
  const [commune, setCommune] = useState('تاكسنة');
  const [locationDetails, setLocationDetails] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<AlertLevel>('urgent');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const communesOfJijel = [
    'جيجل مركز',
    'تاكسنة',
    'الميلية',
    'العوانة',
    'الشقفة',
    'زيامة منصورية',
    'قاوس',
    'العنصر',
    'الطاهير',
    'الجمعة بني حبيبي',
    'سيدي عبد العزيز',
    'بوراوي بلهادف'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport: IncidentReport = {
      id: `rep-${Date.now()}`,
      type,
      category,
      commune,
      location: `${commune} — ${locationDetails || 'موقع محدد عبر النظام'}`,
      description,
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
      reporterName: reporterName.trim() || 'مواطن يقظ',
      reporterPhone: reporterPhone.trim() || '05 XX XX XX XX',
      status: 'verified',
      severity,
      imageUrl: imagePreview || undefined,
      coordinates: {
        x: commune === 'تاكسنة' ? 44 : commune === 'الميلية' ? 78 : commune === 'العوانة' ? 32 : 50,
        y: commune === 'تاكسنة' ? 62 : commune === 'الميلية' ? 58 : commune === 'العوانة' ? 44 : 45
      }
    };

    onSubmitReport(newReport);
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
            <div className="p-2 rounded-xl bg-red-600/20 text-red-500 border border-red-500/40">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-base">الإبلاغ المبكر عن حادث أو خطر</h3>
              <p className="text-[11px] text-slate-400">إرسال فوري لخلية المتابعة المشتركة ومصالح النجدة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator (1 - 2 - 3) */}
        <div className="flex items-center justify-center gap-3 text-xs">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${step >= 1 ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <span>1</span>
            <span>نوع الخطر</span>
          </div>
          <span className="text-slate-600">←</span>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${step >= 2 ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <span>2</span>
            <span>الموقع</span>
          </div>
          <span className="text-slate-600">←</span>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${step === 3 ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <span>3</span>
            <span>التفاصيل والصور</span>
          </div>
        </div>

        {/* Safety Golden Rule Quote from PDF */}
        <div className="bg-rose-950/40 border border-rose-800/40 p-3 rounded-2xl text-[11px] text-rose-300 flex items-start gap-2 leading-relaxed">
          <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-semibold mb-0.5">قاعدة السلامة الذهبية:</strong>
            المواطن يكتشف ويبلّغ، والجهات المختصة تتحقق وتتدخل. لا يُطلب من المتطوع أبداً الاقتراب من منطقة الخطر أو التدخل المباشر بدل فرق الحماية المدنية.
          </div>
        </div>

        {/* Success Feedback Screen */}
        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="font-black text-emerald-400 text-lg">تم تسجيل البلاغ وإحالته بنجاح!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              تم تحديث الخريطة التفاعلية فورياً وإخطار خلايا الأزمة والمؤسسات الشبانية المجاورة. شكراً ليقظتك ومواطنتك.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Step 1: Type of Hazard */}
            {step === 1 && (
              <div className="space-y-3 animate-in fade-in">
                <label className="block text-slate-300 font-bold">اختر نوع الخطر أو الحادث المشاهد:</label>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'fire', label: 'حريق غابي أو أحراش', icon: '🔥', defaultTitle: 'تصاعد أدخنة وحريق غابي مبكر', defSev: 'urgent' as AlertLevel },
                    { id: 'flood', label: 'فيضان أو سيول جارفة', icon: '🌊', defaultTitle: 'تجمع مياه وسيول تهدد الطرقات', defSev: 'warning' as AlertLevel },
                    { id: 'weather', label: 'رياح قوية وسقوط أجسام', icon: '💨', defaultTitle: 'سقوط كابلات أو أشجار بفعل الرياح', defSev: 'warning' as AlertLevel },
                    { id: 'heat', label: 'موجة حر وإغماءات', icon: '☀️', defaultTitle: 'إجهاد حراري في مكان عام', defSev: 'notice' as AlertLevel },
                    { id: 'accident', label: 'حادث مرور أو انسداد طريق', icon: '🚗', defaultTitle: 'حادث مروري يستوجب إسناداً', defSev: 'warning' as AlertLevel },
                    { id: 'other', label: 'خطر بيئي آخر', icon: '⚠️', defaultTitle: 'خطر عام يهدد البيئة والصحة', defSev: 'notice' as AlertLevel },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCategory(item.id as any);
                        setType(item.defaultTitle);
                        setSeverity(item.defSev);
                      }}
                      className={`p-3 rounded-2xl border text-right transition flex items-center gap-2.5 ${
                        category === item.id
                          ? 'bg-red-950/60 text-white border-red-500 shadow-lg'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-bold text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-slate-400 mb-1">عنوان البلاغ المختصر:</label>
                  <input
                    type="text"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>التالي: تحديد الموقع</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">البلدية المعنية بولاية جيجل:</label>
                  <select
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 text-xs"
                  >
                    {communesOfJijel.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">تحديد المعالم الدقيقة والمكان:</label>
                  <input
                    type="text"
                    required
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    placeholder="مثال: قرب المدرسة الابتدائية، المنعرج المؤدي إلى جبل قرقور..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                    <span>تم التقاط إحداثيات GPS تلقائياً للموقع</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">LAT: 36.80 | LNG: 5.76</span>
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
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>التالي: التفاصيل والصور</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Details & Photo */}
            {step === 3 && (
              <div className="space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">وصف الحالة وتفاصيل المشاهدة:</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="صف ما شاهدته بدقة (اتجاه النيران، حجم الدخان، وجود محاصرين، الحاجة لإخلاء...)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>

                {/* Optional Photo Attachment */}
                <div>
                  <label className="block text-slate-400 mb-1">إضافة صورة توضيحية (اختياري):</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-slate-500 rounded-xl px-4 py-2 text-slate-300 flex items-center gap-2 transition text-xs">
                      <Camera className="w-4 h-4 text-cyan-400" />
                      <span>التقاط أو رفع صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>تم تجهيز الصورة</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Reporter Contact Info */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-slate-400 mb-0.5 text-[11px]">اسم المبلّغ (اختياري):</label>
                    <input
                      type="text"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="اسمك أو رمزك"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-0.5 text-[11px]">رقم الهاتف للتواصل السريع:</label>
                    <input
                      type="tel"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-3">
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
                    className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-red-950/60 transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال البلاغ فوراً</span>
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
