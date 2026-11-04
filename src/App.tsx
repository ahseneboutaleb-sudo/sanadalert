import React, { useState, useEffect } from 'react';
import { 
  AlertItem, 
  Volunteer, 
  IncidentReport, 
  Campaign, 
  VolunteerHourRecord 
} from './types';
import { 
  INITIAL_ALERTS, 
  INITIAL_VOLUNTEERS, 
  INITIAL_REPORTS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_HOURS_LOG 
} from './data/mockData';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { AlertsFeed } from './components/AlertsFeed';
import { InteractiveMap } from './components/InteractiveMap';
import { NearestVolunteer } from './components/NearestVolunteer';
import { CampaignsSection } from './components/CampaignsSection';
import { AwarenessGuides } from './components/AwarenessGuides';
import { DashboardView } from './components/DashboardView';
import { MobileAppSimulator } from './components/MobileAppSimulator';
import { VolunteerCardModal } from './components/VolunteerCardModal';
import { NationalCertificateModal } from './components/NationalCertificateModal';
import { IncidentReportModal } from './components/IncidentReportModal';
import { VolunteerRegisterModal } from './components/VolunteerRegisterModal';
import { Footer } from './components/Footer';

export default function App() {
  // View Mode: 'desktop' (Web Platform) or 'mobile' (Native App Simulator)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Navigation Tabs (Desktop Web Platform)
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Core Data Stores with localStorage persistence
  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    const saved = localStorage.getItem('sanad_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => {
    const saved = localStorage.getItem('sanad_volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [reports, setReports] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem('sanad_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('sanad_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [hoursLog, setHoursLog] = useState<VolunteerHourRecord[]>(() => {
    const saved = localStorage.getItem('sanad_hours');
    return saved ? JSON.parse(saved) : INITIAL_HOURS_LOG;
  });

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isRegisterVolunteerOpen, setIsRegisterVolunteerOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedCardVolunteer, setSelectedCardVolunteer] = useState<Volunteer | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sanad_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('sanad_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('sanad_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('sanad_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('sanad_hours', JSON.stringify(hoursLog));
  }, [hoursLog]);

  // Handlers
  const handleAddNewReport = (newReport: IncidentReport) => {
    setReports(prev => [newReport, ...prev]);

    // Also auto-generate an early alert if urgent or warning
    if (newReport.severity === 'urgent' || newReport.severity === 'warning') {
      const autoAlert: AlertItem = {
        id: `alt-${Date.now()}`,
        title: `إنذار: ${newReport.type}`,
        level: newReport.severity,
        category: newReport.category === 'fire' ? 'fire' : newReport.category === 'flood' ? 'flood' : 'general',
        location: newReport.location,
        region: newReport.commune,
        timestamp: 'الآن',
        description: newReport.description,
        recommendations: [
          'الابتعاد عن محيط الخطر وإفساح الطريق لفرق النجدة',
          'الاتصال برقم الحماية المدنية 14 عند أي طارئ'
        ],
        active: true,
        source: 'بلاغ مواطن معتمد عبر منصة SANAD ALERT'
      };
      setAlerts(prev => [autoAlert, ...prev]);
    }
  };

  const handleRegisterVolunteer = (newVolunteer: Volunteer) => {
    setVolunteers(prev => [newVolunteer, ...prev]);
    setSelectedCardVolunteer(newVolunteer);
  };

  const handleJoinCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        return { ...c, registeredVolunteers: c.registeredVolunteers + 1 };
      }
      return c;
    }));

    // Log hours to volunteer
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      const newHourRecord: VolunteerHourRecord = {
        id: `hr-${Date.now()}`,
        volunteerId: volunteers[0].id,
        campaignTitle: campaign.title,
        date: new Date().toISOString().split('T')[0],
        hours: campaign.durationHours,
        institution: campaign.organizer,
        approved: true,
        category: campaign.categoryLabel
      };
      setHoursLog(prev => [newHourRecord, ...prev]);

      // Add to volunteer hours
      setVolunteers(prev => prev.map((v, i) => {
        if (i === 0) {
          return { ...v, totalHours: v.totalHours + campaign.durationHours, interventionsCount: v.interventionsCount + 1 };
        }
        return v;
      }));
    }
  };

  const handleCreateCampaign = (newCampaign: Campaign) => {
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const handleApproveHour = (recordId: string) => {
    setHoursLog(prev => prev.map(h => {
      if (h.id === recordId) {
        return { ...h, approved: true };
      }
      return h;
    }));
  };

  const urgentAlert = alerts.find(a => a.level === 'urgent' && a.active);
  const urgentCount = alerts.filter(a => a.level === 'urgent' && a.active).length;
  const availableVolunteersCount = volunteers.filter(v => v.isAvailableNow).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        viewMode={viewMode}
        onViewModeToggle={() => setViewMode(prev => prev === 'desktop' ? 'mobile' : 'desktop')}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenCertModal={() => setIsCertModalOpen(true)}
        urgentAlertCount={urgentCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* MODE 1: MOBILE APP SIMULATOR (PWA / Professional Native App View) */}
        {viewMode === 'mobile' ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-white">وضع استعراض تطبيق الهاتف الذكي (Mobile App Experience):</span>
                <span className="text-slate-400">تطبيق تفاعلي مطابق لما تم عرضه في وثيقة المشروع</span>
              </div>
              <button
                onClick={() => setViewMode('desktop')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition self-start sm:self-center"
              >
                العودة للمنصة الكاملة ←
              </button>
            </div>

            <MobileAppSimulator
              alerts={alerts}
              volunteers={volunteers}
              reports={reports}
              campaigns={campaigns}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onOpenCardModal={(vol) => setSelectedCardVolunteer(vol)}
              onOpenCertModal={() => setIsCertModalOpen(true)}
            />
          </div>
        ) : (
          /* MODE 2: FULL WEB PLATFORM & INSTITUTIONAL DASHBOARD */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* TAB: Home */}
            {currentTab === 'home' && (
              <div className="space-y-8">
                <HomeHero
                  urgentAlert={urgentAlert}
                  alertsCount={alerts.length}
                  availableVolunteersCount={availableVolunteersCount}
                  onNavigateTab={(tab) => setCurrentTab(tab)}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                  onOpenCertModal={() => setIsCertModalOpen(true)}
                  onViewModeToggle={() => setViewMode('mobile')}
                />

                {/* Map Preview on Home */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">الخريطة الميدانية المباشرة</h3>
                    <button
                      onClick={() => setCurrentTab('map')}
                      className="text-xs text-emerald-400 font-bold hover:underline"
                    >
                      عرض الخريطة الموسعة ←
                    </button>
                  </div>
                  <InteractiveMap
                    alerts={alerts}
                    volunteers={volunteers}
                    reports={reports}
                    campaigns={campaigns}
                    onSelectVolunteer={(vol) => setSelectedCardVolunteer(vol)}
                    onOpenReportModal={() => setIsReportModalOpen(true)}
                  />
                </div>

                {/* Latest Alerts on Home */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white">آخر نشرات الإنذار المبكر</h3>
                    <button
                      onClick={() => setCurrentTab('alerts')}
                      className="text-xs text-red-400 font-bold hover:underline"
                    >
                      كافة التنبيهات ←
                    </button>
                  </div>
                  <AlertsFeed alerts={alerts.slice(0, 3)} />
                </div>
              </div>
            )}

            {/* TAB: Alerts */}
            {currentTab === 'alerts' && (
              <AlertsFeed alerts={alerts} />
            )}

            {/* TAB: Interactive Map */}
            {currentTab === 'map' && (
              <div className="space-y-4">
                <InteractiveMap
                  alerts={alerts}
                  volunteers={volunteers}
                  reports={reports}
                  campaigns={campaigns}
                  onSelectVolunteer={(vol) => setSelectedCardVolunteer(vol)}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                />
              </div>
            )}

            {/* TAB: Nearest Volunteer */}
            {currentTab === 'volunteers' && (
              <NearestVolunteer
                volunteers={volunteers}
                onOpenCardModal={(vol) => setSelectedCardVolunteer(vol)}
                onOpenRegisterModal={() => setIsRegisterVolunteerOpen(true)}
              />
            )}

            {/* TAB: Campaigns */}
            {currentTab === 'campaigns' && (
              <CampaignsSection
                campaigns={campaigns}
                onJoinCampaign={handleJoinCampaign}
                onCreateCampaign={handleCreateCampaign}
              />
            )}

            {/* TAB: Awareness Guides */}
            {currentTab === 'guides' && (
              <AwarenessGuides />
            )}

            {/* TAB: Institutional Dashboard */}
            {currentTab === 'dashboard' && (
              <DashboardView
                alerts={alerts}
                volunteers={volunteers}
                reports={reports}
                campaigns={campaigns}
                hoursLog={hoursLog}
                onApproveHour={handleApproveHour}
                onOpenReportModal={() => setIsReportModalOpen(true)}
              />
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={(tab) => setCurrentTab(tab)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenCertModal={() => setIsCertModalOpen(true)}
      />

      {/* MODAL 1: Incident Report Wizard */}
      <IncidentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleAddNewReport}
      />

      {/* MODAL 2: New Volunteer Registration */}
      <VolunteerRegisterModal
        isOpen={isRegisterVolunteerOpen}
        onClose={() => setIsRegisterVolunteerOpen(false)}
        onRegisterVolunteer={handleRegisterVolunteer}
      />

      {/* MODAL 3: Digital Volunteer Card */}
      <VolunteerCardModal
        volunteer={selectedCardVolunteer}
        onClose={() => setSelectedCardVolunteer(null)}
      />

      {/* MODAL 4: 5000-Hour National Certificate */}
      {isCertModalOpen && (
        <NationalCertificateModal
          volunteer={volunteers[2] || volunteers[0]} // default Nora Desdous with 5000+ hours!
          allVolunteers={volunteers}
          onClose={() => setIsCertModalOpen(false)}
        />
      )}

    </div>
  );
}
