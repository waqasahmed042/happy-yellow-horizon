import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { CampaignsDashboard } from '@/components/dashboard/CampaignsDashboard';
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard';
import { SettingsDashboard } from '@/components/dashboard/SettingsDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'analytics' | 'users' | 'settings'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
      case 'campaigns':
        return <CampaignsDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'users':
        return user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
      case 'settings':
        return <SettingsDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};