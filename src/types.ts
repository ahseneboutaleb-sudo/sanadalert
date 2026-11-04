export type AlertLevel = 'normal' | 'notice' | 'warning' | 'urgent';

export interface AlertItem {
  id: string;
  title: string;
  level: AlertLevel; // عادي | تنبيه | تحذير | إنذار عاجل
  category: 'fire' | 'flood' | 'heat' | 'wind' | 'earthquake' | 'general';
  location: string;
  region: string;
  timestamp: string;
  description: string;
  recommendations: string[];
  active: boolean;
  source: string;
}

export type VolunteerSpecialty = 
  | 'first_aid'        // إسعافات أولية
  | 'psychological'    // الدعم النفسي
  | 'logistics'        // اللوجستيك والإغاثة
  | 'media_pr'         // الإعلام والاتصال
  | 'environment'      // البيئة والتشجير
  | 'disaster_resp'    // الاستجابة للكوارث
  | 'search_rescue'    // البحث والإنقاذ
  | 'it_digital';      // الإعلام الآلي والرقمنة

export interface Volunteer {
  id: string;
  nationalId: string;
  name: string;
  phone: string;
  email: string;
  wilaya: string;
  commune: string;
  address: string;
  specialty: VolunteerSpecialty;
  specialtyLabel: string;
  secondarySpecialties?: VolunteerSpecialty[];
  rating: number;
  totalHours: number;
  isAvailableNow: boolean;
  availabilitySchedule: {
    saturday: string;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  };
  institution: string;
  interventionsCount: number;
  certificationsCount: number;
  avatarUrl?: string;
  distanceMeters?: number;
  coordinates: { x: number; y: number }; // percentage on map
}

export interface IncidentReport {
  id: string;
  type: string;
  category: 'fire' | 'flood' | 'accident' | 'heat' | 'weather' | 'other';
  location: string;
  commune: string;
  description: string;
  time: string;
  reporterName?: string;
  reporterPhone?: string;
  status: 'new' | 'verified' | 'dispatched' | 'resolved';
  severity: AlertLevel;
  imageUrl?: string;
  coordinates: { x: number; y: number };
}

export interface Campaign {
  id: string;
  title: string;
  category: 'afforestation' | 'cleanup' | 'solidarity' | 'blood_donation' | 'first_aid_training' | 'awareness' | 'coastal';
  categoryLabel: string;
  location: string;
  commune: string;
  date: string;
  time: string;
  durationHours: number;
  neededVolunteers: number;
  registeredVolunteers: number;
  organizer: string;
  description: string;
  targetSpecialties: VolunteerSpecialty[];
  status: 'upcoming' | 'in_progress' | 'completed';
  coordinates: { x: number; y: number };
}

export interface VolunteerHourRecord {
  id: string;
  volunteerId: string;
  campaignTitle: string;
  date: string;
  hours: number;
  institution: string;
  approved: boolean;
  category: string;
}

export interface AwarenessGuide {
  id: string;
  hazardType: 'fire' | 'flood' | 'heatwave' | 'storm';
  title: string;
  subtitle: string;
  instructions: {
    before: string[];
    during: string[];
    after: string[];
  };
  emergencyNumbers: { label: string; number: string }[];
  accentColor: string;
}
