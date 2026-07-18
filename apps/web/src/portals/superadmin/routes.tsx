import React from 'react';
import { Route } from 'react-router-dom';
import { SuperAdminLayout } from './SuperAdminLayout';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { PortalFeaturePlaceholder } from '../../components/PortalFeaturePlaceholder';

export const SuperAdminRoutes = (
  <Route path="super-admin" element={<SuperAdminLayout />}>
    <Route path="dashboard" element={<SuperAdminDashboard />} />
    <Route path="users" element={<PortalFeaturePlaceholder name="User Management" description="Direct DB access to modify user roles and states." />} />
    <Route path="analytics" element={<PortalFeaturePlaceholder name="Global Analytics" description="Raw, unfiltered system metrics." />} />
    <Route path="logs" element={<PortalFeaturePlaceholder name="System Logs" description="Realtime cluster pod logs." />} />
    <Route path="security" element={<PortalFeaturePlaceholder name="Security Console" description="Firewall rules and threat detection flags." />} />
    <Route path="database" element={<PortalFeaturePlaceholder name="Database Access" description="Direct SQL execution terminal." />} />
    <Route path="configuration" element={<PortalFeaturePlaceholder name="System Configuration" description="Environment variables and constants." />} />
    <Route path="features" element={<PortalFeaturePlaceholder name="Feature Flags" description="Global toggle switches for beta features." />} />
    <Route path="audit" element={<PortalFeaturePlaceholder name="Audit Logs" description="Immutable ledger of all actions." />} />
  </Route>
);
